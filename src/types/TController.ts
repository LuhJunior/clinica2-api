import { Request, Response, NextFunction } from 'express';

type TController = (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;

export default TController;
