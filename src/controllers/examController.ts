import { Request, Response } from 'express';
import * as examService from '../services/examService';
import { IExamSchema } from '../types/examTypes';

export async function insertExam(req: Request, res: Response) {
    const examData: IExamSchema = req.body;

    const result = await examService.insertExam(examData);
    
    res.status(201).send(result);
}