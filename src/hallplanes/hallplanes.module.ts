import { Module } from '@nestjs/common';
import { HallplanesService } from './hallplanes.service';
import { HallplanesController } from './hallplanes.controller';

@Module({
  controllers: [HallplanesController],
  providers: [HallplanesService]
})
export class HallplanesModule {}
