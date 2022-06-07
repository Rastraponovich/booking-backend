import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);

    return this.generateTokens(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.findByEmail(userDto.email);

    if (candidate)
      throw new HttpException('user allready exist', HttpStatus.BAD_REQUEST);

    const password = await bcrypt.hash(userDto.password, 5);

    const user = await this.usersService.create({
      ...userDto,
      password,
    });

    return this.generateTokens(user);
  }

  private async generateAccessToken(user: User) {
    const payload = { email: user.email, id: user.id, roleId: user.roleId };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: '5m',
    });
  }

  private async generateRefreshToken(user: User) {
    const payload = { id: user.id };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: '60d',
    });
  }
  private async generateTokens(user: User) {
    const refreshToken = await this.generateRefreshToken(user);
    const accessToken = await this.generateAccessToken(user);

    return {
      refreshToken,
      accessToken,
    };
  }

  async refreshToken(refreshToken: string) {
    const token = this.jwtService.verify(
      refreshToken,
      this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
    ) as { id: number };

    if (token) {
      const user = await this.usersService.findOne(Number(token.id));

      return await this.generateTokens(user);
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(userDto.email);

    const passwordEqueals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (user && passwordEqueals) return user;

    throw new UnauthorizedException({ message: 'wrong email or password' });
  }
}
