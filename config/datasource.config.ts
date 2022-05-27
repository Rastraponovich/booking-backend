import { DataSourceOptions } from 'typeorm';
// import dotenv from 'dotenv';

// dotenv.config();

export function getConfig() {
  return {
    type: 'postgres',
    //   host: process.env.MYSQL_HOST,
    //   port: parseInt(process.env.MYSQL_PORT, 10),
    //   username: process.env.MYSQL_USER,
    //   password: process.env.MYSQL_PASSWORD,
    //   database: process.env.MYSQL_DB,
    host: '10.20.3.2',
    port: 5432,
    username: 'admin',
    entities: [__dirname + '/../src/**/entities/*.entity.ts'],
    password: '1',
    database: 'booking',
    synchronize: false,
    migrations: [__dirname + '/../seeds/*.ts'],
  } as DataSourceOptions;
}
