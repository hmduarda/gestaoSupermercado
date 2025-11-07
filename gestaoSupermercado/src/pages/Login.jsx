// usestate pra guardar os valores dos campos e mensagem de erro
import { useState } from "react";
// usenavigate pra redirecionar depois do login
import { useNavigate } from "react-router-dom";
// pegando a funcao de login do contexto
import { useAuth } from "../context/AuthContext";
// css da pagina de login
import "./Login.css";

const Login = () => {
  // estados pra guardar o que o usuario digita
  const [email, setEmail] = useState(""); // comeca vazio
  const [senha, setSenha] = useState(""); // comeca vazio
  const [erro, setErro] = useState(""); // pra mostrar mensagens de erro

  // pegando a funcao de login do contexto
  const { login } = useAuth();
  // hook pra navegar pra outra pagina
  const navigate = useNavigate();

  // funcao que executa quando o usuario clica em "entrar"
  const handleSubmit = (e) => {
    e.preventDefault(); // previne o reload da pagina
    setErro(""); // limpa qualquer erro anterior

    // validacao basica - verifica se os campos estao preenchidos
    if (!email || !senha) {
      setErro("Por favor, preencha todos os campos");
      return; // para a execucao aqui
    }

    // chama a funcao de login (que por enquanto e mock)
    // quando conectar com backend de verdade, isso vai validar o usuario na api
    const sucesso = login(email, senha);

    // se o login foi bem sucedido, redireciona pra pagina de produtos
    if (sucesso) {
      navigate("/produtos");
    }
  };

  return (
    <div className="containerLogin">
      <div className="caixaLogin">
        {/* titulos da pagina */}
        <h1>Sistema Administrativo</h1>
        <h2>Supermercado</h2>

        {/* formulario de login */}
        <form onSubmit={handleSubmit}>
          {/* campo de email */}
          <div className="grupoFormulario">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="campoEmail"
              value={email} // valor vem do estado
              onChange={(e) => setEmail(e.target.value)} // atualiza o estado quando digita
              placeholder="Digite seu email"
            />
          </div>

          {/* campo de senha */}
          <div className="grupoFormulario">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password" // type password esconde o texto
              id="campoSenha"
              value={senha} // valor vem do estado
              onChange={(e) => setSenha(e.target.value)} // atualiza o estado quando digita
              placeholder="Digite sua senha"
            />
          </div>

          {/* mostra mensagem de erro se tiver algum */}
          {erro && <div className="mensagemErro">{erro}</div>}

          {/* botao de submit */}
          <button type="submit" className="botaoEntrar">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
