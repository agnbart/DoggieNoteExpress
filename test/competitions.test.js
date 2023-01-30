const request = require('supertest');
const app = require('../routes/comp');
//@TODO - przy odwołaniu do competitions pojawia się błąd opart na express.Router
//const app = require('../routes/competitions')

//@TODO - komunikat
//Jest did not exit one second after the test run has completed.
//
// This usually means that there are asynchronous operations that weren't stopped in your tests.

describe("GET /competitions", () => {

    it('GET all competitions', async () => {
        const response = await request(app)
            .get('/')
            .set('Accept', 'application/json')
        expect(response.type).toEqual('application/json')
        expect(response.status).toEqual(200)
    });

    it("GET one existed competition", async () => {
        const response = await request(app).get("/15");
        expect(response.type).toEqual('application/json')
        expect(response.status).toEqual(200)
    });

    it("GET one nonexisted competition", async () => {
        const response = await request(app).get("/7");
        expect(response.status).toEqual(200)
    });
});

describe("POST /competition", () => {
    it ('POST competition with name & place', async () => {
        const response = await request(app)
            .post('/')
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

/*describe('DELETE /competition', () => {
    it('DELETE competition', async () => {
        const response = await request(app)
            .delete('/15');
        expect(response.status).toBe(200);
    });
});*/