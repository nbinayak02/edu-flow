"use server";

import { GetAllMarksheeetByClassAndExam } from "@/lib/data/marks";
import {
  MarksheetSearch,
  MarksheetSearchError,
} from "../(system)/marksheet/types";

export async function GetAllMarksheet(
  _: unknown,
  formData: FormData
): Promise<MarksheetSearch> {
  const sclassId = Number(formData.get("sclassId"));
  const year = Number(formData.get("year"));
  const examId = Number(formData.get("examId"));

  // validation

  const marksheetSearchError: MarksheetSearchError = {};

  if (!sclassId) marksheetSearchError.class = "Please select class.";
  if (!year) marksheetSearchError.exam = "Please select year.";
  if (!examId) marksheetSearchError.exam = "Please select exam.";

  if (Object.entries(marksheetSearchError).length > 0) {
    return { errors: marksheetSearchError, data: [] };
  }

  try {
    const marksheets = await GetAllMarksheeetByClassAndExam(sclassId, examId);
    return { errors: {}, data: marksheets };
  } catch (error) {
    console.log("Error in Marksheet Search: ", error);
    return { errors: { otherErrors: "Something went wrong!" }, data: [] };
  }
}
