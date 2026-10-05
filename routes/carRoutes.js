const validateModelo = require('../middlewares/validateModelo')
const carController = require('../controllers/carController')

app.post('/cars', validateModelo, carController.createCar)