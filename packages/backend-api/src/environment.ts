import path from 'path';
import dotenv from 'dotenv';

const envFile = '.env';
const result = dotenv.config({ path: path.normalize(envFile) });
if (result.error) {
  console.log(result.error);
  throw new Error(result.error.message);
}
