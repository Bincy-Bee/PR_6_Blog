const {Router} = require('express');
const { movie } = require('../controller/user.controller');
const mRoute = Router();

mRoute.get("/", movie);

module.exports={mRoute}