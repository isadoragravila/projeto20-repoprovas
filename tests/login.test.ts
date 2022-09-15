import app from '../src/index';
import supertest from 'supertest';
import { prisma } from '../src/databases/database';
import { registerFactory } from './factories/registerFactory';

beforeAll(async () => {
    await prisma.$executeRaw`TRUNCATE users RESTART IDENTITY;`;

    await supertest(app).post('/sign-up').send(registerFactory());
});

describe('POST /sign-in', () => {
    it('returns 422 for invalid input', async () => {
        const firstTry = await supertest(app).post('/sign-in').send({});
        expect(firstTry.status).toBe(422);

        const secondTry = await supertest(app).post('/sign-in').send({ 
            email: "test",
            password: "1234567890"
        });
        expect(secondTry.status).toBe(422);

        const thirdTry = await supertest(app).post('/sign-in').send({ 
            email: "test@email.com",
            password: "123456"
        });
        expect(thirdTry.status).toBe(422);
    });

    it('returns 401 for wrong credentials', async () => {
        const firstTry = await supertest(app).post('/sign-in').send({ 
            email: "wrongemail@email.com",
            password: "1234567890"
        });
        expect(firstTry.status).toBe(401);

        const secondTry = await supertest(app).post('/sign-in').send({ 
            email: "test@email.com",
            password: "wrongpassword"
        });
        expect(secondTry.status).toBe(401);
    });

    it('returns 200 for valid input and right credentials', async () => {
        const result = await supertest(app).post('/sign-in').send({ 
            email: "test@email.com",
            password: "1234567890"
        });
        
        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty('token');
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});