import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LocalGuard } from './guard/local.guard';
import { Request, Response } from 'express';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from './guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  @UseInterceptors(JwtInterceptor)
  async login(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  async register(@Body() payload: AuthDto) {
    return await this.authService.createUser(payload);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  async profile(@Req() req: Request) {
    return req.user;
  }
}
