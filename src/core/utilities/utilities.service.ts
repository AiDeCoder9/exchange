import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
@Injectable()
export class UtilityService {
  getImage(filename: string): Promise<Buffer> {
    const filePath = path.join(__dirname, '..', 'uploads', filename);
    console.log(filePath, 'filepath', process.cwd());
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}
