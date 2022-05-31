import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TFindAndCountResult, TParams } from 'src/common/types';
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

  async findAll(params: TParams): Promise<TFindAndCountResult<Reserve>> {
    const { withDeleted } = params;
    return await this.reservesRepository.findAndCount({
      relations: {
        hallplane: true,
        table: true,
      },
      withDeleted,
    });
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
    return this.reservesRepository.softDelete(id);
  }

  async removeSelected(ids: Array<number>): Promise<DeleteResult> {
    return await this.reservesRepository.softDelete(ids);
  }

  async removeAll(): Promise<DeleteResult> {
    const reserves = await this.reservesRepository.find({
      where: { deletedAt: null },
    });

    const ids = reserves.map((r) => r.id);

    if (ids.length) return await this.reservesRepository.softDelete(ids);
    return;
  }
}
