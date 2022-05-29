import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Cookies } from './common/decorators';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(
    @Body() user: CreateUserDto,
    @Res({ passthrough: true }) res: any,
    @Cookies('refreshToken') refreshToken: string,
  ) {
    const tokens = await this.authService.login(user);

    res.setCookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return { accessToken: tokens.accessToken };
  }

  @Post('auth/logout')
  async logout(
    @Res({ passthrough: true }) res: any,
    @Cookies('refreshToken') refreshToken: string,
  ) {
    if (refreshToken) res.clearCookie('refreshToken', { path: '/auth' });

    return;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Post('/auth/registration')
  async registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }
}
