import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as uuid from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { ImportImageData } from '../import-export/dto/make-import.dto';
import { https } from 'follow-redirects';

@Injectable()
export class FilesService {
  /*
   **
   * @throws {HttpException}
   */
  async createFile(
    file: Express.Multer.File,
    directory?: string,
  ): Promise<string>;
  async createFile(file: ImportImageData, directory?: string): Promise<string>;
  async createFile(
    file: Express.Multer.File | ImportImageData,
    directory = 'default',
  ) {
    try {
      if ((file as ImportImageData).url) {
        return await FilesService.fileCreation(
          file as ImportImageData,
          directory,
        );
      } else {
        return FilesService.multerFileCreation(
          file as Express.Multer.File,
          directory,
        );
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private static async fileCreation(
    file: ImportImageData,
    directory = 'default',
  ) {
    const fileName = uuid.v4() + '.' + file.type.split('/')[1];
    const filePath = path.resolve(__dirname, '..', `static/${directory}`);
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    return new Promise<string>((resolve, reject) => {
      const url = new URL(file.url);
      const options = {
        method: 'GET',
        hostname: url.hostname,
        path: url.pathname,
        headers: {
          Authorization: `Bearer ${file.bearer}`,
        },
        maxRedirects: 20,
      };

      const req = https.request(options, function (response) {
        if (response.statusCode !== 200) {
          return reject('Error. Response status was ' + response.statusCode);
        }

        const chunks = [];

        response.on('data', function (chunk) {
          chunks.push(chunk);
        });

        response.on('end', function () {
          const body = Buffer.concat(chunks);
          fs.writeFileSync(path.join(filePath, fileName), body);
        });

        response.on('error', function (error) {
          console.error(error);
          fs.unlink(path.join(filePath, fileName), () => reject(error.message));
        });
      });

      req.end(() => {
        resolve(directory + '/' + fileName);
      });
    });
  }

  private static multerFileCreation(
    file: Express.Multer.File,
    directory,
  ): string {
    const fileName = uuid.v4() + '.' + file.mimetype.split('/')[1];
    const filePath = path.resolve(__dirname, '..', `static/${directory}`);
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    fs.writeFileSync(path.join(filePath, fileName), file.buffer);
    return directory + '/' + fileName;
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

  hasFile(filename: string, subPath: string): boolean {
    const filePath = path.resolve(__dirname, '..', `static/${subPath}`);
    return fs.existsSync(path.join(filePath, filename));
  }
}
