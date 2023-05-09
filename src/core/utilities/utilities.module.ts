import { Module } from '@nestjs/common';
import { UtilityController } from './utilities.controller';
import { UtilityService } from './utilities.service';

@Module({
  imports: [],
  controllers: [UtilityController],
  providers: [UtilityService],
  exports: [UtilityService],
})
export class UtilityModule {}
