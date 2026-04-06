const { DataTypes } = require("sequelize")

const sequelize = require('../config/database')

const veiculo = sequelize.define("veiculo", {
    Placa:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Modelo: {
        type: DataTypes.STRING,
        allowNull:false
    },
    Cor:{
        type: DataTypes.STRING,
        allowNull:false
    }

})

module.exports = veiculo