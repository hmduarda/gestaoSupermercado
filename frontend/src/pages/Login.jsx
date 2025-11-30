
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "./Login.css";

const Login = () => {
  
  const [email, setEmail] = useState(""); 
  const [senha, setSenha] = useState(""); 
  const [erro, setErro] = useState(""); 

  
  const { login } = useAuth();
  
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setErro(""); 

    
    if (!email || !senha) {
      setErro("Por favor, preencha todos os campos");
      return; 
    }

    
    const sucesso = await login(email, senha);

    
    if (sucesso) {
      navigate("/produtos");
    } else {
      setErro("Email ou senha incorretos");
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
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Digite seu email"
            />
          </div>

          {/* campo de senha */}
          <div className="grupoFormulario">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password" 
              id="campoSenha"
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
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

