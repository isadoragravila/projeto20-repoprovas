import app from '../src/index';
import supertest from 'supertest';
import { prisma } from '../src/databases/database';
import { tokenFactory } from './factories/tokenFactory';
import { registerFactory } from './factories/registerFactory';

// let token = '';

beforeAll(async () => {
    await prisma.$executeRaw`TRUNCATE users RESTART IDENTITY;`;

    await prisma.$executeRaw`TRUNCATE tests RESTART IDENTITY;`;

    await supertest(app).post('/sign-up').send(registerFactory());

    // const login = await supertest(app).post('/sign-in').send({
    //     email: "test@email.com",
    //     password: "1234567890"
    // });

    // token = login.body.token;
});

describe('POST /exams', () => {
    it('returns 401 for invalid or missing token', async () => {
        const firstTry = await supertest(app).post('/exams').send({});
        expect(firstTry.status).toBe(401);

        const secondTry = await supertest(app).post('/exams').set('Authorization', "Bearer invalidToken").send({});
        expect(secondTry.status).toBe(401);
    });

    it('returns 422 for invalid input', async () => {
        const token = await tokenFactory();

        const firstTry = await supertest(app).post('/exams').set('Authorization', `Bearer ${token}`).send({});
        expect(firstTry.status).toBe(422);

        const secondTry = await supertest(app)
        .post('/exams')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Test name",
            pdfUrl: "https://www.globo.com/",
            categoryId: "Category",
            disciplineId: "Discipline",
            teacherId: "Teacher"
        });
        expect(secondTry.status).toBe(422);
    });

    it('returns 404 for invalid ids (category, teacher, discipline)', async () => {
        const token = await tokenFactory();
        
        const firstTry = await supertest(app)
        .post('/exams')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Test name",
            pdfUrl: "https://www.globo.com/",
            categoryId: 10,
            disciplineId: 3,
            teacherId: 1
        });
        expect(firstTry.status).toBe(404);

        const secondTry = await supertest(app)
        .post('/exams')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Test name",
            pdfUrl: "https://www.globo.com/",
            categoryId: 1,
            disciplineId: 5,
            teacherId: 1
        });
        expect(secondTry.status).toBe(404);
    });

    it('returns 201 for valid token, valid input and right insert in the database', async () => {
        const token = await tokenFactory();
        
        const body = {
            name: "Test name",
            pdfUrl: "https://www.globo.com/",
            categoryId: 1,
            disciplineId: 1,
            teacherId: 1
        }
        const result = await supertest(app)
        .post('/exams')
        .set('Authorization', `Bearer ${token}`)
        .send(body);

        expect(result.status).toBe(201);

        const createdExam = await prisma.tests.findFirst({
            where: { name: body.name }
        });

        expect(createdExam).not.toBeNull;
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});