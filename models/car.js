const mongoose = require('mongoose')

// Criando o modelo do objeto carro
const carSchema = new mongoose.Schema({
    modelo: {
        type: String,
        required: [true, 'O modelo é obrigatório'],
        minlength: [3, 'O modelo deve ter pelo menos 3 letras']
    },
    ano: {
        type: Number,
        required: [true, 'O ano é obrigatório'],
        min: [1000, 'Ano inválido']
    },
    marca: {
        type: String,
        required: [true, 'A marca é obrigatória'],
        minlength: [3, 'A marca precisa ter pelo menos 3 letras']
    },
    createdAt: { type: Date, default: Date.now } // Data da criação
})

const Car = mongoose.model('Car', carSchema)
module.exports = Car