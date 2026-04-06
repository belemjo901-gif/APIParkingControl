const { DataTypes } = require("sequelize")

const sequelize = require('../config/database')

const vaga = sequelize.define("vaga",{
    numeroVaga: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vagaLivre: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

module.exports = vaga