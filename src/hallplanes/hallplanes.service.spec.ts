import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockRepository, createMockRepository } from '../common/tests';
import { Hallplane } from './entities/hallplane.entity';
import { HallplanesService } from './hallplanes.service';

describe('HallplanesService', () => {
  let service: HallplanesService;
  let hallplanesRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HallplanesService,
        {
          provide: getRepositoryToken(Hallplane),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<HallplanesService>(HallplanesService);
    hallplanesRepository = module.get<MockRepository>(
      getRepositoryToken(Hallplane),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne hallplane by id', () => {
    describe('when hallplane with ID exists', () => {
      it('should return the hallplane object', async () => {
        const id = '1';
        const expectedHallplane = {
          id: 1,
          name: 'основной',
          image: 'hall.jpeg',
        };

        hallplanesRepository.findOne.mockReturnValue(expectedHallplane);

        const hallplane = await service.findOne(+id);

        expect(hallplane).toEqual(expectedHallplane);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const id = '1';
        hallplanesRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(+id);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toEqual('');
        }
      });
    });
  });

  describe('findAndCount hallplanes', () => {
    describe('find and count hallplanes without query params', () => {
      it('should return the hallplanes array and counter', async () => {
        const expectedHallplane = [];

        hallplanesRepository.findAndCount.mockReturnValue(expectedHallplane);

        const hallplanes = await service.findAll();

        expect(hallplanes).toEqual(expectedHallplane);
      });
    });
    // describe('otherwise', () => {
    //   it('should throw the "NotFoundException"', async () => {
    //     const id = '1';
    //     hallplanesRepository.findOne.mockReturnValue(undefined);

    //     try {
    //       await service.findOne(+id);
    //     } catch (error) {
    //       expect(error).toBeInstanceOf(NotFoundException);
    //       expect(error.message).toEqual('');
    //     }
    //   });
    // });
  });

  describe('delete', () => {
    describe('delete item', () => {
      it('should return the deleted result', async () => {
        const id = '1';
        const expectedResult = { raw: '', affected: '' };

        hallplanesRepository.delete.mockReturnValue(expectedResult);
        const result = await service.remove(+id);

        expect(result).toEqual(expectedResult);
      });
    });
  });
});
