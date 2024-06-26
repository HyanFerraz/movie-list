import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'username',
  })
  username: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'password',
  })
  password: string;
}
