import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '1h 30m' })
  @Matches(/^\d+h\s\d+m$/, {
    message: 'Invalid duration format. Use format like "1h 30m".',
  })
  duration: string;

  @ApiProperty()
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  studio: string;

  @ApiProperty({
    example: '2024-04-24',
  })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Invalid duration format. Use format like "2024-04-24".',
  })
  release: string;
}
