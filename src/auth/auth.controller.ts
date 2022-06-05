import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Req,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Cookies } from 'src/common/decorators';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import JwtRefreshGuard from './guards/jwt-refresh.guard';
import { Roles } from './guards/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('login')
  async login(
    @Body() user: CreateUserDto,
    @Res({ passthrough: true }) res: any,
    @Cookies('refreshToken') refreshToken: string,
  ) {
    const tokens = await this.authService.login(user);

    res.setCookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 60,
      // maxAge:
      //   Number(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')) *
      //   1000,
      path: '/',
    });

    return { accessToken: tokens.accessToken };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(
    @Res({ passthrough: true }) res: any,
    @Cookies('refreshToken') refreshToken: string,
  ) {
    if (refreshToken) res.clearCookie('refreshToken', { path: '/' });

    return;
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return req.user;
  }

  @Post('registration')
  async registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  @UseGuards(RolesGuard)
  // @Roles()
  async refresh(
    @Req()
    req: Request & {
      user: Express.User & { refreshToken: string; accessToken: string };
    },
    @Res({ passthrough: true }) res: any,
  ) {
    const { refreshToken, accessToken } = req.user;

    console.log(req.user, 'req.user');

    res.setCookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 60,
      // Number(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')) *
      // 1000,
      path: '/',
    });

    return {
      accessToken,
    };
  }
}
