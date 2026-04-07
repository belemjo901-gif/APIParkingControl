const {DataTypes} = require("sequelize")

const sequelize = require('../config/database')
const bcrypt = require('bcrypt');

const usuario = sequelize.define("user", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false

    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {isEmail:true}
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hooks: {
        beforeCreate: async (usuario) =>{
            if(usuario.senha){
                const salt = await bcrypt.genSalt(10)
                usuario.senha = await bcrypt.hash(usuario.senha, salt)
            }
        }
    },
    placaPrincipal: {
        type: DataTypes.STRING,
        allowNull: true, // Admin pode não ter placa vinculada
        unique: true
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user'
    }
});

