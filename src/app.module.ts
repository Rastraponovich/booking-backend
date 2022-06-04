import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TablesModule } from './tables/tables.module';
import { HallplanesModule } from './hallplanes/hallplanes.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ReservesModule } from './reserves/reserves.module';
import { ContactsModule } from './contacts/contacts.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { EventsModule } from './events/events.module';
import configuration from 'config/configuration';
import databaseConfig from 'config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, databaseConfig],
    }),
    DatabaseModule,

    TablesModule,
    HallplanesModule,
    UsersModule,
    RolesModule,
    ReservesModule,
    ContactsModule,
    AuthModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
