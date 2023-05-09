import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { UtilityService } from './utilities.service';

@Controller()
export class UtilityController {
  constructor(private readonly utilityService: UtilityService) {}

  @Get('static/:filename')
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    const image = await this.utilityService.getImage(filename);
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(image);
  }
}
