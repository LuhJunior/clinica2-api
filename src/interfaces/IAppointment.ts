import EAppointment from '../enums/EAppointmentStatus';

export default interface IAppointment {
  id: number;
  name: string;
  specie: string;
  breed: string;
  immediate: boolean;
  // especialidade: string;
  speciality_id: number;
  status: EAppointment;
  created_at: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
};
