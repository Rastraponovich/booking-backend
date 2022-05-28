import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findByEmail(username);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async registration(user: any) {
    const candidate = await this.usersService.findByEmail(user.email);

    if (candidate)
      throw new HttpException('user allready exist', HttpStatus.BAD_REQUEST);

    const hashPassword = await bcrypt.hash(user.password, 5);

    const newUser = await this.usersService.create({
      ...user,
      password: hashPassword,
    });

    return newUser;
  }
}
