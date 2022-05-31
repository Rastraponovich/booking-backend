import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TFindAndCountResult } from 'src/common/types';
import { DeleteResult, Not, Repository, UpdateResult } from 'typeorm';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table } from './entities/table.entity';

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(Table) private tablesRepository: Repository<Table>,
  ) {}
  async create(createTableDto: CreateTableDto): Promise<Table> {
    return await this.tablesRepository.save(createTableDto);
  }

  async findAll(id: number): Promise<TFindAndCountResult<Table>> {
    const condition = id !== 0 && { hallplaneId: id };

    return await this.tablesRepository.findAndCount({
      where: { ...condition },
      relations: {
        reserves: true,
      },
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Table> {
    return await this.tablesRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateTableDto: UpdateTableDto,
  ): Promise<UpdateResult> {
    return await this.tablesRepository.update(id, updateTableDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.tablesRepository.delete(id);
  }
}
