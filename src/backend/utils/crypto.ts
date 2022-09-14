import { randomBytes, scrypt, createCipheriv, createDecipheriv } from 'crypto';
import { promisify } from 'util';

const iv = randomBytes(16);
const password = 'BwC2Rrpgpf42UUEZLtBqmDRM';
const key = async () =>
  (await promisify(scrypt)(password, 'salt', 32)) as Buffer;

export const encrypt = async (text: string): Promise<string> => {
  const k = await key();
  const cipher = createCipheriv('aes-256-ctr', k, iv);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

export const decrypt = async (text: string): Promise<string> => {
  const k = await key();
  const decipher = createDecipheriv('aes-256-ctr', k, iv);
  let decrypted = decipher.update(text, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
};
