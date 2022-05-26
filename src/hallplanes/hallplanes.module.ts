import { Module } from '@nestjs/common';
import { HallplanesService } from './hallplanes.service';
import { HallplanesController } from './hallplanes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hallplane } from './entities/hallplane.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hallplane])],
  controllers: [HallplanesController],
  providers: [HallplanesService],
})
export class HallplanesModule {}
