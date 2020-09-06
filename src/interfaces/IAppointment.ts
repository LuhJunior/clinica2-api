import EAppointment from '../enums/EAppointmentStatus';

export default interface IAppointment {
  id: number;
  name: string;
  specie: string;
  breed: string;
  immediate: boolean;
  speciality?: string;
  speciality_id: number;
  status?: string;
  status_id: EAppointment;
  created_at: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
};
