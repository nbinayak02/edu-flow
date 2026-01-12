export interface School {
  id?: number;
  name: string;
  address: string;
  email: string;
  contact: string;
  iemis: string;
  estd: number;
  userId?: number;
  logoPublicId?: string;
}

//partial makes all field optional
export type EmptySchool = Partial<School>;

export type Error = {
  name?: string;
  email?: string;
  address?: string;
  contact?: string;
  iemis?:string;
  estd?:string;
  otherError?: string;
};

export type FormState = {
  errors: Error;
  success: boolean;
};