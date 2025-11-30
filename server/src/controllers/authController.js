const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await User.findOne({ email });

    if (!usuario) {
      return res.status(401).json({ mensagem: "Email ou senha incorretos" });
    }

    const senhaValida = await usuario.compararSenha(senha);

    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Email ou senha incorretos" });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        cpf: usuario.cpf,
      },
    });
  } catch (erro) {
    res
      .status(500)
      .json({ mensagem: "Erro ao fazer login", erro: erro.message });
  }
};
