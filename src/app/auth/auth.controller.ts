import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LocalGuard } from './guard/local.guard';
import { Request } from 'express';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  @UseInterceptors(JwtInterceptor)
  @ApiBody({
    type: AuthDto,
  })
  @ApiOkResponse({
    description: 'User Login',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  async login(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  @UseInterceptors(JwtInterceptor)
  @ApiCreatedResponse({
    description: 'Create a new user in database',
  })
  @ApiConflictResponse({
    description: 'Username or Email already exists in database',
  })
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() payload: AuthDto) {
    return await this.authService.createUser(payload);
  }
}
