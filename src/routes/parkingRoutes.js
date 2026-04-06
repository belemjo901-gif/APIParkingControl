    const express = require('express')
    const router = express.Router()
    const ParkingController = require('../controller/ParkingController')

    router.post('/entrada', ParkingController.entrada)

    router.post('/saida', ParkingController.saida)

    router.get('/vagas', ParkingController.listarVagas)

    router.get('/historico', ParkingController.obterHistorico)

    module.exports = router