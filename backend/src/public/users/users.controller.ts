import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async getUsers(
    @Query('start') start?: string,
    @Query('size') size?: string,
    @Query('id') id?: string,
    @Query('name') name?: string,
  ) {
    if (id) {
      return this.usersService.getUsersById(Number(id));
    }
    if (name) {
      return this.usersService.getUsersByName(name);
    }
    if (start !== undefined && size !== undefined) {
      return this.usersService.getUsers(Number(start), Number(size));
    }
    return this.usersService.getUsers();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async updateUserById(@Param('id') id: number, @Body() data: UpdateUserDto) {
    return this.usersService.updateUserById(Number(id), data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async deleteUserById(@Param('id') id: number) {
    return this.usersService.deleteUserById(Number(id));
  }
}
