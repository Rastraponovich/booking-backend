import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TFindAndCountResult } from 'src/common/types';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { UpdateReserveDto } from './dto/update-reserve.dto';
import { Reserve } from './entities/reserve.entity';

@Injectable()
export class ReservesService {
  constructor(
    @InjectRepository(Reserve)
    private reservesRepository: Repository<Reserve>,
  ) {}
  async create(createReserveDto: CreateReserveDto): Promise<Reserve> {
    return await this.reservesRepository.save(createReserveDto);
  }

  async findAll(): Promise<TFindAndCountResult<Reserve>> {
    return await this.reservesRepository.findAndCount();
  }

  async findOne(id: number): Promise<Reserve> {
    return await this.reservesRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateReserveDto: UpdateReserveDto,
  ): Promise<UpdateResult> {
    return await this.reservesRepository.update(id, updateReserveDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.reservesRepository.delete(id);
  }
}
