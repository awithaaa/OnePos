import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/public/users/users.service';
import { UserRegisterDto } from './dto/register.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async register(data: UserRegisterDto) {
    const newUser = await this.usersService.createUser(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.role,
    );
    return newUser;
  }

  async validateUser(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid email or password');
    const pwMatches = await bcrypt.compare(pass, user.password);
    if (pwMatches) {
      const { password, ...rest } = user;
      return rest;
    }
    throw new UnauthorizedException('Invalid email or password');
  }

  async getMe(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    const { password, ...rest } = user;
    return rest;
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
      refresh_token: tokens.refreshToken,
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

  async updateProfile(email: string, updateProfile: UpdateProfileDto) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Something went wrong!');

    const newUser = await this.prisma.user.update({
      where: { id: user.id },
      data: updateProfile,
    });

    const { password, ...rest } = newUser;
    return { message: 'Account updated succesfully!', user: rest };
  }

  async logout(userId: number) {
    await this.prisma.refreshToken.deleteMany({ where: { userId } });
  }

  async createForgotPasswordSession(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (!user)
      throw new NotFoundException('Account does not exsist for this email!');

    const jwtToken = this.jwtService.sign(
      { user: email, expIn: '1m' },
      {
        secret: process.env.JWT_FORGOT_SECRET,
        expiresIn: process.env.JWT_FORGOT_EXPIRES_IN,
      },
    );

    const token = await this.prisma.passwordToken.create({
      data: {
        token: jwtToken,
        userId: user.id,
      },
    });

    return { jwtToken, token: token.id };
  }

  async approveForgotPasswordSession(id: string, acceptId: number) {
    const token = await this.prisma.passwordToken.findUnique({
      where: { id: id },
    });
    if (!token) throw new NotFoundException('Token does not exsist!');

    const pin = Math.floor(100000 + Math.random() * 900000).toString();

    try {
      const payload = this.jwtService.verify(token.token, {
        secret: process.env.JWT_FORGOT_SECRET,
      });
      const acceptToken = await this.prisma.passwordToken.update({
        where: { id: token.id },
        data: { pin: pin, acceptBy: acceptId },
      });

      return { message: 'Session accepted successfully!', acceptToken };
    } catch (error) {
      throw new UnauthorizedException('Token has been expired!');
    }
  }

  async checkForgotPasswordPin(token: string, pin: string) {
    const tok = await this.prisma.passwordToken.findFirst({
      where: { token: token },
      orderBy: {
        id: 'desc',
      },
    });
    if (!tok) throw new NotFoundException('Token does not exsist!');

    try {
      const payload = this.jwtService.verify(tok.token, {
        secret: process.env.JWT_FORGOT_SECRET,
      });

      if (!tok.acceptBy)
        throw new UnauthorizedException('Invalid token. Please try again.');

      if (tok.pin && tok.pin == pin) {
        const acceptToken = await this.prisma.passwordToken.update({
          where: { id: tok.id },
          data: { accept: true },
        });
        return { message: 'Session accepted successfully!', code: 111 };
      }

      throw new UnauthorizedException('Invalid pin. Please try again.');
    } catch (error: any) {
      if (error.name === 'TokenExpiredError')
        throw new UnauthorizedException('Token has been expired!');
      throw new UnauthorizedException(error);
    }
  }

  async checkForgotPasswordToken(token: string) {
    const tok = await this.prisma.passwordToken.findFirst({
      where: { token: token },
      orderBy: {
        id: 'desc',
      },
    });
    if (!tok) throw new NotFoundException('Token does not exsist!');

    try {
      const payload = this.jwtService.verify(tok.token, {
        secret: process.env.JWT_FORGOT_SECRET,
      });

      if (!tok.acceptBy)
        throw new UnauthorizedException('Invalid token. Please try again.');

      if (tok.userId == null) {
        throw new UnauthorizedException('Invalid token. Please try again.');
      }

      return { code: 111 };
    } catch (error: any) {
      if (error.name === 'TokenExpiredError')
        throw new UnauthorizedException('Token has been expired!');
      throw new UnauthorizedException(error);
    }
  }

  async resetPassword(token: string, pass: string) {
    const tok = await this.prisma.passwordToken.findFirst({
      where: { token: token },
      orderBy: {
        id: 'desc',
      },
    });
    if (!tok) throw new NotFoundException('Token does not exsist!');

    try {
      const payload = this.jwtService.verify(tok.token, {
        secret: process.env.JWT_FORGOT_SECRET,
      });

      if (tok.accept !== true)
        throw new UnauthorizedException(
          'Invalid token. You cannot reset your password right now!',
        );

      const hashedPassword = await bcrypt.hash(pass, 10);

      const user = await this.prisma.user.update({
        where: { email: payload.user },
        data: { password: hashedPassword },
      });
      const { password, ...rest } = user;
      return { user: rest };
    } catch (error) {
      if (error.name === 'TokenExpiredError')
        throw new UnauthorizedException('Token has been expired!');
      throw new UnauthorizedException(error);
    }
  }
}
