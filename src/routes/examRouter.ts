import { Router } from "express";
import { getByDisciplines, getByTeachers, insertExam } from "../controllers/examController";
import validateSchema from "../middlewares/schemaValidator";
import examSchema from "../schemas/examSchema";
import validateToken from "../middlewares/tokenValidator";


const router = Router();

router.use(validateToken);
router.post('/exams', validateSchema(examSchema), insertExam);
router.get('/exams/disciplines', getByDisciplines);
router.get('/exams/teachers', getByTeachers);

export default router;