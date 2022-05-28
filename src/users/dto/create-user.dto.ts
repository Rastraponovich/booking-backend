import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'имя пользователя',
    required: true,
    example: 'Иванов Иван',
  })
  name: string;

  @ApiProperty({
    description: 'id роли пользователя',
    required: false,
    example: 1,
  })
  roleId: number;

  @ApiProperty({
    description: 'почта пользователя',
    required: true,
    uniqueItems: true,
    example: 'user@mail.ru',
  })
  email: string;

  @ApiProperty({ description: 'пароль пользователя', example: '12345678' })
  password: string;
  @ApiResponseProperty({ example: true, type: Boolean })
  isActive?: boolean = true;

  @ApiResponseProperty({ example: 1, type: Number })
  id?: number;
}
