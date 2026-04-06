# 🚗 APIParkingControl - Sistema de Gestão de Estacionamento

API REST desenvolvida para gerenciar o fluxo de entrada, saída e ocupação de vagas de um estacionamento em tempo real.

O projeto foi construído com foco em **boas práticas de backend**, **regras de negócio sólidas** e **estrutura escalável**.

---

## 🚀 Tecnologias Utilizadas

* **Runtime:** Node.js
* **Framework:** Express
* **ORM:** Sequelize
* **Banco de Dados:** SQLite *(ou MySQL/PostgreSQL conforme configuração)*
* **Ferramentas:**

  * Dotenv (variáveis de ambiente)
  * Nodemon (ambiente de desenvolvimento)

---

## 🛠️ Funcionalidades

### 🚘 Check-in Inteligente

* Registra a entrada do veículo
* Associa automaticamente a uma vaga livre
* Impede entradas duplicadas de veículos já estacionados

### 💰 Check-out com Cálculo Automático

* Calcula o valor com base no tempo de permanência
* Arredondamento por hora cheia (`Math.ceil`)

### 🅿️ Gestão de Vagas

* Monitoramento em tempo real
* Identificação de vagas ocupadas e disponíveis

### 📊 Histórico Completo

* Consulta de tickets ativos e finalizados
* Busca por placa do veículo

---

## 📋 Endpoints da API

### Veículos e Tickets

| Método | Rota                              | Descrição                           |
| ------ | --------------------------------- | ----------------------------------- |
| POST   | `/parking/entrada`                | Realiza o check-in de um veículo    |
| POST   | `/parking/saida`                  | Realiza o check-out e libera a vaga |
| GET    | `/parking/historico?placa=XYZ123` | Retorna o histórico do veículo      |
| GET    | `/parking/vagas`                  | Lista o status das vagas            |

---

## ⚙️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/SEU_USUARIO/APIParkingControl.git
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DB_NAME=
DB_USER=
DB_PASS=
DB_HOST=
DB_DIALECT=
PORT=3001
```

---

### 4. Execute as migrations (se necessário)

```bash
npx sequelize-cli db:migrate
```

---

### 5. Inicie o servidor

```bash
npm start
```

---

## 🧠 Regras de Negócio

* **Fail-Fast:**
  Validações são feitas antes de qualquer operação no banco (placa ativa, vagas disponíveis)

* **Persistência de Dados:**
  Veículos são cadastrados uma única vez (`findOrCreate`)

* **Cálculo de Cobrança:**
  Frações de hora são arredondadas para cima (`Math.ceil`)

---

## 📌 Melhorias Futuras

* 🔐 Autenticação com JWT
* 📄 Documentação com Swagger
* 🧪 Testes automatizados (Jest)
* 📦 Validação de dados (Joi/Zod)

---

## 👨‍💻 Autor

**João Victor dos Santos Belém**

🎓 Estudante de Análise e Desenvolvimento de Sistemas
⚙️ Desenvolvedor focado em Backend (Node.js / SQL)
🎯 Em transição de carreira para Desenvolvimento de Software

---
