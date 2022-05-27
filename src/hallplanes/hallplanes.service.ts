import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TFindAndCountResult } from 'src/common/types';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateHallplaneDto } from './dto/create-hallplane.dto';
import { UpdateHallplaneDto } from './dto/update-hallplane.dto';
import { Hallplane } from './entities/hallplane.entity';

@Injectable()
export class HallplanesService {
  constructor(
    @InjectRepository(Hallplane)
    private hallplanesRepository: Repository<Hallplane>,
  ) {}
  async create(createHallplaneDto: CreateHallplaneDto): Promise<Hallplane> {
    return await this.hallplanesRepository.save(createHallplaneDto);
  }

  async findAll(): Promise<TFindAndCountResult<Hallplane>> {
    return await this.hallplanesRepository.findAndCount();
  }

  async findOne(id: number): Promise<Hallplane> {
    return await this.hallplanesRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateHallplaneDto: UpdateHallplaneDto,
  ): Promise<UpdateResult> {
    return await this.hallplanesRepository.update(id, updateHallplaneDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.hallplanesRepository.delete(id);
  }
}
