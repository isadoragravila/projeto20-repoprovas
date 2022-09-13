import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export default function validateSchema(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {abortEarly: false});
        if (error) {
            throw {code: 'schema_error', message: error.details.map((detail: { message: any }) => detail.message)}
        }

        next();
    }
}