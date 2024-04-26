import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Repository } from 'typeorm';
import { Movie } from '../infra/entity/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly repository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    return await this.repository.save(createMovieDto);
  }

  async findAll() {
    const movies = await this.repository.find();
    if (movies.length > 0) {
      return movies;
    }
    throw new HttpException(
      'Movie list does not exists',
      HttpStatus.NO_CONTENT,
    );
  }

  async findOne(id: string) {
    try {
      return await this.repository.findOneBy({ id });
    } catch (err) {
      throw new HttpException(
        'Movie id does not exists',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, dto: UpdateMovieDto) {
    const updated = await this.repository.update(id, dto);
    if (updated.affected != 0) {
      return updated.affected;
    }
    throw new HttpException('Movie id does not exists', HttpStatus.BAD_REQUEST);
  }

  async remove(id: string) {
    const deleted = await this.repository.delete({ id });
    if (deleted.affected != 0) {
      return deleted.affected;
    }
    throw new HttpException('Movie id does not exists', HttpStatus.BAD_REQUEST);
  }
}
