const validateModelo = (req, res, next) => {
    const { modelo, ano, marca } = req.body

    if (!modelo || typeof modelo !== "string" || modelo.length < 3) {
        return res.status(400).json({ error: "O modelo é obrigatório e deve ter pelo menos 3 caracteres." })
    }

    next()
}

module.exports = validateModelo