import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('movies')
@ApiTags('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOkResponse({
    description: 'Create a new movie in database',
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Information missing or incorect format',
  })
  async create(@Body() createMovieDto: CreateMovieDto) {
    return await this.moviesService.create(createMovieDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Return a movie array',
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'Movie list does not exists' })
  async findAll() {
    return await this.moviesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Return a movie querried by id',
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Movie id does not exists' })
  async findOne(@Param('id') id: string) {
    return await this.moviesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Update a movie in database',
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Movie id does not exists' })
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    const moviesUpdated = await this.moviesService.update(id, updateMovieDto);
    return {
      message: `${moviesUpdated} movie has been updated`,
    };
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete a movie in database',
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Movie id does not exists' })
  async remove(@Param('id') id: string) {
    const moviesDeleted = await this.moviesService.remove(id);
    return {
      message: `${moviesDeleted} movie has been deleted`,
    };
  }
}
