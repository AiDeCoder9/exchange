import { HttpException } from '@nestjs/common';

export class RunTimeException extends HttpException {
  private readonly error: any;

  constructor(message: string, status: number, error?: any) {
    super(message, status);
    this.error = error;
  }

  getErrors() {
    return this.error;
  }
}
