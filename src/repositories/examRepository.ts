import { prisma } from '../databases/database';
import { IExamData } from '../types/examTypes';

export async function findTeacherDisciplineId(teacherId: number, disciplineId: number) {
    const result = await prisma.teachersDisciplines.findFirst({
        where: { teacherId, disciplineId }
    });

    return result?.id;
}

export async function findCategoryById(id: number) {
    const result = await prisma.categories.findFirst({
        where: { id }
    });
    return result;
}

export async function insert(exam: IExamData) {
    await prisma.tests.create({
        data: exam
    });
}

export async function getByDisciplines() {
    const result = await prisma.terms.findMany(
        {
            select: {
                id: true,
                number: true,
                disciplines: {
                    select: {
                        id: true,
                        name: true,
                        teachersDisciplines: {
                            select: {
                                teacher: {
                                    select: {
                                        name: true
                                    }
                                },
                                tests: {
                                    select: {
                                        id: true,
                                        name: true,
                                        pdfUrl: true,
                                        category: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    );

    return result;
}

export async function getByTeachers() {
    const result = await prisma.teachers.findMany({
        select: {
            id: true,
            name: true,
            teachersDisciplines: {
                select: {
                    discipline: {
                        select: {
                            name: true
                        }
                    },
                    tests: {
                        select: {
                            id: true,
                            name: true,
                            pdfUrl: true,
                            category: true
                        }
                    }
                }
            }
        }
    });

    return result;
}