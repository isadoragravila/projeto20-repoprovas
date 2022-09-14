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