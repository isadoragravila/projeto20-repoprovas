import  { Users } from '@prisma/client';

export type ILoginData = Omit<Users, 'id'>;

export type IRegisterData = { 
    email: string,
    password: string,
    confirmPassword: string
}
