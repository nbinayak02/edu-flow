export type Subject = {
  id?: number;
  name: string;
  credit_hour: number;
  sclassId?: number;
  sclass?: {id: number, name: string, schoolId:number}
};

export type Error = {
  name?: string;
  creditHour?: string;
  classId?: string;
};

export type FormState = {
  errors: Error;
};

