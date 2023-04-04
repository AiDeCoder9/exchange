import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import * as util from 'util';
import { RESPONSE_MESSAGE } from '@/decorator/response.decorator';

export interface SuccessResponse<T> {
  data: T;
  success: true;
  status: HttpStatus;
  message: string;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, SuccessResponse<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<SuccessResponse<T>> | Promise<Observable<SuccessResponse<T>>> {
    const { message, format } = this.reflector.getAllAndOverride<{
      message: string;
      format?: string;
    }>(RESPONSE_MESSAGE, [context.getHandler(), context.getClass()]);

    return next.handle().pipe(
      map((data) => ({
        data,
        success: true,
        status: 200,
        message: format ? util.format(format, message) : message,
      })),
    );
  }
}
