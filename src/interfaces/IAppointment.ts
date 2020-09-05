export default interface IAppointment {
  id: number;
  nome: string;
  especie: string;
  raca: string;
  urgente: boolean;
  // especialidade: string;
  speciality_id: number;
  created_at: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
};
