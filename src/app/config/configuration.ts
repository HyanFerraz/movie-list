export default () => ({
  db: {
    type: 'postgres',
    synchronize: true,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    autoLoadEntities: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1m' },
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT || '',
    user: process.env.REDIS_USER || '',
    password: process.env.REDIS_PASSWORD || '',
  },
  app: {
    port: process.env.PORT,
  },
});
