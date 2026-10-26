const express = require("express");
const router = express.Router();

// Importando o controlador de autenticações
const authController = require("../controllers/authController");

// Criando a rota com o controle de login
router.post("/login", authController.login);

module.exports = router;