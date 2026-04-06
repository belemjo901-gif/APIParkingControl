require('dotenv').config();
const express = require('express');
const sequelize = require('./src/config/database');

// Importação de Modelos e Rotas
const Vaga = require('./src/models/Vaga'); // Importante para o código de teste
const ParkingRoutes = require('./src/routes/parkingRoutes');
const Association = require('./src/models/associations');

const app = express();
app.use(express.json());

// Ativa os relacionamentos entre as tabelas
Association(); 

// Define as rotas do sistema
app.use('/parking', ParkingRoutes);

const PORT = process.env.PORT || 3001;

// ÚNICO BLOCO DE INICIALIZAÇÃO
sequelize.sync({ alter: true }).then(async () => {
    console.log("✅ Banco de dados sincronizado!");

    // CÓDIGO DE TESTE: Garante que existam vagas para o check-in funcionar
    const qtdVagas = await Vaga.count();
   if (qtdVagas === 0) {
    await Vaga.bulkCreate([
        { numeroVaga: 1, vagaLivre: true },
        { numeroVaga: 2, vagaLivre: true },
        { numeroVaga: 3, vagaLivre: true },
        { numeroVaga: 4, vagaLivre: true },
        { numeroVaga: 5, vagaLivre: true }
    ]);
    console.log("🚗 5 Vagas iniciais criadas com sucesso!");
}
    
    // LIGA O SERVIDOR APENAS UMA VEZ
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
    });

}).catch(error => {
    console.error("❌ Erro ao conectar no banco:", error);
});


