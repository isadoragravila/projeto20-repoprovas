import { Tests } from "@prisma/client";

export type IExamData = Omit<Tests, 'id'>;

export interface IExamSchema {
    name: string;
    pdfUrl: string;
    category: string;
    discipline: string;
    teacher: string;
}