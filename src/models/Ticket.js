const { DataTypes } = require("sequelize")
const sequelize = require('../config/database')

const ticket = sequelize.define("ticket",{
    horaEntrada: {
        type: DataTypes.DATE,
        allowNull: false
    },
    horaSaida: {
        type: DataTypes.DATE,
        allowNull: true
    },
    valorTotal: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    situacao: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }

    }
)

module.exports = ticket