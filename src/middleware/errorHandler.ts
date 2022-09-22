import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

export default async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
};