const request = require('supertest');
const express = require('express');
const {competitionsRouter} = require('../routes/competitions')
const app = express();
//@TODO problem with asynchonous operations
app.use(express.json());
app.use('/competitions', competitionsRouter);

describe("GET /competitions", () => {

    it('GET all competitions', async () => {
        const response = await request(app).get('/competitions')
        expect(response.status).toBe(200)
    });

    it("GET one existed competition", async () => {
        const response = await request(app).get("/competitions/20");
        expect(response.type).toEqual('application/json')
        expect(response.status).toEqual(200)
    });

    it("GET one nonexisted competition", async () => {
        const response = await request(app).get("/competitions/7");
        expect(response.status).toEqual(200)
    });
});

describe("POST /competition", () => {
    it ('POST competition with name & place', async () => {
        const response = await request(app)
            .post('/competitions/')
            .send({
                name: "Nazwa testowa",
                place: "Miejsce testowe"
            });
        expect(response.type).toEqual('application/json')
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
            Name: "Nazwa testowa",
            Place: "Miejsce testowe"
        });
    });
});

describe('DELETE /competition', () => {
    it('DELETE competition', async () => {
        const response = await request(app)
            .delete('/competitions/15');
        expect(response.status).toBe(200);
    });
});