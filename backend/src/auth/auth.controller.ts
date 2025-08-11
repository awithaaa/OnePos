import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
  Get,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserRegisterDto } from './dto/register.dto';
import { UserLoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: UserRegisterDto) {
    return this.authService.register(
      body.firstName,
      body.lastName,
      body.email,
      body.password,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('login')
  async login(@Body() body: UserLoginDto, @Res({ passthrough: true }) res) {
    const tokens = await this.authService.login(body.email, body.password);

    // Set refresh token in HttpOnly cookie
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000, // match refresh expiry
    });

    return { access_token: tokens.access_token };
  }

  @Post('refresh')
  async refresh(@Req() req, @Res({ passthrough: true }) res) {
    const token = req.cookies?.refresh_token;
    if (!token) throw new UnauthorizedException('No refresh token');

    const tokens = await this.authService.refreshTokens(token);

    // rotate cookie
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { access_token: tokens.access_token };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: any, @Res({ passthrough: true }) res) {
    const user = req.user;
    const token = req.cookies?.refresh_token;
    await this.authService.logout(user.userId, token);
    res.clearCookie('refresh_token', { path: '/auth/refresh' });
    return { ok: true };
  }
}
