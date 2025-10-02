const bcrypt = require('bcrypt')
const {createUser, findUserByEmail} = require('../models/userModel')

const register = async (req, res) =>{
    try{
        const{name, email, password} = req.body;

        const emailJaCadastrado = await findUserByEmail(email);
        if(emailJaCadastrado.rows.length > 0){
            return res.status(400).json({message: "Já existe um usuário com esse email cadastrado"})
        }

        const senhacriptografada = await bcrypt.hash(password, 10)

        const newUser = await createUser(name, email, senhacriptografada);
        return res.status(201).json(newUser);
        
    }catch (error){
        return res.status(500).json({message: "Erro interno no servidor"})
    }
}

module.exports = {
    register
}