import { InjectRepository } from '@nestjs/typeorm';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Table } from 'src/tables/entities/table.entity';
import { Repository } from 'typeorm';

import { Server, Socket } from 'socket.io';

@WebSocketGateway(80)
export class EventsGateway implements OnGatewayConnection {
  constructor(
    @InjectRepository(Table) private tablesRepository: Repository<Table>,
  ) {}

  async handleConnection(socket: Socket) {}

  @WebSocketServer()
  server: Server;
  @SubscribeMessage('events')
  async onEvent(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const tables = await this.tablesRepository.find();
    return tables;
  }
}
