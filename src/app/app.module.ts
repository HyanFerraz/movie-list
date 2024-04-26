import { Module } from '@nestjs/common';
import { InfraModule } from './infra/infra.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [InfraModule, MoviesModule],
})
export class AppModule {}
