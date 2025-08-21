const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {findUserByEmail} = require('../models/userModel')

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await findUserByEmail(email);
    
        if(!user || user.rows.length === 0){
            return res.status(401).json({message: "Email ou senha invalida"});
        }

        const usuario = user.rows[0];

        const senhaValida = await bcrypt.compare(password, usuario.password)

        if(!senhaValida){
            return res.status(401).json({message: "Email ou senha invalida"});
        }
        
        const token = jwt.sign({id: usuario.id}, process.env.JWT_SECRET, {expiresIn: '8h'})

        const {password: _, ...userLogado} = usuario;

        return res.status(200).json({usuario: userLogado, token});
        
        
    } catch(error){

        res.status(500).json({mensage: "Erro interno no servidor"});
    }
}


module.exports = {
    login
}