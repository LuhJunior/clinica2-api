export default interface ISpeciality {
  id: number;
  nome: string;
  created_at: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
};
