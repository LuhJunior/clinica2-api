export default interface IDoctorResponse {
  id: number;
  nome: string;
  especialidade: string;
  created_at: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
};
