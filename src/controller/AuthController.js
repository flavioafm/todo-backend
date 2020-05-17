const routes = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const authConfig = require('../../auth.json')
const User = require("../models/User");


function generateToken( params = {}){
    return jwt.sign( params, process.env.JWT_SECRET, {
        expiresIn: 86400
    });
}

routes.post('/register', async (req, res) => {
    const {email} = req.body;
    try {
        if (await User.findOne({email}))
            return res.status(400).send({ error: 'User already exists.'})
        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({
            user, 
            token: generateToken({id: user.id})
        })
    } catch (error) {
        console.log('error: ', error)
        return res.status(409).send({ error: 'Registration failed.'})
    }
    
});

routes.post('/authenticate', async (req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({email}).select('+password'); 

    if (!user)
        return res.status(400).send({error: 'User not found'});

    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({error: 'Invalid password'});

    user.password = undefined;

    res.send({
        user, 
        token: generateToken({id: user.id})
    });

});


module.exports = routes;