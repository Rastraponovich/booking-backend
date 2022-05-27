import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HallplanesService } from './hallplanes.service';
import { CreateHallplaneDto } from './dto/create-hallplane.dto';
import { UpdateHallplaneDto } from './dto/update-hallplane.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Hallplanes')
@Controller('hallplanes')
export class HallplanesController {
  constructor(private readonly hallplanesService: HallplanesService) {}

  @Post()
  create(@Body() createHallplaneDto: CreateHallplaneDto) {
    return this.hallplanesService.create(createHallplaneDto);
  }

  @Get()
  findAll() {
    return this.hallplanesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hallplanesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHallplaneDto: UpdateHallplaneDto,
  ) {
    return this.hallplanesService.update(+id, updateHallplaneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hallplanesService.remove(+id);
  }
}
