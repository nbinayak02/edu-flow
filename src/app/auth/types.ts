export type Error = {
  fullName?: string;
  email?: string;
  password?: string;
  otherErrorMessage?: string;
};

export type FormState = {
  errors: Error;
};

export interface User {
  fullname: string;
  email: string;
  password: string;
}

