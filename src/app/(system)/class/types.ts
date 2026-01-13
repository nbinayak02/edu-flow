import { Sclass } from "@prisma/client";

export type createPayload = Omit<Sclass, "id" | "createdAt">;

export type Error = {
  name?: string;
  otherError?: string;
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
