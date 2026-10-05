const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/carros')
        console.log('MongoDB conectado!')
        // Captura o erro, mostra no console e encerra a conexão
    } catch (e) {
        console.error('Erro ao conectar ao MongoDB: ', e)
        process.exit(1);
    }
}

module.exports = connectDB

// npm install express mongoose
// npm install -D nodemon