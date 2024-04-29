import { Module } from '@nestjs/common';
import { InfraModule } from './infra/infra.module';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [InfraModule, MoviesModule, AuthModule],
})
export class AppModule {}
