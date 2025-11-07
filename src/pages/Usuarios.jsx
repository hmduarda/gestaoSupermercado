// importando hooks do react
import { useState, useEffect } from "react";
// importando funcoes da api pra mexer nos usuarios
import {
  listarUsuarios,
  adicionarUsuario,
  atualizarUsuario,
  removerUsuario,
} from "../services/api";
import "./Usuarios.css";

// pagina de gerenciamento de usuarios
const Usuarios = () => {
  // estado com a lista de usuarios
  const [usuarios, setUsuarios] = useState([]);
  // controla se o formulario ta aparecendo
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  // guarda qual usuario ta sendo editado
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  // guarda qual usuario ta sendo visualizado no painel lateral
  const [usuarioDetalhes, setUsuarioDetalhes] = useState(null);
  // dados do formulario
  const [formulario, setFormulario] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
  });

  // carrega os usuarios quando a pagina abre
  useEffect(() => {
    carregarUsuarios();
  }, []);

  // busca os usuarios
  const carregarUsuarios = () => {
    const dados = listarUsuarios();
    setUsuarios(dados);
  };

  // atualiza o formulario quando o usuario digita
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  // salva o usuario (adiciona ou atualiza)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (usuarioEditando) {
      atualizarUsuario(usuarioEditando.id, formulario);
    } else {
      adicionarUsuario(formulario);
    }

    limparFormulario();
    carregarUsuarios();
  };

  // preenche o formulario com os dados do usuario pra editar
  const handleEditar = (usuario) => {
    setUsuarioEditando(usuario);
    setFormulario({
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      cpf: usuario.cpf,
    });
    setMostrarFormulario(true);
    setUsuarioDetalhes(null);
  };

  // remove um usuario
  const handleRemover = (id) => {
    if (window.confirm("Tem certeza que deseja remover este usuário?")) {
      removerUsuario(id);
      carregarUsuarios();
      if (usuarioDetalhes?.id === id) {
        setUsuarioDetalhes(null);
      }
    }
  };

  // mostra os detalhes do usuario no painel lateral
  const handleVisualizarDetalhes = (usuario) => {
    setUsuarioDetalhes(usuario);
    setMostrarFormulario(false);
  };

  // limpa o formulario e fecha ele
  const limparFormulario = () => {
    setFormulario({
      nome: "",
      email: "",
      senha: "",
      cpf: "",
    });
    setUsuarioEditando(null);
    setMostrarFormulario(false);
  };

  // formata o cpf pra ficar bonito (000.000.000-00)
  const formatarCPF = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  return (
    <div className="containerPagina">
      <div className="cabecalhoPagina">
        <h1>Gerenciamento de Usuários</h1>
        <button
          className="botaoPrimario"
          onClick={() => {
            setMostrarFormulario(!mostrarFormulario);
            setUsuarioDetalhes(null);
          }}
        >
          {mostrarFormulario ? "Cancelar" : "Novo Usuário"}
        </button>
      </div>

      <div className="layoutUsuarios">
        <div className="listaUsuarios">
          <div className="containerTabela">
            <table className="tabelaUsuarios">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>CPF</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nome}</td>
                    <td>{usuario.email}</td>
                    <td>{formatarCPF(usuario.cpf)}</td>
                    <td className="colunaBotoes">
                      <button
                        className="botaoVisualizar"
                        onClick={() => handleVisualizarDetalhes(usuario)}
                      >
                        Ver
                      </button>
                      <button
                        className="botaoEditar"
                        onClick={() => handleEditar(usuario)}
                      >
                        Editar
                      </button>
                      <button
                        className="botaoRemover"
                        onClick={() => handleRemover(usuario.id)}
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {usuarios.length === 0 && (
              <p className="mensagemVazia">Nenhum usuário cadastrado</p>
            )}
          </div>
        </div>

        {(mostrarFormulario || usuarioDetalhes) && (
          <div className="painelLateral">
            {mostrarFormulario && (
              <div className="cartaoFormulario">
                <h2>{usuarioEditando ? "Editar Usuário" : "Novo Usuário"}</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grupoFormulario">
                    <label>Nome Completo:</label>
                    <input
                      type="text"
                      name="nome"
                      value={formulario.nome}
                      onChange={handleInputChange}
                      required
                      placeholder="Digite o nome completo"
                    />
                  </div>

                  <div className="grupoFormulario">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={formulario.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Digite o email"
                    />
                  </div>

                  <div className="grupoFormulario">
                    <label>CPF:</label>
                    <input
                      type="text"
                      name="cpf"
                      value={formulario.cpf}
                      onChange={handleInputChange}
                      required
                      placeholder="000.000.000-00"
                      maxLength="14"
                    />
                  </div>

                  <div className="grupoFormulario">
                    <label>Senha:</label>
                    <input
                      type="password"
                      name="senha"
                      value={formulario.senha}
                      onChange={handleInputChange}
                      required
                      placeholder="Digite a senha"
                      minLength="6"
                    />
                  </div>

                  <div className="acoesFormulario">
                    <button type="submit" className="botaoPrimario">
                      {usuarioEditando ? "Atualizar" : "Adicionar"}
                    </button>
                    <button
                      type="button"
                      className="botaoSecundario"
                      onClick={limparFormulario}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {usuarioDetalhes && (
              <div className="cartaoDetalhes">
                <h2>Detalhes do Usuário</h2>
                <div className="infoDetalhes">
                  <div className="itemDetalhe">
                    <strong>ID:</strong>
                    <span>{usuarioDetalhes.id}</span>
                  </div>
                  <div className="itemDetalhe">
                    <strong>Nome:</strong>
                    <span>{usuarioDetalhes.nome}</span>
                  </div>
                  <div className="itemDetalhe">
                    <strong>Email:</strong>
                    <span>{usuarioDetalhes.email}</span>
                  </div>
                  <div className="itemDetalhe">
                    <strong>CPF:</strong>
                    <span>{formatarCPF(usuarioDetalhes.cpf)}</span>
                  </div>
                </div>
                <div className="acoesDetalhes">
                  <button
                    className="botaoPrimario"
                    onClick={() => handleEditar(usuarioDetalhes)}
                  >
                    Editar Usuário
                  </button>
                  <button
                    className="botaoRemover"
                    onClick={() => handleRemover(usuarioDetalhes.id)}
                  >
                    Remover Usuário
                  </button>
                  <button
                    className="botaoSecundario"
                    onClick={() => setUsuarioDetalhes(null)}
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Usuarios;
