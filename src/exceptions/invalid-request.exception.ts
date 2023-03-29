import { HttpException } from '@nestjs/common';

export class InvalidRequestException extends HttpException {
  private readonly error: Record<string, Array<string>>;

  constructor(error: Record<string, Array<string>>) {
    super('Invalid Data Sent', 422);
    this.error = error;
  }

  getErrors() {
    return this.error;
  }
}
