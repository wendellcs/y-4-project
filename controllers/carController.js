const Car = require('../models/car')

const createCar = async (req, res) => {
    try {
        // Pegando as informações do corpo da requisição
        const { modelo, ano, marca } = req.body
        // Criando o modelo Car.
        const newCar = new Car({ modelo, ano, marca })
        // Salva o carro no banco de dados
        await newCar.save()
        // Retorna 201 ( sucesso ) e o objeto criado.
        res.status(201).json(newCar)
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar o carro' })
    }
}

module.exports = { createCar }