import { IRegisterData } from "../types/authTypes";
import * as authRepository from "../repositories/authRepository";
import bcrypt from 'bcrypt';

export async function registerUser(registerData: IRegisterData) {
    const { email, password, confirmPassword } = registerData;

    if (password !== confirmPassword) throw {code: "conflict_error", message: "Confirm password should be equal to password" };

    await checkEmailInDatabase(email);

    const encryptedPassword = encryptPassword(password);

    await authRepository.insert({ email, password: encryptedPassword });

    return "User successfully registered!"
}

async function checkEmailInDatabase(email: string) {
    const existingEmail = await authRepository.findByEmail(email);
    if (existingEmail) throw { code: "conflict_error", message: "This email is already registered in the database" };
}

function encryptPassword(password: string) {
    const SALT = 10;
    return bcrypt.hashSync(password, SALT);
}