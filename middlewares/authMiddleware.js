const jwt = require("jsonwebtoken");

const tokenValidation = (req, res, next) => {
    // Busca o token no cabeçalho da requisição
    const token = req.header("Authorization");
    // Caso não exista o token, o acesso é negado
    if (!token) return res.status(401).json({ error: "Acesso negado" });

    try {
        // Faz a verificação do token e permite o acesso caso esteja tudo certo
        const verified = jwt.verify(token.split(" ")[1], "secreta");
        req.user = verified;
        next();
    } catch (error) {
        // Bloqueia o acesso
        res.status(400).json({ error: "Token inválido" });
    }
};


module.exports = {
    tokenValidation,
};