import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TablesModule } from './tables/tables.module';
import { HallplanesModule } from './hallplanes/hallplanes.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ReservesModule } from './reserves/reserves.module';
import { ContactsModule } from './contacts/contacts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '10.20.3.2',
      port: 5432,
      username: 'admin',
      password: '1',
      database: 'booking',
      autoLoadEntities: true,
      logging: true,

      synchronize: true,
    }),
    TablesModule,
    HallplanesModule,
    UsersModule,
    RolesModule,
    ReservesModule,
    ContactsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
