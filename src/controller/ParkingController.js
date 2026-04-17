
const ParkingService = require('../services/ParkingService')

const AuthService= require('../services/AuthService')

async function register(req,res) {
    const {nome, email, senha, placaPrincipal} = req.body
    try{
        const novoUsuario = await AuthService.register(nome, email, senha, placaPrincipal)
        return res.status(201).json(novoUsuario)
    }catch(error){
        return res.status(400).json({erro: error.message})
    }
}

async function login(req,res) {
    const {email, senha} = req.body
    try{
        const resultado = await AuthService.login(email,senha)
        return res.status(200).json(resultado)
    }catch(error){
        return res.status(400).json({erro: error.message})
    }
    
}

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
        // 1. Verifique EXATAMENTE como você nomeou no token (provavelmente placaPrincipal)
        const { role, placaPrincipal } = req.user; 
        const placaPedida = req.query.Placa;

        if (!placaPedida) {
            return res.status(400).json({ erro: "A placa é obrigatória na consulta." });
        }

        
        const placaUsuario = placaPrincipal ? placaPrincipal.toUpperCase() : "";
        const placaBusca = placaPedida.toUpperCase();

        // 3. Lógica de bloqueio
        if (role === "user" && placaUsuario !== placaBusca) {
            return res.status(403).json({ erro: "Você só pode consultar a sua própria placa." });
        }

        const historico = await ParkingService.obterHistorico(placaBusca);
        return res.status(200).json(historico);

    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}


module.exports = {entrada, saida, listarVagas, obterHistorico, register, login }