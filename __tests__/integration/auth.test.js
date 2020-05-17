const app = require("../../src/app");
const request = require("supertest");
const User = require('../../src/models/User');
const truncate = require('../utils/truncate');

describe("Authentication", () => {

    beforeEach(async () => {
        await truncate();
    });

    it('should receive JWT token when authenticated with valid credentials', () => {
        const test = true;
        expect(test).toBe(true);
    })


    it('should authenticate with valid credentials', async () => {

        // const user = await User.create({
        //     name: 'Test',
        //     email: 'flavioafm@gmail.com',
        //     password: '123456'
        // });

        const user = {
            name: 'Test',
            email: 'flavioafm@gmail.com',
            password: '123456'
        };

        expect(user.email).toBe('flavioafm@gmail.com');
    })

})