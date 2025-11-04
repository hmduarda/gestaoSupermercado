// useState pra guardar os valores dos campos e mensagem de erro
import { useState } from "react";
// useNavigate pra redirecionar depois do login
import { useNavigate } from "react-router-dom";
// Pegando a função de login do contexto
import { useAuth } from "../context/AuthContext";
// CSS da página de login
import "./Login.css";

const Login = () => {
  // Estados pra guardar o que o usuário digita
  const [email, setEmail] = useState(""); // começa vazio
  const [senha, setSenha] = useState(""); // começa vazio
  const [erro, setErro] = useState(""); // pra mostrar mensagens de erro

  // Pegando a função de login do contexto
  const { login } = useAuth();
  // Hook pra navegar pra outra página
  const navigate = useNavigate();

  // Função que executa quando o usuário clica em "Entrar"
  const handleSubmit = (e) => {
    e.preventDefault(); // previne o reload da página
    setErro(""); // limpa qualquer erro anterior

    // Validação básica - verifica se os campos estão preenchidos
    if (!email || !senha) {
      setErro("Por favor, preencha todos os campos");
      return; // para a execução aqui
    }

    // Chama a função de login (que por enquanto é mock)
    // Quando conectar com backend de verdade, isso vai validar o usuário na API
    const sucesso = login(email, senha);

    // Se o login foi bem sucedido, redireciona pra página de produtos
    if (sucesso) {
      navigate("/produtos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Títulos da página */}
        <h1>Sistema Administrativo</h1>
        <h2>Supermercado</h2>

        {/* Formulário de login */}
        <form onSubmit={handleSubmit}>
          {/* Campo de email */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email} // valor vem do estado
              onChange={(e) => setEmail(e.target.value)} // atualiza o estado quando digita
              placeholder="Digite seu email"
            />
          </div>

          {/* Campo de senha */}
          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password" // type password esconde o texto
              id="senha"
              value={senha} // valor vem do estado
              onChange={(e) => setSenha(e.target.value)} // atualiza o estado quando digita
              placeholder="Digite sua senha"
            />
          </div>

          {/* Mostra mensagem de erro se tiver algum */}
          {erro && <div className="erro">{erro}</div>}

          {/* Botão de submit */}
          <button type="submit" className="btn-primary">
            Entrar
          </button>
        </form>

        {/* Texto informativo pra quem tá testando */}
        <p className="info-texto">Para teste, use qualquer email e senha</p>
      </div>
    </div>
  );
};

export default Login;
