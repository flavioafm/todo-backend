const openRoutes = require('express').Router();
const registerRoute = require('./controller/AuthController');
openRoutes.use('/auth', registerRoute);


const protectedRoutes = require('express').Router();
const authMiddleware = require('./middlewares/auth');
const projectRoutes = require('./controller/ProjectController');
protectedRoutes.use(authMiddleware);
protectedRoutes.use('/api', projectRoutes);

module.exports = { openRoutes, protectedRoutes };