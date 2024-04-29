import {
  Body,
  Controller,
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
  @UseInterceptors(JwtInterceptor)
  async register(@Body() payload: AuthDto) {
    return await this.authService.createUser(payload);
  }
}
