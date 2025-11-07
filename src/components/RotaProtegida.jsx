// importando navigate do react-router-dom pra redirecionar o usuario
import { Navigate } from "react-router-dom";
// importando o hook de autenticacao que criamos
import { useAuth } from "../context/AuthContext";

// componente que protege rotas - so deixa entrar se estiver logado
// funciona como um "seguranca" da aplicacao
const RotaProtegida = ({ children }) => {
  // pegando o usuario do contexto de autenticacao
  const { usuario } = useAuth();

  // se nao tem usuario logado, manda pra pagina de login
  // o replace substitui a entrada no historico (nao da pra voltar com o botao voltar)
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // se ta logado, renderiza o conteudo da pagina normalmente
  return children;
};

export default RotaProtegida;
