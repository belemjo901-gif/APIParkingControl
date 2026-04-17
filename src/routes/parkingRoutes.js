    const express = require('express')
    const router = express.Router()
    const auth=require('../middlewares/authMiddleware')
    const ParkingController = require('../controller/ParkingController')

    router.post('/entrada', ParkingController.entrada)

    router.post('/saida', ParkingController.saida)

    router.get('/vagas', ParkingController.listarVagas)

    router.get('/historico',  auth, ParkingController.obterHistorico)

    router.post('/register', ParkingController.register)

    router.post('/login', ParkingController.login)

    module.exports = router