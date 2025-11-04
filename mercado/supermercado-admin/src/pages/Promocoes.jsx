// Importando hooks do React
import { useState, useEffect } from "react";
// Importando funções da API que precisamos pra promoções
import {
  listarProdutos,
  aplicarPromocao,
  removerPromocao,
} from "../services/api";
import "./Promocoes.css";

// Página de gerenciamento de promoções
const Promocoes = () => {
  // Estado com a lista de produtos
  const [produtos, setProdutos] = useState([]);
  // Estado com o produto que o usuário selecionou no dropdown
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  // Estado com o preço promocional que o usuário digitou
  const [precoPromocao, setPrecoPromocao] = useState("");

  // Carrega os produtos quando a página abre
  useEffect(() => {
    carregarProdutos();
  }, []);

  // Função que busca os produtos da API
  const carregarProdutos = async () => {
    const dados = await listarProdutos();
    setProdutos(dados);
  };

  // Função que aplica a promoção quando o usuário submete o formulário
  const handleAplicarPromocao = async (e) => {
    e.preventDefault();

    // Valida se o usuário selecionou um produto e digitou o preço
    if (!produtoSelecionado || !precoPromocao) {
      alert("Selecione um produto e informe o preço promocional");
      return;
    }

    const preco = parseFloat(precoPromocao); // converte pra número

    // Valida se o preço promocional é menor que o preço normal
    // Não faz sentido uma "promoção" mais cara que o preço normal!
    if (preco >= produtoSelecionado.precoAtual) {
      alert("O preço promocional deve ser menor que o preço atual");
      return;
    }

    // Chama a função da API pra aplicar a promoção
    await aplicarPromocao(produtoSelecionado.id, preco);
    alert("Promoção aplicada com sucesso!");

    // Limpa o formulário
    setProdutoSelecionado(null);
    setPrecoPromocao("");
    // Recarrega a lista pra mostrar a promoção aplicada
    carregarProdutos();
  };

  // Função que remove a promoção de um produto
  const handleRemoverPromocao = async (produto) => {
    // Confirma com o usuário
    if (window.confirm(`Deseja remover a promoção de ${produto.nome}?`)) {
      await removerPromocao(produto.id);
      alert("Promoção removida com sucesso!");
      carregarProdutos(); // recarrega a lista
    }
  };

  // Função que calcula a porcentagem de desconto
  // Recebe um produto e retorna o desconto em %
  const calcularDesconto = (produto) => {
    if (!produto.precoPromocao) return 0; // se não tem promoção, desconto é 0

    // Fórmula: ((preço normal - preço promoção) / preço normal) * 100
    const desconto =
      ((produto.precoAtual - produto.precoPromocao) / produto.precoAtual) * 100;

    return desconto.toFixed(0); // toFixed(0) arredonda pra número inteiro
  };

  return (
    <div className="page-container">
      <h1>Gerenciamento de Promoções</h1>

      {/* Layout dividido em 2 colunas */}
      <div className="promocoes-layout">
        {/* Coluna da esquerda - formulário pra aplicar promoção */}
        <div className="formulario-card">
          <h2>Aplicar Nova Promoção</h2>
          <form onSubmit={handleAplicarPromocao}>
            {/* Select (dropdown) pra escolher o produto */}
            <div className="form-group">
              <label>Selecione o Produto:</label>
              <select
                value={produtoSelecionado?.id || ""} // usa optional chaining (?.)
                onChange={(e) => {
                  // Quando seleciona um produto, procura ele no array
                  const produto = produtos.find(
                    (p) => p.id === parseInt(e.target.value)
                  );
                  setProdutoSelecionado(produto);
                  setPrecoPromocao(""); // limpa o campo de preço
                }}
                required
              >
                <option value="">Escolha um produto</option>
                {/* Mapeia os produtos pra criar as opções do select */}
                {produtos.map((produto) => (
                  <option key={produto.id} value={produto.id}>
                    {produto.nome} - R$ {produto.precoAtual.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            {/* Só mostra o resto do formulário se tiver um produto selecionado */}
            {produtoSelecionado && (
              <>
                {/* Box com informações do produto selecionado */}
                <div className="info-produto">
                  <p>
                    <strong>Produto:</strong> {produtoSelecionado.nome}
                  </p>
                  <p>
                    <strong>Preço Atual:</strong> R${" "}
                    {produtoSelecionado.precoAtual.toFixed(2)}
                  </p>
                  {/* Aviso se o produto já tiver promoção */}
                  {produtoSelecionado.precoPromocao && (
                    <p className="aviso-promocao">
                      ⚠️ Este produto já possui uma promoção de R${" "}
                      {produtoSelecionado.precoPromocao.toFixed(2)}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label>Preço Promocional (R$):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={precoPromocao}
                    onChange={(e) => setPrecoPromocao(e.target.value)}
                    placeholder="Digite o preço promocional"
                    required
                  />
                </div>

                {precoPromocao &&
                  parseFloat(precoPromocao) < produtoSelecionado.precoAtual && (
                    <div className="info-desconto">
                      <p>
                        Desconto:{" "}
                        {calcularDesconto({
                          ...produtoSelecionado,
                          precoPromocao: parseFloat(precoPromocao),
                        })}
                        %
                      </p>
                      <p>
                        Economia: R${" "}
                        {(
                          produtoSelecionado.precoAtual -
                          parseFloat(precoPromocao)
                        ).toFixed(2)}
                      </p>
                    </div>
                  )}

                <button type="submit" className="btn-primary">
                  Aplicar Promoção
                </button>
              </>
            )}
          </form>
        </div>

        <div className="lista-promocoes">
          <h2>Produtos em Promoção</h2>
          {produtos.filter((p) => p.precoPromocao).length === 0 ? (
            <p className="mensagem-vazia">
              Nenhum produto em promoção no momento
            </p>
          ) : (
            <div className="cards-promocoes">
              {produtos
                .filter((p) => p.precoPromocao)
                .map((produto) => (
                  <div key={produto.id} className="card-promocao">
                    <div className="badge-desconto">
                      -{calcularDesconto(produto)}%
                    </div>
                    <h3>{produto.nome}</h3>
                    <p className="tipo">{produto.tipo}</p>
                    <div className="precos">
                      <span className="preco-antigo">
                        De: R$ {produto.precoAtual.toFixed(2)}
                      </span>
                      <span className="preco-promocao">
                        Por: R$ {produto.precoPromocao.toFixed(2)}
                      </span>
                    </div>
                    <button
                      className="btn-remover-promocao"
                      onClick={() => handleRemoverPromocao(produto)}
                    >
                      Remover Promoção
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Promocoes;
