let app = require('../server');

let testServer = require('superTest');

describe ('Test the user router, root path GET', () => {
    const response = await testServer(app).get('/api/games');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe([]);
})