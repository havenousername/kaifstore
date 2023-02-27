import { HttpException, HttpStatus } from '@nestjs/common';

export default <T extends unknown>(
  value: T | null | undefined,
  name?: string,
): T => {
  if (!value) {
    throw new HttpException(
      `No such ${name} ${value}. Please try again`,
      HttpStatus.NOT_FOUND,
    );
  }
  return value;
};
