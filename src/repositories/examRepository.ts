import { prisma } from '../databases/database';
import { IExamData } from '../types/examTypes';

export async function findTeacherDisciplineId(teacherId: number, disciplineId: number) {
    const result = await prisma.teachersDisciplines.findFirst({
        where: { teacherId, disciplineId }
    });

    return result?.id;
}

export async function insert(exam: IExamData) {
    await prisma.tests.create({
        data: exam
    });
}