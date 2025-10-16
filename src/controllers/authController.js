const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {findUserByEmail} = require('../models/userModel')
const {createRefreshToken} = require('../models/refreshTokensModel')

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
        const accessToken = jwt.sign({id: usuario.id}, process.env.JWT_SECRET, {expiresIn: '15m'})

        const {password: _, ...userLogado} = usuario;

        const refreshToken = jwt.sign({id: usuario.id}, process.env.JWT_REFRESH_SECRET, {expiresIn: '7d'})
        
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        
        const salvaRefreshToken = await createRefreshToken(usuario.id, refreshToken, expiresAt)

        return res.status(200).json({usuario: userLogado, accessToken});
        
        
    } catch(error){

        res.status(500).json({mensage: "Erro interno no servidor"});
    }
}

const refresh = async(req, res) =>{

}

const logout = async(req, res) =>{

}

module.exports = {
    login,
    refresh,
    logout
}