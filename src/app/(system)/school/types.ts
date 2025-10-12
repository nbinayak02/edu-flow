export interface School {
  id: number;
  name: string;
  address: string;
  email: string;
  contact: string;
  iemis: string;
  estd: number;
  userId: number;
}

//partial makes all field optional
export type EmptySchool = Partial<School>;