import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class CreateTableDto {
  @ApiProperty({
    type: String,
    description: 'наименование столика',
    required: true,
    nullable: false,
    example: 'основной',
  })
  name: string;

  @ApiResponseProperty({ type: Boolean, example: true })
  active?: boolean = true;

  @ApiProperty({
    type: String,
    example: 'hall.jpeg',
    nullable: false,
    description: 'Название изображения',
    default: 'hall.jpeg',
  })
  image?: string;
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'id Плана зала',
    required: true,
    nullable: false,
  })
  hallId: number;

  @ApiResponseProperty({ type: Number, example: 1 })
  id: number;
}
