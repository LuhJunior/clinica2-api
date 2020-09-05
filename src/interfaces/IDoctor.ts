export default interface IDoctor {
  id: number;
  nome: string;
  // especialidade: string;
  speciality_id: number;
  created_at: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
};
