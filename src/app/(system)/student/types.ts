export type Student = {
    id?: number;
    name: string;
    address: string;
    contact: string;
    gurdian: string;
    year: number;
    iemis: string;
    sclassId?: number;
    sclass?: {name: string};
}

export type Error = {
    name?: string;
    address?: string;
    contact?: string;
    gurdian?: string;
    year?: string;
    iemis?: string;
    sclass?: string;
}

export type FormState = {
    errors: Error;
}