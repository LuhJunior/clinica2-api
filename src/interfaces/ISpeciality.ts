export default interface ISpeciality {
  id: number;
  name: string;
  created_at: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
};
