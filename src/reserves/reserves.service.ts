import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TFindAndCountResult, TParams } from 'src/common/types';
import {
  Between,
  DeleteResult,
  MoreThanOrEqual,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { UpdateReserveDto } from './dto/update-reserve.dto';
import { Reserve } from './entities/reserve.entity';

import { prepaysDict } from './../common/dict';

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
    const { withDeleted, hallplaneId, prepayType } = params;

    const condition = hallplaneId && { hallplaneId };

    let prepay = null;

    switch (prepayType) {
      case 1:
        prepay = prepaysDict[prepayType].value[0];
        break;
      case 2:
        prepay = Between(
          prepaysDict[prepayType].value[0],
          prepaysDict[prepayType].value[1],
        );

        break;
      case 3:
        prepay = Between(
          prepaysDict[prepayType].value[0],
          prepaysDict[prepayType].value[1],
        );
        break;
      case 4:
        prepay = Between(
          prepaysDict[prepayType].value[0],
          prepaysDict[prepayType].value[1],
        );
        break;
      case 5:
        prepay = MoreThanOrEqual(prepaysDict[prepayType].value[0]);
      default:
        break;
    }

    const prepayCondition = prepay && { prepay };

    const result = await this.reservesRepository.findAndCount({
      relations: {
        hallplane: true,
        table: true,
      },
      withDeleted,
      where: { ...condition, ...prepayCondition },
    });

    return result;
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
