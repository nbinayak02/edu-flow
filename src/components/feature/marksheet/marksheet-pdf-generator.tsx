import { Marksheet, MarksInMarksheet } from "@/app/(system)/marks/types";
import { School } from "@/app/(system)/school/types";
import { Inter } from "next/font/google";
import React, { Ref } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const subjects = [
  "Nepali",
  "English",
  "Mathematics",
  "Science and Technology",
  "Social Studies",
  "Occupation",
  "Health",
  "Computer",
  "Local Subject",
];

const GradeSheet = ({
  ref,
  school,
  marksheet,
  marks,
}: {
  ref: Ref<HTMLDivElement>;
  school: School;
  marksheet: Marksheet;
  marks: MarksInMarksheet[];
}) => {
  return (
    <>
      {/* Page */}
      <div
        className={`w-[210mm] h-[285mm] mx-auto bg-white ${inter.className}`}
        ref={ref}
      >
        <div className="mt-10 border-[3px] border-blue-900/80 p-[1mm] h-full">
          <div className="border-2 border-blue-900/80 p-3 h-full">
            {/* Header */}
            <div className="flex mt-3 relative">
              <img
                src="https://picsum.photos/100"
                alt="School Logo"
                className="w-30 h-30 rounded-xl absolute translate-y-10 translate-x-1"
              />

              <div className="w-full flex flex-col items-center gap-1">
                <h1 className="text-blue-700 text-3xl font-extrabold uppercase">
                  {school.name}
                </h1>
                <h3 className="text-[18px]">{school.address}</h3>
                <h2 className="text-blue-700 text-xl font-extrabold uppercase">
                  {marksheet.exam?.name}-{marksheet.exam?.year}
                </h2>
                <p className="mt-5 px-4 py-1 bg-blue-700 text-white font-extrabold uppercase text-xl tracking-wide">
                  Gradesheet
                </p>
              </div>
            </div>

            {/* Student Info */}
            <div className="mt-10">
              <div className="font-bold">
                Student Name:{" "}
                <span className="font-medium text-blue-700">
                  {marksheet.student?.name}
                </span>
              </div>

              <div className="flex justify-between font-bold mt-1">
                <p>
                  Class:{" "}
                  <span className="font-medium">{marksheet.sclass?.name}</span>
                </p>
                <p>
                  Roll Number:{" "}
                  <span className="font-medium">{marksheet.student?.id}</span>
                </p>
                <p>
                  Section:{" "}
                  <span className="font-medium">
                    {marksheet.student?.iemis}
                  </span>
                </p>
              </div>
            </div>

            {/* Marks Table */}
            <table className="w-full border-2 border-black/50 mt-4 p-2 text-center">
              <thead>
                <tr className="*:border-2 *:border-black *:px-2">
                  <th rowSpan={2}>S.N</th>
                  <th rowSpan={2} className="w-60">
                    Subjects
                  </th>
                  <th rowSpan={2} className="w-20">
                    Credit Hour
                  </th>
                  <th colSpan={2}>Obtained Marks</th>
                  <th rowSpan={2} className="w-20">
                    Final Grade
                  </th>
                  <th rowSpan={2} className="w-20">
                    Grade Point
                  </th>
                  <th rowSpan={2}>Remarks</th>
                </tr>
                <tr className="*:border-2 *:border-black">
                  <th>TH</th>
                  <th>PR</th>
                </tr>
              </thead>

              <tbody>
                {marks.map((mark, index) => (
                  <tr key={index}>
                    <td className="border-l-2 border-black p-2">{index + 1}</td>
                    <td className="border-l-2 border-black p-2 text-left">
                      {mark.subject?.name}
                    </td>
                    <td className="border-l-2 border-black p-2">
                      {mark.subject?.credit_hour}
                    </td>
                    <td className="border-l-2 border-black p-2">
                      {mark.thGradeLetter}
                    </td>
                    <td className="border-l-2 border-black p-2">
                      {mark.prGradeLetter}
                    </td>
                    <td className="border-l-2 border-black p-2">
                      {mark.finalGrade}
                    </td>
                    <td className="border-l-2 border-black p-2">
                      {mark.gradePoint}
                    </td>
                    <td className="border-l-2 border-black p-2"></td>
                  </tr>
                ))}

                <tr>
                  <td className="border-2 border-black"></td>
                  <td
                    colSpan={7}
                    className="border-2 border-black p-3 text-center"
                  >
                    <span>
                      Total Credit Hour: <b>{marksheet.totalCreditHour}</b>
                    </span>
                    <span className="ml-10">
                      Grade Point Average (GPA): <b>{marksheet.gpa}</b>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Footer */}
            <div className="mt-40 text-sm">
              <div className="flex justify-between px-10">
                <p className="w-32 text-center border-t-2 border-black pt-1">
                  Checked By
                </p>
                <p className="w-32 text-center border-t-2 border-black pt-1">
                  Principal
                </p>
              </div>

              <p className="text-center mt-3">
                Date of Issue: <b>2082-05-02</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GradeSheet;
