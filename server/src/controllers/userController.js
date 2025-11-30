const User = require("../models/User");

exports.listarTodos = async (req, res) => {
  try {
    const usuarios = await User.find().select("-senha -__v");
    res.status(200).json(usuarios);
  } catch (erro) {
    res
      .status(500)
      .json({ mensagem: "Erro ao buscar usuarios", erro: erro.message });
  }
};

exports.buscarUm = async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id).select("-senha -__v");

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuario nao encontrado" });
    }

    res.status(200).json(usuario);
  } catch (erro) {
    res
      .status(500)
      .json({ mensagem: "Erro ao buscar usuario", erro: erro.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const { nome, email, senha, cpf } = req.body;

    const usuarioExiste = await User.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ mensagem: "Email ja cadastrado" });
    }

    const novoUsuario = await User.create({
      nome,
      email,
      senha,
      cpf,
    });

    const usuarioResposta = await User.findById(novoUsuario._id).select(
      "-senha -__v"
    );
    res.status(201).json(usuarioResposta);
  } catch (erro) {
    res
      .status(500)
      .json({ mensagem: "Erro ao criar usuario", erro: erro.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { nome, email, cpf } = req.body;

    const usuarioAtualizado = await User.findByIdAndUpdate(
      req.params.id,
      { nome, email, cpf },
      { new: true }
    ).select("-senha -__v");

    if (!usuarioAtualizado) {
      return res.status(404).json({ mensagem: "Usuario nao encontrado" });
    }

    res.status(200).json(usuarioAtualizado);
  } catch (erro) {
    res
      .status(500)
      .json({ mensagem: "Erro ao atualizar usuario", erro: erro.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const usuario = await User.findByIdAndDelete(req.params.id);

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuario nao encontrado" });
    }

    res.status(200).json({ mensagem: "Usuario deletado com sucesso" });
  } catch (erro) {
    res
      .status(500)
      .json({ mensagem: "Erro ao deletar usuario", erro: erro.message });
  }
};
