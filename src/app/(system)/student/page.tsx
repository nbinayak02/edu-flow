import { getSchoolId } from "@/lib/auth"

export default async function Student() {
   const schoolId = await getSchoolId();

    return <h1>Student of school {schoolId}</h1>
}