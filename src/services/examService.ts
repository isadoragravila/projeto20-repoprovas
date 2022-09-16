import { IExamSchema } from "../types/examTypes";
import * as examRepository from '../repositories/examRepository';

export async function insertExam(examData: IExamSchema) {
    const { teacherId, disciplineId, categoryId, name, pdfUrl } = examData;

    await checkCategoryId(categoryId);
    await checkDisciplineId(disciplineId);
    await checkTeacherId(teacherId);

    const teacherDisciplineId = await findTeacherDisciplineId(teacherId, disciplineId);

    const exam = await examRepository.insert({ name, pdfUrl, categoryId, teacherDisciplineId });

    return exam;
}

async function findTeacherDisciplineId(teacherId:number, disciplineId: number) {
    const teacherDisciplineId = await examRepository.findTeacherDisciplineId(teacherId, disciplineId);

    if (!teacherDisciplineId) throw { code: "conflict_error", message: "Teacher doesn't teach the discipline" };

    return teacherDisciplineId;
}

async function checkCategoryId(categoryId: number) {
    const result = await examRepository.findCategoryById(categoryId);

    if (!result) throw { code: "notfound_error", message: "Category not found" };
}

async function checkDisciplineId(disciplineId: number) {
    const result = await examRepository.findDisciplineById(disciplineId);

    if (!result) throw { code: "notfound_error", message: "Discipline not found" };
}

async function checkTeacherId(teacherId: number) {
    const result = await examRepository.findTeacherById(teacherId);

    if (!result) throw { code: "notfound_error", message: "Teacher not found" };
}

export async function getByDisciplines() {
    //const result = await examRepository.getByDisciplines();

    const categories = await examRepository.getCategories();

    const terms = await examRepository.getTerms();

    const result = terms.map(term => {
        return {
            termId: term.id,
            termName: term.number,
            disciplines: term.disciplines.map(disc => {
                return {
                    disciplineId: disc.id,
                    disciplineName: disc.name,
                    categories: categories.map(cat => {
                        return {
                            categoryId: cat.id,
                            categoryName: cat.name,
                            tests: cat.tests.map(test => {
                                if (test.teachersDiscipline.disciplineId === disc.id) {
                                    return {
                                        testId: test.id,
                                        testName: test.name,
                                        pdfUrl: test.pdfUrl,
                                        teacher: test.teachersDiscipline.teacher.name
                                    }
                                }
                            }).filter(item => item)
                        }
                   })
                }
            })
        }
    })

    return result;
}

export async function getByTeachers() {
    //const result = await examRepository.getByTeachers();

    const categories = await examRepository.getCategories();

    const teachers = await examRepository.getTeachers();

    const result = teachers.map(teacher => {
        return {
            teacherId: teacher.id,
            teacherName: teacher.name,
            categories: categories.map(cat => {
                return {
                    categoryId: cat.id,
                    categoryName: cat.name,
                    tests: cat.tests.map(test => {
                        if (test.teachersDiscipline.teacherId === teacher.id) {
                            return {
                                testId: test.id,
                                testName: test.name,
                                pdfUrl: test.pdfUrl,
                                discipline: test.teachersDiscipline.discipline.name
                            }
                        }
                    }).filter(item => item)
                }
           })
        }
    })

    return result;
}