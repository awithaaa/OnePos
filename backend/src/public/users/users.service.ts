import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: { firstName, lastName, email, password: hashedPassword, role },
    });
  }

  protected userWithOutPass(user: any) {
    const { password, ...rest } = user;
    return rest;
  }

  async getUsers(start?: number, size?: number) {
    if (start !== undefined && size !== undefined) {
      const count = await this.prisma.user.count();
      const users = await this.prisma.user.findMany({
        skip: start,
        take: size,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          role: true,
          email: true,
        },
      });
      return { count, users };
    }
    const count = await this.prisma.user.count();
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        role: true,
        email: true,
      },
    });
    return { count, users };
  }

  async getUsersById(id: number) {
    let userWp = await this.prisma.user.findUnique({ where: { id: id } });
    if (!userWp) throw new NotFoundException('User not found!');
    const { password, ...user } = userWp;
    const count = 1;
    return { user, count };
  }

  async getUsersByName(name: string) {
    const user = await this.prisma.user.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: name,
              mode: 'insensitive',
            },
          },
          {
            lastName: {
              contains: name,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        role: true,
        email: true,
      },
    });

    if (!user) throw new NotFoundException('Users not found!');
    const count = user.length;
    return { user, count };
  }

  async updateUserById(id: number, data: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) throw new NotFoundException('User not found!');

    const updateUser = await this.prisma.user.update({
      where: { id: id },
      data: data,
    });
    return { message: 'User updated succesfully!', item: updateUser };
  }

  async deleteUserById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) throw new NotFoundException('User not found!');

    await this.prisma.user.delete({ where: { id: id } });
    return { message: 'User deleted succesfully!' };
  }

  async getLatestPasswordReq(id: number) {
    const tok = await this.prisma.passwordToken.findMany({
      where: { userId: id },
      orderBy: {
        id: 'desc',
      },
    });
    if (tok.length === 0) throw new NotFoundException('Token does not exsist!');

    return tok[0];
  }
}
