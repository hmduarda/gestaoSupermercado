// useState pra guardar estados, useEffect pra executar código quando o componente carrega
import { useState, useEffect } from "react";
// Importando as funções da API mock que criamos
import {
  listarProdutos,
  adicionarProduto,
  atualizarProduto,
  removerProduto,
} from "../services/api";
// CSS da página de produtos
import "./Produtos.css";

const Produtos = () => {
  // Estado que guarda a lista de produtos
  const [produtos, setProdutos] = useState([]);

  // Estado pra controlar se o formulário tá aparecendo ou não
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Estado que guarda qual produto tá sendo editado (null = tá adicionando um novo)
  const [produtoEditando, setProdutoEditando] = useState(null);

  // Estado que guarda os valores do formulário
  const [formulario, setFormulario] = useState({
    nome: "",
    precoAtual: "",
    tipo: "",
    descricao: "",
    dataValidade: "",
  });

  // useEffect executa quando o componente é montado (carrega pela primeira vez)
  // [] vazio significa que só executa uma vez
  useEffect(() => {
    carregarProdutos(); // carrega os produtos do "backend"
  }, []);

  // Função que busca os produtos da API e atualiza o estado
  const carregarProdutos = async () => {
    const dados = await listarProdutos(); // chama a função da API mock
    setProdutos(dados); // salva os produtos no estado
  };

  // Função que executa quando o usuário digita em algum campo do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target; // pega o name e value do input
    // Atualiza o formulário mantendo os valores anteriores e mudando só o campo que foi editado
    setFormulario({ ...formulario, [name]: value });
  };

  // Função que executa quando o usuário submete o formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // previne o reload da página

    // Prepara os dados do produto
    // parseFloat converte o preço de texto pra número decimal
    const produtoData = {
      ...formulario,
      precoAtual: parseFloat(formulario.precoAtual),
    };

    // Verifica se tá editando ou adicionando
    if (produtoEditando) {
      // Se tem produto editando, atualiza ele
      await atualizarProduto(produtoEditando.id, produtoData);
    } else {
      // Se não, adiciona um novo produto
      await adicionarProduto(produtoData);
    }

    // Limpa o formulário e recarrega a lista
    limparFormulario();
    carregarProdutos();
  };

  // Função que executa quando clica no botão Editar
  const handleEditar = (produto) => {
    setProdutoEditando(produto); // guarda qual produto tá editando

    // Preenche o formulário com os dados do produto
    setFormulario({
      nome: produto.nome,
      precoAtual: produto.precoAtual,
      tipo: produto.tipo,
      descricao: produto.descricao,
      dataValidade: produto.dataValidade,
    });

    setMostrarFormulario(true); // mostra o formulário
  };

  // Função que executa quando clica no botão Remover
  const handleRemover = async (id) => {
    // Confirma com o usuário se ele realmente quer remover
    if (window.confirm("Tem certeza que deseja remover este produto?")) {
      await removerProduto(id); // chama a função da API mock
      carregarProdutos(); // recarrega a lista sem o produto removido
    }
  };

  // Função que limpa o formulário e fecha ele
  const limparFormulario = () => {
    // Reseta todos os campos do formulário
    setFormulario({
      nome: "",
      precoAtual: "",
      tipo: "",
      descricao: "",
      dataValidade: "",
    });
    setProdutoEditando(null); // limpa o produto que tava editando
    setMostrarFormulario(false); // esconde o formulário
  };

  return (
    <div className="page-container">
      {/* Cabeçalho da página com título e botão */}
      <div className="page-header">
        <h1>Gerenciamento de Produtos</h1>
        {/* Botão que alterna entre mostrar e esconder o formulário */}
        <button
          className="btn-primary"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {/* Texto do botão muda dependendo se o formulário tá aberto ou não */}
          {mostrarFormulario ? "Cancelar" : "Novo Produto"}
        </button>
      </div>

      {/* Só mostra o formulário se mostrarFormulario for true */}
      {mostrarFormulario && (
        <div className="formulario-card">
          {/* Título muda dependendo se tá editando ou adicionando */}
          <h2>{produtoEditando ? "Editar Produto" : "Novo Produto"}</h2>
          <form onSubmit={handleSubmit}>
            {/* Primeira linha do formulário com 2 campos */}
            <div className="form-row">
              <div className="form-group">
                <label>Nome do Produto:</label>
                <input
                  type="text"
                  name="nome" // name tem que ser igual ao nome no estado
                  value={formulario.nome} // valor vem do estado
                  onChange={handleInputChange} // atualiza o estado quando digita
                  required // campo obrigatório
                />
              </div>

              <div className="form-group">
                <label>Preço Atual (R$):</label>
                <input
                  type="number"
                  step="0.01" // permite centavos
                  name="precoAtual"
                  value={formulario.precoAtual}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Segunda linha do formulário */}
            <div className="form-row">
              <div className="form-group">
                <label>Tipo:</label>
                <input
                  type="text"
                  name="tipo"
                  value={formulario.tipo}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: Grãos, Massas, Bebidas"
                />
              </div>

              <div className="form-group">
                <label>Data de Validade:</label>
                <input
                  type="date" // input especial de data
                  name="dataValidade"
                  value={formulario.dataValidade}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Campo de descrição (textarea) */}
            <div className="form-group">
              <label>Descrição:</label>
              <textarea
                name="descricao"
                value={formulario.descricao}
                onChange={handleInputChange}
                required
                rows="3" // 3 linhas de altura
              />
            </div>

            {/* Botões de ação do formulário */}
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {/* Texto muda dependendo se tá editando ou adicionando */}
                {produtoEditando ? "Atualizar" : "Adicionar"}
              </button>
              <button
                type="button" // type button pra não submeter o form
                className="btn-secondary"
                onClick={limparFormulario}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabela com a lista de produtos */}
      <div className="tabela-container">
        <table className="tabela">
          {/* Cabeçalho da tabela */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Preço</th>
              <th>Promoção</th>
              <th>Validade</th>
              <th>Ações</th>
            </tr>
          </thead>
          {/* Corpo da tabela - mapeia cada produto pra uma linha */}
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                {/* key é obrigatório em listas no React */}
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>{produto.tipo}</td>
                <td>R$ {produto.precoAtual.toFixed(2)}</td>
                {/* toFixed(2) mostra 2 casas decimais */}
                <td>
                  {/* Se tem promoção, mostra o preço, se não mostra - */}
                  {produto.precoPromocao ? (
                    <span className="promocao-ativa">
                      R$ {produto.precoPromocao.toFixed(2)}
                    </span>
                  ) : (
                    <span className="sem-promocao">-</span>
                  )}
                </td>
                <td>
                  {/* Formata a data pro formato brasileiro */}
                  {new Date(produto.dataValidade).toLocaleDateString("pt-BR")}
                </td>
                <td className="acoes">
                  {/* Botões de editar e remover */}
                  <button
                    className="btn-editar"
                    onClick={() => handleEditar(produto)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-remover"
                    onClick={() => handleRemover(produto.id)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mensagem quando não tem produtos */}
        {produtos.length === 0 && (
          <p className="mensagem-vazia">Nenhum produto cadastrado</p>
        )}
      </div>
    </div>
  );
};

export default Produtos;
