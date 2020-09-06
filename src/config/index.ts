import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import winston from './winston';
import InternalError from '../utils/InternalError';

if (!(process.env.NODE_ENV || process.env.PORT)) {
  if (!fs.existsSync(path.join(__dirname, '..', '..', '.env'))) InternalError('.env not found');
  dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });
}

export const env = process.env.NODE_ENV;
export const port = process.env.PORT;
export const logger = winston;

if (!env) InternalError('NODE_ENV not set');
if (!port) InternalError('PORT not set');
