import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @ApiProperty({ required: false })
  title?: string;

  @ApiProperty({ example: '1h 30m', required: false })
  @Matches(/^\d+h\s\d+m$/, {
    message: 'Invalid duration format. Use format like "1h 30m".',
  })
  duration?: string;

  @ApiProperty({ required: false })
  country?: string;

  @ApiProperty({ required: false })
  studio?: string;

  @ApiProperty({
    example: '2024-04-24',
    required: false,
  })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Invalid duration format. Use format like "2024-04-24".',
  })
  release?: string;
}
