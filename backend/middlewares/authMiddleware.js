// backend/middlewares/authMiddleware.js

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // 1. Pega o token do cabeçalho da requisição
  const authHeader = req.headers.authorization;

  // 2. Verifica se o cabeçalho de autorização existe
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Acesso negado. Nenhum token fornecido." });
  }

  // 3. O token vem no formato "Bearer [token]". Vamos separar e pegar só o token.
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Token em formato inválido." });
  }
  const token = parts[1];

  try {
    // 4. Verifica se o token é válido usando o mesmo segredo do login
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Se for válido, adiciona as informações do usuário (o 'payload' do token)
    //    ao objeto `req` para que os controllers possam usá-lo.
    req.user = decoded;

    // 6. Tudo certo! Chama a próxima função/middleware na fila (o porteiro liberou a passagem)
    next();
  } catch (error) {
    // 7. Se o token for inválido (expirado, etc.), retorna um erro.
    res.status(401).json({ message: "Token inválido ou expirado." });
  }
};

module.exports = authMiddleware;
