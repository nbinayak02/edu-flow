-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_sclassId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "ExamDetails" DROP CONSTRAINT "ExamDetails_examId_fkey";

-- DropForeignKey
ALTER TABLE "ExamDetails" DROP CONSTRAINT "ExamDetails_sclassId_fkey";

-- DropForeignKey
ALTER TABLE "ExamDetails" DROP CONSTRAINT "ExamDetails_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Marks" DROP CONSTRAINT "Marks_marksheetId_fkey";

-- DropForeignKey
ALTER TABLE "Marks" DROP CONSTRAINT "Marks_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Marksheet" DROP CONSTRAINT "Marksheet_enrollmentId_fkey";

-- DropForeignKey
ALTER TABLE "Marksheet" DROP CONSTRAINT "Marksheet_examId_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "SubjectAssigned" DROP CONSTRAINT "SubjectAssigned_sclassId_fkey";

-- DropForeignKey
ALTER TABLE "SubjectAssigned" DROP CONSTRAINT "SubjectAssigned_subjectId_fkey";

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectAssigned" ADD CONSTRAINT "SubjectAssigned_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectAssigned" ADD CONSTRAINT "SubjectAssigned_sclassId_fkey" FOREIGN KEY ("sclassId") REFERENCES "Sclass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_sclassId_fkey" FOREIGN KEY ("sclassId") REFERENCES "Sclass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamDetails" ADD CONSTRAINT "ExamDetails_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamDetails" ADD CONSTRAINT "ExamDetails_sclassId_fkey" FOREIGN KEY ("sclassId") REFERENCES "Sclass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamDetails" ADD CONSTRAINT "ExamDetails_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marksheet" ADD CONSTRAINT "Marksheet_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marksheet" ADD CONSTRAINT "Marksheet_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marks" ADD CONSTRAINT "Marks_marksheetId_fkey" FOREIGN KEY ("marksheetId") REFERENCES "Marksheet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marks" ADD CONSTRAINT "Marks_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
