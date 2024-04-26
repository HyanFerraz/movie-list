import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { InfraModule } from '../infra/infra.module';

@Module({
  imports: [InfraModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
