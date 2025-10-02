const express = require('express');
const {login} = require("../controllers/authController")

const rotasAuth = express.Router();

rotasAuth.post("/login", login);

module.exports = rotasAuth;