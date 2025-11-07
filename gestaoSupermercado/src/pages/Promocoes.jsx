// importando hooks do react
import { useState, useEffect } from "react";
// importando funcoes da api que precisamos pra promocoes
import {
  listarProdutos,
  aplicarPromocao,
  removerPromocao,
} from "../services/api";
import "./Promocoes.css";

// pagina de gerenciamento de promocoes
const Promocoes = () => {
  // estado com a lista de produtos
  const [produtos, setProdutos] = useState([]);
  // estado com o produto que o usuario selecionou no dropdown
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  // estado com o preco promocional que o usuario digitou
  const [precoPromocao, setPrecoPromocao] = useState("");

  // carrega os produtos quando a pagina abre
  useEffect(() => {
    carregarProdutos();
  }, []);

  // funcao que busca os produtos
  const carregarProdutos = () => {
    const dados = listarProdutos();
    setProdutos(dados);
  };

  // funcao que aplica a promocao quando o usuario submete o formulario
  const handleAplicarPromocao = (e) => {
    e.preventDefault();

    // valida se o usuario selecionou um produto e digitou o preco
    if (!produtoSelecionado || !precoPromocao) {
      alert("Selecione um produto e informe o preço promocional");
      return;
    }

    const preco = parseFloat(precoPromocao);

    // valida se o preco promocional e menor que o preco normal
    if (preco >= produtoSelecionado.precoAtual) {
      alert("O preço promocional deve ser menor que o preço atual");
      return;
    }

    aplicarPromocao(produtoSelecionado.id, preco);
    alert("Promoção aplicada com sucesso!");

    // limpa o formulario
    setProdutoSelecionado(null);
    setPrecoPromocao("");
    // recarrega a lista pra mostrar a promocao aplicada
    carregarProdutos();
  };

  // funcao que remove a promocao de um produto
  const handleRemoverPromocao = (produto) => {
    if (window.confirm(`Deseja remover a promoção de ${produto.nome}?`)) {
      removerPromocao(produto.id);
      alert("Promoção removida com sucesso!");
      carregarProdutos();
    }
  };

  // funcao que calcula a porcentagem de desconto
  // recebe um produto e retorna o desconto em %
  const calcularDesconto = (produto) => {
    if (!produto.precoPromocao) return 0; // se nao tem promocao, desconto e 0

    // formula: ((preco normal - preco promocao) / preco normal) * 100
    const desconto =
      ((produto.precoAtual - produto.precoPromocao) / produto.precoAtual) * 100;

    return desconto.toFixed(0); // tofixed(0) arredonda pra numero inteiro
  };

  return (
    <div className="containerPagina">
      <h1>Gerenciamento de Promoções</h1>

      {/* layout dividido em 2 colunas */}
      <div className="layoutPromocoes">
        {/* coluna da esquerda - formulario pra aplicar promocao */}
        <div className="cartaoFormulario">
          <h2>Aplicar Nova Promoção</h2>
          <form onSubmit={handleAplicarPromocao}>
            {/* select (dropdown) pra escolher o produto */}
            <div className="grupoFormulario">
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
                {/* mapeia os produtos pra criar as opcoes do select */}
                {produtos.map((produto) => (
                  <option key={produto.id} value={produto.id}>
                    {produto.nome} - R$ {produto.precoAtual.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            {/* so mostra o resto do formulario se tiver um produto selecionado */}
            {produtoSelecionado && (
              <>
                {/* box com informacoes do produto selecionado */}
                <div className="infoProduto">
                  <p>
                    <strong>Produto:</strong> {produtoSelecionado.nome}
                  </p>
                  <p>
                    <strong>Preço Atual:</strong> R${" "}
                    {produtoSelecionado.precoAtual.toFixed(2)}
                  </p>
                  {/* aviso se o produto ja tiver promocao */}
                  {produtoSelecionado.precoPromocao && (
                    <p className="avisoPromocao">
                      ⚠️ Este produto já possui uma promoção de R${" "}
                      {produtoSelecionado.precoPromocao.toFixed(2)}
                    </p>
                  )}
                </div>

                <div className="grupoFormulario">
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
                    <div className="infoDesconto">
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

                <button type="submit" className="botaoPrimario">
                  Aplicar Promoção
                </button>
              </>
            )}
          </form>
        </div>

        <div className="listaPromocoes">
          <h2>Produtos em Promoção</h2>
          {produtos.filter((p) => p.precoPromocao).length === 0 ? (
            <p className="mensagemVazia">
              Nenhum produto em promoção no momento
            </p>
          ) : (
            <div className="cardsPromocoes">
              {produtos
                .filter((p) => p.precoPromocao)
                .map((produto) => (
                  <div key={produto.id} className="cardPromocao">
                    <div className="seletoDesconto">
                      -{calcularDesconto(produto)}%
                    </div>
                    <h3>{produto.nome}</h3>
                    <p className="tipoProduto">{produto.tipo}</p>
                    <div className="areaPrecosPromocao">
                      <span className="precoAntigo">
                        De: R$ {produto.precoAtual.toFixed(2)}
                      </span>
                      <span className="precoPromocional">
                        Por: R$ {produto.precoPromocao.toFixed(2)}
                      </span>
                    </div>
                    <button
                      className="botaoRemoverPromocao"
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
