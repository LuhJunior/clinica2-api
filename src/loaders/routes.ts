import { Application } from 'express';

import routes from '../routes';

export default (app: Application): void => {
  app.use('/api/doctor',  routes.doctorRoutes);
  app.use('/api/speciality',  routes.specialityRoutes);
  app.use('/api/appointment',  routes.appointmentRoutes);
};
