import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController";
import validateSchema from "../middlewares/schemaValidator";
import registerSchema from "../schemas/registerSchema";
import loginSchema from "../schemas/loginSchema";

const router = Router();

router.post('/sign-up', validateSchema(registerSchema), registerUser);
router.post('/sign-in', validateSchema(loginSchema), loginUser);

export default router;