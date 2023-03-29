import 'reflect-metadata';
import { Transform } from 'class-transformer';
import { DataSource, Not, Repository } from 'typeorm';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ClassConstructor } from 'class-transformer';
import { stringToBase64 } from '@/utils/string-convertor';
import { Inject, Injectable } from '@nestjs/common';
import { connection } from '@/config/database.config';

import { CategoryEntity } from '@/core/masterdata/category/category.entity';
interface OptionInterface {
  column: string;
  value?: string | number;
  dtoKey?: string;
}
interface ValidationOptionsCustom {
  each?: boolean;
}

export const ToUpperCase = (validationOptions?: ValidationOptionsCustom) => {
  if (validationOptions?.each)
    return Transform((params) =>
      params?.value?.map((param: string) => param?.toUpperCase().trim()),
    );
  return Transform((params) => params?.value?.toUpperCase().trim());
};

export const ToLowerCase = (validationOptions?: ValidationOptionsCustom) => {
  if (validationOptions?.each)
    return Transform((params) =>
      params?.value?.map((param: string) => param?.toLowerCase().trim()),
    );
  return Transform((params) => params?.value?.toLowerCase().trim());
};

export const Trim = () => {
  return Transform((params) => params?.value?.trim());
};

export const EscapeHtml = () => {
  return Transform((params) => {
    return stringToBase64(params.value);
  });
};

const constructQuery = (input: any, args: ValidationArguments) => {
  const { constraints, object } = args;

  if (!constraints.length) return { isValid: false };

  const body = constraints[0];

  const bodyParams: any = { ...object };

  if (!body.table || !body.column) return { isValid: false };

  let query = `select count(*) as ok from ${body.table} where is_active is true and ${body.column} = $1 `;

  const replacements: Array<any> = [];
  replacements.push(input);

  if (body.options) {
    const options: Array<OptionInterface> | OptionInterface = body.options;
    if (Array.isArray(options)) {
      for (let i = 0; i <= options.length - 1; i++) {
        if (options[i].value || bodyParams[options[i].dtoKey as string]) {
          query += `and ${options[i].column} = $${replacements.length + 1} `;
          replacements.push(
            options[i].value || bodyParams[options[i].dtoKey as string],
          );
        }
      }
    } else {
      if (!options.column || !options.value) return { isValid: false };
      else {
        query += ` and ${options.column} = $${replacements.length + 1} `;
        replacements.push(
          options.value || bodyParams[options.dtoKey as string] || null,
        );
      }
    }
  }
  return { query, replacements, isValid: true };
};

export function IsExists<T>(
  entityClass: new () => T,
  entityPropertyName: string,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isExist',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [entityClass, entityPropertyName],
      options: { message: `${entityPropertyName} already exists` },
      validator: IsExistConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'isExist', async: true })
@Injectable()
export class IsExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly repository: Repository<any>) {}

  async validate(value: any, args: ValidationArguments) {
    const [entity, entityPropertyName] = args.constraints;
    const count = await this.repository.count({
      where: {
        [entityPropertyName]: value,
        id: Not(entity.id), // exclude the current entity from the search
      },
    });

    return count > 0;
  }

  defaultMessage(args: ValidationArguments) {
    const [entity, entityPropertyName] = args.constraints;
    return `${entityPropertyName} already exists`;
  }
}
@Injectable()
@ValidatorConstraint({ name: 'isDuplicate', async: true })
class IsDuplicateConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: any): Promise<boolean> {
    const [entityClass, property] = args.constraints;
    console.log(value, 'value', args);
    const response = await connection.manager.findOne(entityClass, {
      where: { [property]: value },
    });
    return !response ? true : false;
  }

  defaultMessage(args: ValidationArguments): string {
    const [entityClass, property] = args.constraints;
    return `${property} must be unique`;
  }
}

export function IsDuplicate<T>(
  entityClass: new () => T,
  entityPropertyName: string,
) {
  console.log(entityClass);
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isDuplicate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [entityClass, entityPropertyName],
      validator: IsDuplicateConstraint,
    });
  };
}

export const NotMatches = (
  pattern: RegExp,
  validationOptions?: ValidationOptions,
) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [pattern],
      validator: NotMatchConstraint,
    });
  };
};

@ValidatorConstraint({ name: 'NotMatches' })
export class NotMatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [fn] = args.constraints;
    const regex = RegExp(fn);
    const matches = regex.test(value);
    return !matches;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} consists of disallowed characters.`;
  }
}
export const Match = <T>(
  type: ClassConstructor<T>,
  property: (o: T) => any,
  validationOptions?: ValidationOptions,
) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
};

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [fn] = args.constraints;
    console.log(fn(args.object));
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    const [constraintProperty]: (() => any)[] = args.constraints;
    return `${constraintProperty} and ${args.property} does not match`;
  }
}

export const ToBoolean = () => {
  const toPlain = Transform(
    ({ value }) => {
      return value;
    },
    {
      toPlainOnly: true,
    },
  );
  const toClass = (target: any, key: string) => {
    return Transform(
      ({ obj }) => {
        return valueToBoolean(obj[key]);
      },
      {
        toClassOnly: true,
      },
    )(target, key);
  };
  return function (target: any, key: string) {
    toPlain(target, key);
    toClass(target, key);
  };
};

const valueToBoolean = (value: any) => {
  if (value === null || value === undefined) {
    return undefined;
  }
  if (typeof value === 'boolean') {
    return value;
  }
  if (['true', 'on', 'yes', '1'].includes(value.toLowerCase())) {
    return true;
  }
  if (['false', 'off', 'no', '0'].includes(value.toLowerCase())) {
    return false;
  }
  return undefined;
};
