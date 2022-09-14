import { Router } from "express";
import { insertExam } from "../controllers/examController";
import validateSchema from "../middlewares/schemaValidator";
import examSchema from "../schemas/examSchema";
import validateToken from "../middlewares/tokenValidator";


const router = Router();

router.use(validateToken);
router.post('/exam', validateSchema(examSchema), insertExam);

export default router;