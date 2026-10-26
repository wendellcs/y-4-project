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

// $regex , $options: "i" -> Permite que a busca seja feita de forma parcial e sem 
// diferenciar letras maiúsculas e minúsculas.

const listCar = async (req, res) => {
    try {
        let query = {}
        // Verificase existe um modelo sendo passado na query
        if (req.query.modelos) {
            query.modelos = { $regex: req.query.modelos, $options: "i" };
        }

        if (req.query.ano) {
            query.ano = req.query.ano
        }

        let sort = {}

        if (req.query.sortBy) {
            const sortField = req.query.sortBy
            const sortOrder = req.query.order === 'desc' ? -1 : 1
            sort[sortField] = sortOrder
        }

        const pageNumber = parseInt(req.query.pageNumber) || 1
        const pageSize = parseInt(req.query.pageSize) || 5
        const skip = (pageNumber - 1) * pageSize

        const cars = await Car.find(query).sort(sort).skip(skip).limit(pageSize)
        res.json(cars)
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar carros" })
    }
}

module.exports = { createCar, listCar }

// git clone https://github.com/wendellcs/y-4-project.git

// npm install express nodemon swagger-ui-express