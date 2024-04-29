import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Movie } from './entity/movie.entity';
import configuration from '../config/configuration';
import { User } from './entity/user.entity';
import { CacheModule, CacheModuleOptions } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local'],
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...config.get<TypeOrmModuleOptions>('db'),
      }),
    }),
    TypeOrmModule.forFeature([Movie, User]),
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        isGlobal: true,
        store: redisStore,
        ttl: 1 * 60,
        ...config.get<CacheModuleOptions>('redis'),
      }),
    }),
  ],
  exports: [TypeOrmModule, CacheModule],
})
export class InfraModule {}
