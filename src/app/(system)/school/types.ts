import { School, User } from "@prisma/client";

//partial makes all field optional
export type EmptySchool = Partial<School>;

export type Error = {
  name?: string;
  email?: string;
  address?: string;
  contact?: string;
  iemis?: string;
  estd?: string;
  otherError?: string;
};

export type FormState = {
  errors: Error;
  success: boolean;
};

export type UpdatePayload = Omit<School, "createdAt">;
export type CreatePayload = Omit<School, "createdAt" | "id">;
export type SchoolDetails = Pick<User, "id" | "fullname"> & { school: School | null};