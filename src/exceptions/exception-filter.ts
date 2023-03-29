import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as ExceptionFilterInterface,
} from '@nestjs/common';
import { Response } from 'express';
import { InvalidRequestException } from '@/exceptions/invalid-request.exception';
import { RunTimeException } from './run-time.exception';

@Catch()
export class ExceptionFilter implements ExceptionFilterInterface {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus?.() ?? 500;

    const errorResponse = {
      status: status,
      message: exception.message,
      success: false,
      error: {},
    };

    if (exception instanceof InvalidRequestException)
      errorResponse.error = exception.getErrors();
    else if (exception instanceof RunTimeException) {
      errorResponse.message = exception.getResponse();
      errorResponse.error = exception.getErrors();
    } else {
      errorResponse.message = 'Something Went Wrong!';
      errorResponse.error =
        exception?.getErrors?.() ?? exception.errorMsg ?? exception.message;
    }

    response.status(errorResponse.status).json(errorResponse);
  }
}
