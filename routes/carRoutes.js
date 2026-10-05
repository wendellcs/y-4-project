const express = require('express')
const router = express.Router()

const validateModelo = require('../middlewares/validateModelo')
const carController = require('../controllers/carController')


router.post('/cars', validateModelo, carController.createCar)

module.exports = router