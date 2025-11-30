const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const caminho = req.path;
  const metodo = req.method;

  if (caminho === "/api/auth/login") {
    return next();
  }

  if (caminho === "/api/users" && metodo === "POST") {
    return next();
  }

  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ mensagem: "Token nao fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.usuario = decoded;
    next();
  } catch (erro) {
    return res.status(401).json({ mensagem: "Token invalido ou expirado" });
  }
};

module.exports = auth;
