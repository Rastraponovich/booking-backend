import { Injectable } from '@nestjs/common';
import { CreateHallplaneDto } from './dto/create-hallplane.dto';
import { UpdateHallplaneDto } from './dto/update-hallplane.dto';

@Injectable()
export class HallplanesService {
  create(createHallplaneDto: CreateHallplaneDto) {
    return 'This action adds a new hallplane';
  }

  findAll() {
    return `This action returns all hallplanes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hallplane`;
  }

  update(id: number, updateHallplaneDto: UpdateHallplaneDto) {
    return `This action updates a #${id} hallplane`;
  }

  remove(id: number) {
    return `This action removes a #${id} hallplane`;
  }
}
