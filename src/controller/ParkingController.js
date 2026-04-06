
const ParkingService = require('../services/ParkingService')

async function entrada(req,res) {
    try{
        const {Placa, Modelo, Cor} = req.body 
           const resultado = await ParkingService.checkIn(Placa, Modelo, Cor)
                return res.status(201).json(resultado)
    }catch(error){
      return res.status(400).json({erro: error.message})
    }
}
async function saida(req,res) {
    try{
        const {Placa} = req.body
          const resultado =  await ParkingService.Checkout(Placa)
                return res.status(200).json(resultado)
    }catch(error){
        return res.status(400).json({erro: error.message})
    }
}
async function listarVagas(req,res) {
    try{
        const vagas = await ParkingService.listarVagas()
        return res.status(200).json(vagas)
    }catch(error){
        return res.status(400).json({erro: error.message})
    }
    
}

async function obterHistorico(req, res) {
    try {
        // Em um GET, a placa costuma vir na URL: /historico?Placa=ABC1234
        const { Placa } = req.query; 
        
        if (!Placa) {
            return res.status(400).json({ erro: "Placa é obrigatória" });
        }

        const historico = await ParkingService.obterHistorico(Placa); // <-- Agora passa a Placa
        return res.status(200).json(historico);
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}


module.exports = {entrada, saida, listarVagas, obterHistorico }