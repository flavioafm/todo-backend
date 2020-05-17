const app = require("../../src/app");
const User = require('../../src/models/User');
const bcrypt = require('bcryptjs');
const truncate = require('../utils/truncate');

describe("User", () => {

    beforeEach(async () => {
        await truncate();
    });

    it('should encrypt user password', async () => {

        const user = await User.create({
            name: 'Flavio',
            email: 'flavioafm@gmail.com',
            password: '123456'
        })
        const compareHash = await bcrypt.compare('123456', user.password)
        expect(compareHash).toBe(true);
    })

    

});