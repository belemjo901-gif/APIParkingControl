require('dotenv').config
const User = require('../models/User')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const { where } = require('sequelize')


class AuthService {
    async register(nome, email, senha, placaPrincipal, role= 'user'){
        const usuarioExiste= await User.findOne({where:{email}})
            if(usuarioExiste) throw new Error ("Email já vinculado a uma conta")
        const novoUsuario = await User.create({
            nome,
            email,
            senha,
            placaPrincipal,
            role
        })
            return novoUsuario
    }
    async login(email,senhaDigitada){
        const user = await User.findOne({where: {email}})
            if(!user){
                throw new Error("E-mail ou senha inválidos")
            }
        const senhaBate = await bcrypt.compare(senhaDigitada, user.senha)
            if(!senhaBate){
                throw new Error("E-mail ou senha inválidos")
            }
        const token = jwt.sign(
            {id: user.id,
             role: user.role,
             placaPrincipal: user.placaPrincipal},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        )
    return{
        user: {nome: user.nome, email: user.email, role: user.role, placaPrincipal: user.placaPrincipal},
        token
    }
    }
}

module.exports= new AuthService()
