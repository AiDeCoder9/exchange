import { SuccessMessage } from '@/utils/constant';
import { SetMetadata } from '@nestjs/common';

import { ValueOf } from 'type-fest';

export const RESPONSE_MESSAGE = 'RESPONSE_MESSAGE';

export const ResponseMessage = (
  message: string,
  format?: ValueOf<typeof SuccessMessage>,
) => {
  return SetMetadata(RESPONSE_MESSAGE, { message, format });
};
