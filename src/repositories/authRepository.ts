import { prisma } from '../databases/database';
import { ILoginData } from '../types/authTypes';

export async function findByEmail(email: string) {
    const user = await prisma.users.findUnique({
        where: { email }
    });
    return user;
}

export async function insert(userData: ILoginData) {
    await prisma.users.create({
        data: userData
    });
}

export async function findById(id: number) {
    const user = await prisma.users.findUnique({
        where: { id }
    });
    return user;
}