module.exports = [
  {
    name: 'seeds',
    type: 'postgres',
    host: '10.20.3.2',
    port: 5432,
    username: 'admin',
    entities: ['src/**/entities/*.entity.ts'],
    password: '1',
    database: 'booking',
    migrations: ['seeds/*.ts'],
    cli: {
      migrationsDir: 'seeds',
    },
  },
];
