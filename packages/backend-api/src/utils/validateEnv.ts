import { cleanEnv, port, str } from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    POSTGRES_HOST: str(),
    POSTGRES_DATABASE: str(),
    POSTGRES_USER: str(),
    POSTGRES_PASSWORD: str(),
    JWT_SECRET: str(),
    PORT: port(),
  });
}

export default validateEnv;
