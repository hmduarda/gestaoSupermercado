const Product = require("../models/Product");

exports.listarTodos = async (req, res) => {
  try {
    const produtos = await Product.find().select("-__v");
    res.status(200).json(produtos);
  } catch (erro) {
    res
      .status(500)
      .json({ mensagem: "Erro ao buscar produtos", erro: erro.message });
  }
};

exports.buscarUm = async (req, res) => {
  try {
    const produto = await Product.findById(req.params.id).select("-__v");

    if (!produto) {
      return res.status(404).json({ mensagem: "Produto nao encontrado" });
    }

    res.status(200).json(produto);
  } catch (erro) {
    res
      .status(500)
      .json({ mensagem: "Erro ao buscar produto", erro: erro.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const { nome, precoAtual, tipo, descricao, dataValidade } = req.body;

    const novoProduto = await Product.create({
      nome,
      precoAtual,
      tipo,
      descricao,
      dataValidade,
    });

    res.status(201).json(novoProduto);
  } catch (erro) {
    res
      .status(500)
      .json({ mensagem: "Erro ao criar produto", erro: erro.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const produtoAtualizado = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-__v");

    if (!produtoAtualizado) {
      return res.status(404).json({ mensagem: "Produto nao encontrado" });
    }

    res.status(200).json(produtoAtualizado);
  } catch (erro) {
    res
      .status(500)
      .json({ mensagem: "Erro ao atualizar produto", erro: erro.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const produto = await Product.findByIdAndDelete(req.params.id);

    if (!produto) {
      return res.status(404).json({ mensagem: "Produto nao encontrado" });
    }

    res.status(200).json({ mensagem: "Produto deletado com sucesso" });
  } catch (erro) {
    res
      .status(500)
      .json({ mensagem: "Erro ao deletar produto", erro: erro.message });
  }
};

exports.aplicarPromocao = async (req, res) => {
  try {
    const { precoPromocao } = req.body;

    const produto = await Product.findByIdAndUpdate(
      req.params.id,
      { precoPromocao },
      { new: true }
    );

    if (!produto) {
      return res.status(404).json({ mensagem: "Produto nao encontrado" });
    }

    res.status(200).json(produto);
  } catch (erro) {
    res
      .status(500)
      .json({ mensagem: "Erro ao aplicar promocao", erro: erro.message });
  }
};

exports.removerPromocao = async (req, res) => {
  try {
    const produto = await Product.findByIdAndUpdate(
      req.params.id,
      { precoPromocao: null },
      { new: true }
    );

    if (!produto) {
      return res.status(404).json({ mensagem: "Produto nao encontrado" });
    }

    res.status(200).json(produto);
  } catch (erro) {
    res
      .status(500)
      .json({ mensagem: "Erro ao remover promocao", erro: erro.message });
  }
};
