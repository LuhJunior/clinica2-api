export default interface IDoctor {
  id: number;
  name: string;
  speciality_id: number;
  speciality?: string;
  created_at: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
};
