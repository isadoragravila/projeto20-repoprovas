import { Tests } from "@prisma/client";

export type IExamData = Omit<Tests, 'id'>;

export interface IExamSchema {
    name: string;
    pdfUrl: string;
    categoryId: number;
    disciplineId: number;
    teacherId: number;
}