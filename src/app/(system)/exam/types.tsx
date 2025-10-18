export type Exam = {
    id?: number;
    name: string;
    year: number;
    schoolId: number;
}

export type Error = {
    name?: string;
    year?: string;
}
export type FormState = {
    errors: Error;
}