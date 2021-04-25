import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction // must be presence for express to fire error middleware
) {
  let status: number;
  let message: string;

  console.error(error.message);

  if (error instanceof HttpException) {
    status = error.status || 500;
    message = error.message || 'Something went wrong';

    console.error('[ERROR] ', status, message);
    res.status(status).json({ message });
  } else {
    res.status(500).json({ message: error.message });
  }
}

export default errorMiddleware;
