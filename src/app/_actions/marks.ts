"use server";

import { MarksError, MarksFormState } from "../(system)/marks/types";

export async function AddMarks(
  prevState: MarksFormState,
  formData: FormData
): Promise<MarksFormState> {
  console.log("FOrm data is: ", formData);
  const errors: MarksError = {};
  return { errors };
}
