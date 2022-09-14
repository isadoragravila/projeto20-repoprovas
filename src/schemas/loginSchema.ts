import joi from 'joi';
import { ILoginData } from '../types/authTypes';

const authSchema = joi.object<ILoginData>({
    email: joi.string().email().required(),
    password: joi.string().min(10).required(),
  });

  export default authSchema;