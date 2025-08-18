const {createUser} = require('../models/userModel')

const register = async (req, res) =>{
    try{
        const{name, email, password} = req.body;
        const newUser = await createUser(name, email, password);
        res.status(201).json(newUser);
    }catch (error){
        res.status(500).json({message: "Erro interno no servidor"})
    }
}

module.exports = {
    register
}