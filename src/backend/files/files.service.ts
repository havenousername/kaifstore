import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as uuid from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  /*
   **
   * @throws {HttpException}
   */
  async createFile(file: Express.Multer.File, directory = 'default') {
    try {
      const fileName = uuid.v4() + '.' + file.mimetype.split('/')[1];
      const filePath = path.resolve(__dirname, '..', `static/${directory}`);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return directory + '/' + fileName;
    } catch (error) {
      throw new HttpException(
        'There was some file writing error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @throws {HttpException}
   */
  async removeFile(fileName: string, subPath: string): Promise<void> {
    const filePath = path.resolve(__dirname, '..', `static/${subPath}`);
    try {
      if (!fs.existsSync(filePath)) {
        await Promise.reject(
          new HttpException(
            `No such directory to remove. Please create ${subPath} before removing`,
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      } else {
        fs.rmSync(path.join(filePath, fileName));
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
