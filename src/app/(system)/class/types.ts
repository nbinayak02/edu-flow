export type Class = {
  id?: number;
  name: string;
  schoolId?: number;
};

export type Error = {
  name?: string;
};

export type FormState = {
  errors: Error;
};

export type DeleteInitialState = {
  id?: number;
  status?: boolean;
};

export type DeleteFormState = {
    message: DeleteInitialState;
  };
