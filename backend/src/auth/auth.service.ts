import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/public/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    const newUser = await this.usersService.createUser(
      firstName,
      lastName,
      email,
      password,
    );
    return newUser;
  }

  async validateUser(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    const pwMatches = await bcrypt.compare(pass, user.password);
    if (pwMatches) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async getTokens(userId: number, email: string, role: string) {
    const accessToken = this.jwtService.sign(
      { sub: userId, email, role },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
      },
    );

    const refreshToken = this.jwtService.sign(
      { sub: userId },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      },
    );

    return { accessToken, refreshToken };
  }

  // Save hashed refresh token in DB
  async saveRefreshToken(userId: number, refreshToken: string) {
    const tokenHash = await bcrypt.hash(refreshToken, 10);
    const expiresAt = new Date(
      Date.now() + this.parseExpiry(process.env.JWT_REFRESH_EXPIRES_IN),
    );
    return this.prisma.refreshToken.create({
      data: {
        tokenHash,
        userId,
        expiresAt,
      },
    });
  }

  // Helper to parse expirations like "7d", "900s" into ms
  parseExpiry(exp: string | undefined) {
    if (!exp) return 7 * 24 * 60 * 60 * 1000;
    if (exp.endsWith('d')) return parseInt(exp) * 24 * 60 * 60 * 1000;
    if (exp.endsWith('h')) return parseInt(exp) * 60 * 60 * 1000;
    if (exp.endsWith('m')) return parseInt(exp) * 60 * 1000;
    if (exp.endsWith('s')) return parseInt(exp) * 1000;
    return parseInt(exp) * 1000;
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken, // you may choose to only send via cookie
    };
  }

  async refreshTokens(receivedRefreshToken: string) {
    try {
      const payload = this.jwtService.verify(receivedRefreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const userId = payload.sub;
      // fetch all tokens for user (or latest) and compare hash
      const tokens = await this.prisma.refreshToken.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });

      for (const t of tokens) {
        const matches = await bcrypt.compare(receivedRefreshToken, t.tokenHash);
        if (matches && t.expiresAt > new Date()) {
          // valid refresh token
          const user = await this.prisma.user.findUnique({
            where: { id: userId },
          });
          if (!user) {
            throw new UnauthorizedException('Invalid authentications');
          }
          const newTokens = await this.getTokens(
            user.id,
            user.email,
            user.role,
          );
          await this.saveRefreshToken(user.id, newTokens.refreshToken);
          // optional: remove old token (rotate)
          await this.prisma.refreshToken.delete({ where: { id: t.id } });
          return {
            access_token: newTokens.accessToken,
            refresh_token: newTokens.refreshToken,
          };
        }
      }

      throw new UnauthorizedException('Invalid refresh token');
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: number, receivedRefreshToken?: string) {
    if (receivedRefreshToken) {
      const tokens = await this.prisma.refreshToken.findMany({
        where: { userId },
      });
      for (const t of tokens) {
        if (await bcrypt.compare(receivedRefreshToken, t.tokenHash)) {
          await this.prisma.refreshToken.delete({ where: { id: t.id } });
        }
      }
    } else {
      await this.prisma.refreshToken.deleteMany({ where: { userId } });
    }
  }
}
