import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseBoolPipe,
  DefaultValuePipe,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReservesService } from './reserves.service';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { UpdateReserveDto } from './dto/update-reserve.dto';
import { ApiTags } from '@nestjs/swagger';
import { TParams } from 'src/common/types';

@ApiTags('Reserves')
@Controller('reserves')
export class ReservesController {
  constructor(private readonly reservesService: ReservesService) {}

  @Post()
  create(@Body() createReserveDto: CreateReserveDto) {
    return this.reservesService.create(createReserveDto);
  }

  @Get()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      skipNullProperties: true,
      skipMissingProperties: true,
      skipUndefinedProperties: true,
      enableDebugMessages: true,
      disableErrorMessages: false,
    }),
  )
  findAll(
    @Query('withDeleted', new DefaultValuePipe(false), ParseBoolPipe)
    withDeleted: boolean,
    @Query('hallplaneId')
    hallplaneId?: string,
    @Query('prepayType', new DefaultValuePipe(0), ParseIntPipe)
    prepayType?: number,
  ) {
    return this.reservesService.findAll({
      withDeleted,
      hallplaneId: Number(hallplaneId),
      prepayType,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReserveDto: UpdateReserveDto) {
    return this.reservesService.update(+id, updateReserveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservesService.remove(+id);
  }

  @Post('/selected')
  removeSeleteced(@Body() ids: Array<number>) {
    return this.reservesService.removeSelected(ids);
  }

  @Delete('/all')
  removeAll() {
    return this.reservesService.removeAll();
  }
}
