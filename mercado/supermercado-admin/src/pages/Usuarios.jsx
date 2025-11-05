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
      await atualizarUsuario(usuarioEditando.id, formulario);
    } else {
      await adicionarUsuario(formulario);
    }

    limparFormulario();
    carregarUsuarios();
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
      carregarUsuarios();
      if (usuarioDetalhes?.id === id) {
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
    <div className="page-container">
      <div className="page-header">
        <h1>Gerenciamento de Usuários</h1>
        <button
          className="btn-primary"
          onClick={() => {
            setMostrarFormulario(!mostrarFormulario);
            setUsuarioDetalhes(null);
          }}
        >
          {mostrarFormulario ? "Cancelar" : "Novo Usuário"}
        </button>
      </div>

      <div className="usuarios-layout">
        <div className="lista-usuarios">
          <div className="tabela-container">
            <table className="tabela">
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
                    <td className="acoes">
                      <button
                        className="btn-visualizar"
                        onClick={() => handleVisualizarDetalhes(usuario)}
                      >
                        Ver
                      </button>
                      <button
                        className="btn-editar"
                        onClick={() => handleEditar(usuario)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-remover"
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
              <p className="mensagem-vazia">Nenhum usuário cadastrado</p>
            )}
          </div>
        </div>

        {(mostrarFormulario || usuarioDetalhes) && (
          <div className="painel-lateral">
            {mostrarFormulario && (
              <div className="formulario-card">
                <h2>{usuarioEditando ? "Editar Usuário" : "Novo Usuário"}</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
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

                  <div className="form-group">
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

                  <div className="form-group">
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

                  <div className="form-group">
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

                  <div className="form-actions">
                    <button type="submit" className="btn-primary">
                      {usuarioEditando ? "Atualizar" : "Adicionar"}
                    </button>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={limparFormulario}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {usuarioDetalhes && (
              <div className="detalhes-card">
                <h2>Detalhes do Usuário</h2>
                <div className="detalhes-info">
                  <div className="detalhe-item">
                    <strong>ID:</strong>
                    <span>{usuarioDetalhes.id}</span>
                  </div>
                  <div className="detalhe-item">
                    <strong>Nome:</strong>
                    <span>{usuarioDetalhes.nome}</span>
                  </div>
                  <div className="detalhe-item">
                    <strong>Email:</strong>
                    <span>{usuarioDetalhes.email}</span>
                  </div>
                  <div className="detalhe-item">
                    <strong>CPF:</strong>
                    <span>{formatarCPF(usuarioDetalhes.cpf)}</span>
                  </div>
                </div>
                <div className="detalhes-acoes">
                  <button
                    className="btn-primary"
                    onClick={() => handleEditar(usuarioDetalhes)}
                  >
                    Editar Usuário
                  </button>
                  <button
                    className="btn-remover"
                    onClick={() => handleRemover(usuarioDetalhes.id)}
                  >
                    Remover Usuário
                  </button>
                  <button
                    className="btn-secondary"
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
