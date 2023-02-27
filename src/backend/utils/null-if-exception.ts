import { Logger } from '@nestjs/common';

export default async <T extends unknown>(
  p: Promise<T>,
  logger: Logger,
): Promise<T | null> => {
  try {
    return await p;
  } catch (e) {
    if ((e as { name: string }).name === 'AbortError') {
      logger.error(`Fetch aborted with ${e}`);
    } else {
      logger.error(e);
    }

    return null;
  }
};
