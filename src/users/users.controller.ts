import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBody,
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiFoundResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('users')
// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ description: 'Create new user' })
  @ApiCreatedResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateUserDto,
  })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ description: 'get all users' })
  @ApiFoundResponse({
    description: 'return all users and count it',
    status: 200,
    type: [CreateUserDto],
  })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ description: 'get one user by id' })
  @ApiOkResponse({
    description: 'return one  user by id',

    status: 200,
    type: CreateUserDto,
  })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ description: 'update  user by id' })
  @ApiOkResponse({
    description: 'return updated  user result',

    status: 201,
    type: UpdateUserDto,
  })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
