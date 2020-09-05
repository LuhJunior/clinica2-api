import { Application } from 'express';

import routes from '../routes';

export default (app: Application): void => {
  app.use('/api/doctor',  routes.doctorRoutes);
};
