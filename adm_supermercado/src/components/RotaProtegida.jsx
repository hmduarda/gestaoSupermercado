// Importando Navigate do react-router-dom pra redirecionar o usuário
import { Navigate } from "react-router-dom";
// Importando o hook de autenticação que criamos
import { useAuth } from "../context/AuthContext";

// Componente que protege rotas - só deixa entrar se estiver logado
// Funciona como um "segurança" da aplicação
const RotaProtegida = ({ children }) => {
  // Pegando o usuário do contexto de autenticação
  const { usuario } = useAuth();

  // Se não tem usuário logado, manda pra página de login
  // O replace substitui a entrada no histórico (não dá pra voltar com o botão voltar)
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Se tá logado, renderiza o conteúdo da página normalmente
  return children;
};

export default RotaProtegida;
