import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, RequestWithIdentity } from '../types/auth.type';
import ServerConfig from '../configs/server.config';

async function userMiddleware(
  req: RequestWithIdentity,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { cookies } = req;
  if (!cookies.Authorization) next();
  if (cookies && cookies.Authorization) {
    // eslint-disable-next-line camelcase
    const { jwt_secret } = new ServerConfig();
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const verificationResponse = jwt.verify(
        cookies.Authorization,
        jwt_secret
      ) as DataStoredInToken;
      req.userId = verificationResponse.id;
      next();
    } catch (error) {
      next(new HttpException(403, 'Incorrect authentication token'));
    }
  }
}

export default userMiddleware;
