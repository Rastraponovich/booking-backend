import { Module } from '@nestjs/common';
import { ReservesService } from './reserves.service';
import { ReservesController } from './reserves.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserve } from './entities/reserve.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reserve])],
  controllers: [ReservesController],
  providers: [ReservesService],
})
export class ReservesModule {}
