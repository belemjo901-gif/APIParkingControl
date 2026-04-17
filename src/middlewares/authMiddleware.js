require('dotenv').config()
const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) {
        return res.status(401).json({erro: "Token não fornecido"})
    }
    try{
        const decoded= jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()// Autoriza a passagem para o próximo passo (Controller)
    }catch(error){
        return res.status(403).json({erro: "Token inválido"})
    }
}

module.exports = auth