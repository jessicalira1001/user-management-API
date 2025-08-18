const express = require("express")
const {register} = require('../controllers/userController')

const rotasUser = express.Router();

rotasUser.post("/user", register)

module.exports = rotasUser;
