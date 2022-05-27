import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { CreateTableDto } from './create-table.dto';

export class UpdateTableDto extends PartialType(CreateTableDto) {
  @ApiProperty({
    type: Boolean,
    example: true,
    required: false,
    description: 'status',
  })
  active?: boolean;
  @ApiProperty({
    type: Number,
    example: 1,
    required: false,
    description: 'id плана зала',
  })
  hallId?: number;
  @ApiProperty({
    type: String,
    example: 'hall.jpeg',
    required: false,
    description: 'имя изображения',
  })
  image?: string;
  @ApiProperty({
    type: String,
    example: 'основонй',
    required: false,
    description: 'имя плана зала',
  })
  name?: string;
  @ApiResponseProperty({ type: Number, example: 1 })
  readonly id?: number;
}
