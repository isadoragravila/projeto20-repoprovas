import supertest from 'supertest';
import app from "../../src/index";

export async function tokenFactory() {
    const login = await supertest(app).post('/sign-in').send({
        email: "test@email.com",
        password: "1234567890"
    });
    
    return login.body.token;
}