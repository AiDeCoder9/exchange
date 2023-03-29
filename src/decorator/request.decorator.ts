import { applyDecorators, Type } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function RequestSchema<TModel extends Type<any>>(model: TModel) {
  return applyDecorators(
    ApiOperation({ summary: 'Operation Summary' }),
    ApiBody({ type: model }),
    ApiResponse({
      status: 201,
      description: 'The record has been successfully created.',
      type: model,
    }),
    ApiResponse({ status: 400, description: 'Bad Request.' }),
    ApiResponse({ status: 500, description: 'Internal Server Error.' }),
  );
}
