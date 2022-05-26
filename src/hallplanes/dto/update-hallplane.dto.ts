import { PartialType } from '@nestjs/mapped-types';
import { CreateHallplaneDto } from './create-hallplane.dto';

export class UpdateHallplaneDto extends PartialType(CreateHallplaneDto) {}
