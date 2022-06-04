import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { WsAdapter } from '@nestjs/platform-ws';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import fastifyCookie from 'fastify-cookie';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
    { cors: true },
  );

  app.useWebSocketAdapter(new WsAdapter(app));
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await app.register(fastifyCookie, {
    secret: 'my-secret', // for cookies signature
  });

  const config = new DocumentBuilder()
    .setTitle('Booking example')
    .setDescription('The booking API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
