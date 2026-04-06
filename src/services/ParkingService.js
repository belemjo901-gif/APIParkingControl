// src/services/ParkingService.js
const Veiculo = require('../models/Veiculo');
const Ticket = require('../models/Ticket');
const Vaga = require('../models/Vaga');
const { where } = require('sequelize');

class ParkingService{
    
    async  checkIn(Placa, Modelo, Cor) {
        const veiculoExiste = await Veiculo.findOne({ where: {Placa:Placa}})
            if(veiculoExiste){
                const TickteAtivo = await Ticket.findOne({
                    where: {
                        veiculoId: veiculoExiste.id,
                        situacao: true
                    }
                })
                if(TickteAtivo){
                    throw new Error("Este veículo já possui um ticket ativo.");
                }
            }
         const vagaDisponivel = await Vaga.findOne({
                where: {vagaLivre:true}
            })
            if(!vagaDisponivel){
                throw new Error("Estacionamento lotado!");
            }
        const [veiculo] = await Veiculo.findOrCreate({
                where: {Placa:Placa},
                defaults: {Modelo:Modelo , Cor:Cor}
        })
       
         const NovoTicket = await Ticket.create({
                horaEntrada: new Date(),
                veiculoId : veiculo.id,
                vagaId : vagaDisponivel.id,
                situacao : true
            })

        await vagaDisponivel.update({vagaLivre:false})

        return NovoTicket;  
    
}
    async Checkout(Placa){
        const veiculo = await Veiculo.findOne({ where: {Placa:Placa}})
         if (!veiculo) {
             throw new Error("Veículo não encontrado");
         }
        const ticket = await Ticket.findOne({
            where: {
                veiculoId: veiculo.id,
                situacao: true
            }
         })
        if(!ticket){
            throw new Error("Nenhum carro com esta placa encontrado")
        }
        const agora = new Date()
        const entrada = new Date(ticket.horaEntrada);
        const tempogasto = agora - entrada
        const horasPagas = Math.ceil(tempogasto / (1000 * 60 * 60)) || 1;
        const valorTotal= horasPagas*10
            await ticket.update({
                horaSaida: new Date(),
                valorTotal: valorTotal,
                situacao: false
            })

            await ticket.reload();

        const vaga = await Vaga.findByPk(ticket.vagaId)
            if(vaga){
                await vaga.update({vagaLivre:true})
            }
        return {ticket, mensagem: "Check-out realizado com sucesso"}
    }
    async listarVagas(){
        const vagasLivres = await Vaga.findAll({
            order: [['numeroVaga', 'ASC']]
        })
        return vagasLivres
    }
    async obterHistorico(Placa){
        const veiculo = await Veiculo.findOne({where: {Placa:Placa}})
            if(!veiculo) {
                throw new Error("Veiculo não cadastrado")
            }
        const historico = await Ticket.findAll({
            where: {veiculoId: veiculo.id},
            order:[['horaEntrada', 'DESC']]
        })
        return {veiculo, historico}
    }
}

module.exports = new ParkingService()
