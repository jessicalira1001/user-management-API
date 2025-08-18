const bcrypt = require('bcrypt')
const {createUser} = require('../models/userModel')

const register = async (req, res) =>{
    try{
        const{name, email, password} = req.body;
        const senhacriptografada = await bcrypt.hash(password, 10)
        const newUser = await createUser(name, email, senhacriptografada);
        res.status(201).json(newUser);
    }catch (error){
        res.status(500).json({message: "Erro interno no servidor"})
    }
}

module.exports = {
    register
}