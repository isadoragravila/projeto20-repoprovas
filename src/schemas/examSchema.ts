import joi from 'joi';
import { IExamSchema } from '../types/examTypes';

const examSchema = joi.object<IExamSchema>({
    name: joi.string().required(),
    pdfUrl: joi.string().uri().required(),
    category: joi.string().required(),
    discipline: joi.string().required(),
    teacher: joi.string().required()
})

export default examSchema;