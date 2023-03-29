import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { formatValidationError } from '@/utils/format-validation';
import { InvalidRequestException } from '@/exceptions/invalid-request.exception';

export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.validateMetaType(metatype)) return value;

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors?.length)
      throw new InvalidRequestException(formatValidationError(errors));

    return value;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private validateMetaType(metatype: Function) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];

    return !types.includes(metatype);
  }
}
