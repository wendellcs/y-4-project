const validateModelo = (req, res, next) => {
    // Extraindo as informações do corpo da requisição
    const { modelo, ano, marca } = req.body

    // Verifica se o modelo não foi passado, se o tipo é diferente de string ou o tem menos de 3 caracteres
    if (!modelo || typeof modelo !== "string" || modelo.length < 3) {
        return res.status(400).json({ error: "O modelo é obrigatório e deve ter pelo menos 3 caracteres." })
    }

    next()
}

// Pasta: middlewares
// arquivo: validateModelo.js