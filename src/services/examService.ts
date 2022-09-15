import { IExamSchema } from "../types/examTypes";
import * as examRepository from '../repositories/examRepository';

export async function insertExam(examData: IExamSchema) {
    const { teacherId, disciplineId, categoryId, name, pdfUrl } = examData;

    await checkCategoryId(categoryId);

    const teacherDisciplineId = await findTeacherDisciplineId(teacherId, disciplineId);

    await examRepository.insert({ name, pdfUrl, categoryId, teacherDisciplineId });

    return "Exam successfully registered!"
}

async function findTeacherDisciplineId(teacherId:number, disciplineId: number) {
    const teacherDisciplineId = await examRepository.findTeacherDisciplineId(teacherId, disciplineId);

    if (!teacherDisciplineId) throw { code: "notfound_error", message: "Teacher or discipline not found, or teacher doesn't teach the discipline" };

    return teacherDisciplineId;
}

async function checkCategoryId(categoryId: number) {
    const result = await examRepository.findCategoryById(categoryId);

    if (!result) throw { code: "notfound_error", message: "Category not found" };
}

export async function getByDisciplines() {
    //const result = await examRepository.getByDisciplines();

    const categories = await examRepository.getCategories();

    const terms = await examRepository.getTerms();

    const result = terms.map(term => {
        return {
            id: term.id,
            number: term.number,
            disciplines: term.disciplines.map(disc => {
                return {
                    id: disc.id,
                    name: disc.name,
                    categories: categories.map(cat => {
                        return {
                            id: cat.id,
                            name: cat.name,
                            tests: cat.tests.map(test => {
                                if (test.teachersDiscipline.disciplineId === disc.id) {
                                    return {
                                        id: test.id,
                                        name: test.name,
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
    const result = await examRepository.getByTeachers();

    return result;
}