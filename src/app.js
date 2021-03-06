require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});
require('./config/database');

const express = require("express");
const morgan = require('morgan')
const cors = require('cors');

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(morgan('dev'));

  }

  routes() {
    const {openRoutes, protectedRoutes} = require("./routes");
    this.express.use(openRoutes);
    this.express.use(protectedRoutes);
  }
}

module.exports = new AppController().express;