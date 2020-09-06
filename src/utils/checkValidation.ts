import { Request, Response, NextFunction } from  'express';
import { validationResult } from 'express-validator';
import CustomError from './CustomError';

export default (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = `Invalid field(s): ${[... Array.from(new Set(errors.array().map(({ param }) => param)))].join(', ')}`;
    return next(new CustomError(422, message, true, errors.array()));
  }
  return next();
};
