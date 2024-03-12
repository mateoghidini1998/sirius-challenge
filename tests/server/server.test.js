const request = require('supertest');
const app = require('../../server');

describe('API tests', () => {
    it('responds to the root route', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('API RUNNING');
    });

    it('returns 404 for non-existent routes', async () => {
        const response = await request(app).get('/non-existent-route');
        expect(response.statusCode).toBe(404);
    });
});
