import { DocumentBuilder } from '@nestjs/swagger';

export default new DocumentBuilder()
  .setTitle('Exchange Application')
  .setDescription('Exchange everything and anything')
  .setVersion('1.0')
  .addTag('MarketPlace')
  .build();
