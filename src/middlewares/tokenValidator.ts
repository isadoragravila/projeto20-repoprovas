import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import * as authService from '../services/authService';

interface IJwtPayload {
    id: number
}

async function validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const SECRET = process.env.JWT_SECRET || "";

    if (!token) throw { code: "unauthorized_error", message: "Missing token" };

    try {
        const { id } = jwt.verify(token, SECRET) as IJwtPayload;

        const user = await authService.findUserById(id);

        res.locals.user = user;

        next();

    } catch (error) {
        throw { code: "unauthorized_error", message: "Invalid token" };
    }
}

export default validateToken;