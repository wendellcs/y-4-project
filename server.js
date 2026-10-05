const express = require('express')
const connectDB = require('./config/config')

// Importando o swagger para construir a nossa documentação
const swaggerUi = require('swagger-ui-express'); // <---------------------
const swaggerDocument = require('./docs/swagger.json'); // <---------------------

// Importando o modelo
const Car = require('./models/car')

// Importando a rota Car
const carRoute = require('./routes/carRoutes')

const app = express()
connectDB()
app.use(express.json())

// Utilizando a rota importada
app.use('/api', carRoute)
// Incluindo a rota do swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // <---------------------

// Importando o middleware ValidateModelo
const validateModelo = require('./middlewares/validateModelo')

app.get('/api/cars', async (_req, res) => {
    try {
        const cars = await Car.find()
        res.json(cars)
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar carros.' })
    }
})

// Rota UPDATE
app.patch('/api/cars/:id', async (req, res) => {
    try {
        // Pegando o ID da url
        const { id } = req.params
        // Pegando as novas atualizações
        const updates = req.body
        // new: Garante que o documento será retornado após as atualizações
        // runValidators: Garante que os dados enviados respeitem o model criado
        const options = { new: true, runValidators: true }

        // Atualiza no banco de dados através do método
        const updatedCar = await Car.findByIdAndUpdate(id, updates, options)

        if (!updatedCar) {
            return res.status(404).json({ error: 'Carro não encontrado' })
        }

        res.json(updatedCar)
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar o carro." })
    }
})

// Método DELETE
app.delete('/api/cars/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedCar = await Car.findByIdAndDelete(id)

        if (!deletedCar) {
            return res.status(404).json({ error: 'Carro deletado' })
        }

        res.json({ message: 'Carro excluído com sucesso' })
    } catch (err) {
        next(err)
    }
})

// Middleware de erro, chamado sempre que houver algum problema na rota.
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Ocorreu um erro no servidor.' })
})

app.listen(3000, () => { console.log('Server running on port 3000') })

// try{} catch (){}

// db - database
// // collection - coleção onde os
// // dados vão ser adicionados

// // Adiciona um arquivo na collection
// db.collection.find()
// // Adiciona vários arquivos na collection
// db.collection.findOne()

// // Atualiza um arquivo da collection
// db.collection.updateOne()
// // Atualiza vários arquivos da collection
// db.collection.updateMany()

// // Deleta um arquivo da collection
// db.collection.deleteOne()
// // Deleta vários arquivos da collection
// db.collection.deleteMany()

// // Insere um
// db.collection.insertOne(
//   {
//     "key": 3,
//     "title": "A lamina mais cortante",
//     "ano": 2019
// })
// // Insere vários
// db.collection.insertMany()


// CRUD
// create -> POST
// read -> GET
// update -> PUT / PATCH
// delete -> DELETE