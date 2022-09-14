import app from '../src/index';
import supertest from 'supertest';
import { prisma } from '../src/databases/database';

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE users RESTART IDENTITY;`;
});

describe('POST /sign-up', () => {
    it('returns 422 for invalid input', async () => {
        const firstTry = await supertest(app).post('/sign-up').send({});
        expect(firstTry.status).toBe(422);

        const secondTry = await supertest(app).post('/sign-up').send({ 
            email: "test",
            password: "1234567890",
            confirmPassword: "1234567890"
        });
        expect(secondTry.status).toBe(422);

        const thirdTry = await supertest(app).post('/sign-up').send({ 
            email: "test@email.com",
            password: "123456",
            confirmPassword: "1234567890"
        });
        expect(thirdTry.status).toBe(422);

        const forthTry = await supertest(app).post('/sign-up').send({ 
            email: "test@email.com",
            password: "1234567890",
            confirmPassword: "0987654321"
        });
        expect(forthTry.status).toBe(422);
    });

    it('returns 409 for using an existing email in the database', async () => {
        await supertest(app).post('/sign-up').send({
            email: "test@email.com",
            password: "1234567890",
            confirmPassword: "1234567890"
        });

        const result = await supertest(app).post('/sign-up').send({ 
            email: "test@email.com",
            password: "1234567890",
            confirmPassword: "1234567890"
        });
        expect(result.status).toBe(409);
    });

    it('returns 201 for valid input and right insert in the database', async () => {
        const body = {
            email: "test@email.com",
            password: "1234567890",
            confirmPassword: "1234567890"
        }

        const result = await supertest(app).post('/sign-up').send(body);

        const createdUser = await prisma.users.findUnique({ 
            where: { email: body.email }
        });
        
        expect(result.status).toBe(201);
        expect(createdUser).not.toBeNull;
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});