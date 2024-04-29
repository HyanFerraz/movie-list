import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Observable, map } from 'rxjs';

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((user) => {
        const res = context.switchToHttp().getResponse<Response>();
        const token = this.jwtService.sign({ sub: user });

        res.setHeader('Authorization', `Bearer ${token}`);

        return;
      }),
    );
  }
}
