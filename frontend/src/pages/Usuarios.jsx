
import { useState, useEffect } from "react";

import {
  listarUsuarios,
  adicionarUsuario,
  atualizarUsuario,
  removerUsuario,
} from "../services/api";
import "./Usuarios.css";


const Usuarios = () => {
  
  const [usuarios, setUsuarios] = useState([]);
  
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  
  const [usuarioDetalhes, setUsuarioDetalhes] = useState(null);
  
  const [formulario, setFormulario] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
  });

  
  useEffect(() => {
    carregarUsuarios();
  }, []);

  
  const carregarUsuarios = async () => {
    const dados = await listarUsuarios();
    setUsuarios(dados);
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usuarioEditando) {
      await atualizarUsuario(usuarioEditando._id, formulario);
    } else {
      await adicionarUsuario(formulario);
    }

    limparFormulario();
    await carregarUsuarios();
  };

  
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

  
  const handleRemover = async (id) => {
    if (window.confirm("Tem certeza que deseja remover este usuário?")) {
      await removerUsuario(id);
      await carregarUsuarios();
      if (usuarioDetalhes?._id === id) {
        setUsuarioDetalhes(null);
      }
    }
  };

  
  const handleVisualizarDetalhes = (usuario) => {
    setUsuarioDetalhes(usuario);
    setMostrarFormulario(false);
  };

  
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
                  <tr key={usuario._id}>
                    <td>{usuario._id}</td>
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
                        onClick={() => handleRemover(usuario._id)}
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
                    <span>{usuarioDetalhes._id}</span>
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
                    onClick={() => handleRemover(usuarioDetalhes._id)}
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

