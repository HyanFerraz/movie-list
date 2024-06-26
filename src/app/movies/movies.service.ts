import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Repository } from 'typeorm';
import { Movie } from '../infra/entity/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly repository: Repository<Movie>,

    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    await this.cacheManager.del('/movies');
    return await this.repository.save(createMovieDto);
  }

  async findAll() {
    const movies = await this.repository.find();
    if (movies.length > 0) {
      return movies;
    }
    throw new Error('Movie list does not exists');
  }

  async findOne(id: string) {
    try {
      const movie = await this.repository.findOneBy({ id });
      if (movie) {
        return movie;
      }
      throw new Error();
    } catch (err) {
      throw new BadRequestException('Incorrect Movie id');
    }
  }

  async update(id: string, dto: UpdateMovieDto) {
    await this.cacheManager.reset();
    const updated = await this.repository.update(id, dto);
    if (updated.affected != 0) {
      return updated.affected;
    }
    throw new BadRequestException('Movie id does not exists');
  }

  async remove(id: string) {
    await this.cacheManager.reset();
    const deleted = await this.repository.delete({ id });
    if (deleted.affected != 0) {
      return deleted.affected;
    }
    throw new BadRequestException('Movie id does not exists');
  }
}
