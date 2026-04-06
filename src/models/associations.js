const Veiculo = require('./Veiculo');
const Ticket = require('./Ticket');
const Vaga = require('./Vaga');

const associations = () => {
  // Aqui entram as relações (HasMany, BelongsTo, etc)
  Veiculo.hasMany(Ticket, { foreignKey: 'veiculoId' });
  Ticket.belongsTo(Veiculo, { foreignKey: 'veiculoId' });
  
  Vaga.hasMany(Ticket, { foreignKey: 'vagaId' });
  Ticket.belongsTo(Vaga, { foreignKey: 'vagaId' });
};

module.exports = associations;