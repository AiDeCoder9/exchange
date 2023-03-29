import { ValidationError } from '@nestjs/common';

export const formatValidationError = (errors: ValidationError[]) => {
  let valErrors: { [key: string]: Array<string> } = {};

  for (const error of errors) {
    if (error.children && error.children.length)
      formatValidationError(error.children);
    else {
      const valError: Array<string> = [];
      const errorConstraints = error.constraints;
      for (const constraint in errorConstraints)
        valError.push(errorConstraints[constraint]);
      valErrors = { ...valErrors, [error.property]: valError.reverse() } as any;
    }
  }

  return valErrors;
};
