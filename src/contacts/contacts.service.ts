import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TFindAndCountResult } from 'src/common/types';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
  ) {}
  async create(createContactDto: CreateContactDto): Promise<Contact> {
    return await this.contactsRepository.save(createContactDto);
  }

  async findAll(): Promise<TFindAndCountResult<Contact>> {
    return await this.contactsRepository.findAndCount();
  }

  async findOne(id: number): Promise<Contact> {
    return await this.contactsRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateContactDto: UpdateContactDto,
  ): Promise<UpdateResult> {
    return await this.contactsRepository.update(id, updateContactDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.contactsRepository.delete(id);
  }
}
