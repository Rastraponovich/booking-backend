import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.POSTGRES_HOST || '10.20.3.2',
  port: process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USER || 'admin',
  password: process.env.POSTGRES_PASSWORD || 1,
  database: process.env.POSTGRES_DB || 'booking',
}));
