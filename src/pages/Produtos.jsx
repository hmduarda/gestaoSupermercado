// usestate pra guardar estados, useeffect pra executar codigo quando o componente carrega
import { useState, useEffect } from "react";
// importando as funcoes da api mock que criamos
import {
  listarProdutos,
  adicionarProduto,
  atualizarProduto,
  removerProduto,
} from "../services/api";
// css da pagina de produtos
import "./Produtos.css";

const Produtos = () => {
  // estado que guarda a lista de produtos
  const [produtos, setProdutos] = useState([]);

  // estado pra controlar se o formulario ta aparecendo ou nao
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // estado que guarda qual produto ta sendo editado (null = ta adicionando um novo)
  const [produtoEditando, setProdutoEditando] = useState(null);

  // estado que guarda os valores do formulario
  const [formulario, setFormulario] = useState({
    nome: "",
    precoAtual: "",
    tipo: "",
    descricao: "",
    dataValidade: "",
  });

  // useeffect executa quando o componente e montado (carrega pela primeira vez)
  // [] vazio significa que so executa uma vez
  useEffect(() => {
    carregarProdutos(); // carrega os produtos do "backend"
  }, []);

  // funcao que busca os produtos e atualiza o estado
  const carregarProdutos = () => {
    const dados = listarProdutos();
    setProdutos(dados);
  };

  // funcao que executa quando o usuario digita em algum campo do formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target; // pega o name e value do input
    // atualiza o formulario mantendo os valores anteriores e mudando so o campo que foi editado
    setFormulario({ ...formulario, [name]: value });
  };

  // funcao que executa quando o usuario submete o formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // prepara os dados do produto
    const produtoData = {
      ...formulario,
      precoAtual: parseFloat(formulario.precoAtual),
    };

    // verifica se ta editando ou adicionando
    if (produtoEditando) {
      atualizarProduto(produtoEditando.id, produtoData);
    } else {
      adicionarProduto(produtoData);
    }

    // limpa o formulario e recarrega a lista
    limparFormulario();
    carregarProdutos();
  };

  // funcao que executa quando clica no botao editar
  const handleEditar = (produto) => {
    setProdutoEditando(produto); // guarda qual produto ta editando

    // preenche o formulario com os dados do produto
    setFormulario({
      nome: produto.nome,
      precoAtual: produto.precoAtual,
      tipo: produto.tipo,
      descricao: produto.descricao,
      dataValidade: produto.dataValidade,
    });

    setMostrarFormulario(true); // mostra o formulario
  };

  // funcao que executa quando clica no botao remover
  const handleRemover = (id) => {
    if (window.confirm("Tem certeza que deseja remover este produto?")) {
      removerProduto(id);
      carregarProdutos();
    }
  };

  // funcao que limpa o formulario e fecha ele
  const limparFormulario = () => {
    // reseta todos os campos do formulario
    setFormulario({
      nome: "",
      precoAtual: "",
      tipo: "",
      descricao: "",
      dataValidade: "",
    });
    setProdutoEditando(null); // limpa o produto que tava editando
    setMostrarFormulario(false); // esconde o formulario
  };

  return (
    <div className="containerPagina">
      {/* Cabeçalho da página com título e botão */}
      <div className="cabecalhoPagina">
        <h1>Gerenciamento de Produtos</h1>
        {/* Botão que alterna entre mostrar e esconder o formulário */}
        <button
          className="botaoPrimario"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {/* Texto do botão muda dependendo se o formulário tá aberto ou não */}
          {mostrarFormulario ? "Cancelar" : "Novo Produto"}
        </button>
      </div>

      {/* Só mostra o formulário se mostrarFormulario for true */}
      {mostrarFormulario && (
        <div className="cartaoFormulario">
          {/* Título muda dependendo se tá editando ou adicionando */}
          <h2>{produtoEditando ? "Editar Produto" : "Novo Produto"}</h2>
          <form onSubmit={handleSubmit}>
            {/* Primeira linha do formulário com 2 campos */}
            <div className="linhaFormulario">
              <div className="grupoFormulario">
                <label>Nome do Produto:</label>
                <input
                  type="text"
                  name="nome" // name tem que ser igual ao nome no estado
                  value={formulario.nome} // valor vem do estado
                  onChange={handleInputChange} // atualiza o estado quando digita
                  required // campo obrigatório
                />
              </div>

              <div className="grupoFormulario">
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
            <div className="linhaFormulario">
              <div className="grupoFormulario">
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

              <div className="grupoFormulario">
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
            <div className="grupoFormulario">
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
            <div className="acoesFormulario">
              <button type="submit" className="botaoPrimario">
                {/* Texto muda dependendo se tá editando ou adicionando */}
                {produtoEditando ? "Atualizar" : "Adicionar"}
              </button>
              <button
                type="button" // type button pra não submeter o form
                className="botaoSecundario"
                onClick={limparFormulario}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabela com a lista de produtos */}
      <div className="containerTabela">
        <table className="tabelaProdutos">
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
                    <span className="promocaoAtiva">
                      R$ {produto.precoPromocao.toFixed(2)}
                    </span>
                  ) : (
                    <span className="semPromocao">-</span>
                  )}
                </td>
                <td>
                  {/* Formata a data pro formato brasileiro */}
                  {new Date(produto.dataValidade).toLocaleDateString("pt-BR")}
                </td>
                <td className="colunaBotoes">
                  {/* Botões de editar e remover */}
                  <button
                    className="botaoEditar"
                    onClick={() => handleEditar(produto)}
                  >
                    Editar
                  </button>
                  <button
                    className="botaoRemover"
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
          <p className="mensagemVazia">Nenhum produto cadastrado</p>
        )}
      </div>
    </div>
  );
};

export default Produtos;
