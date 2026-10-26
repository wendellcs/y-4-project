// Importando o JSONWebToken
const jwt = require("jsonwebtoken");

// Usuários utilizados para teste
const users = [
    { email: 'user@example.com', password: '123456' }
];

const login = (req, res) => {
    // Extraindo o email e senha da requisição
    const { email, password } = req.body;

    // Verificando se o usuário existe
    const user = users.find(u => u.email === email && u.password === password);

    // Retorna um erro caso não exista
    if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Faz login com os dados informados, cria o token com duração de 1 hora.
    const token = jwt.sign({ email: user.email }, 'secreta', { expiresIn: '1h' });

    res.json({ token });
};

// Exporta a função de login
module.exports = { login };