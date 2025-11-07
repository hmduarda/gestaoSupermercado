// importando as funcoes do react que vou usar
// createcontext cria um contexto pra compartilhar dados entre componentes
// usestate pra guardar o estado do usuario logado
// usecontext pra acessar o contexto em outros componentes
import { createContext, useState, useContext } from "react";

// criando o contexto de autenticacao
// isso vai permitir que qualquer componente acesse os dados do usuario logado
const AuthContext = createContext();

// provider e o componente que vai envolver toda a aplicacao
// ele guarda o estado do usuario e fornece as funcoes de login/logout
export const AuthProvider = ({ children }) => {
  // estado que guarda os dados do usuario logado (ou null se nao estiver logado)
  const [usuario, setUsuario] = useState(null);

  // funcao de login - por enquanto e mock, aceita qualquer email/senha
  // quando conectar com backend de verdade, vai fazer uma requisicao pra api aqui
  const login = (email, senha) => {
    // criando um usuario fake so pra testar
    // no backend real, isso viria da api
    const usuarioMock = {
      id: 1,
      nome: "Admin",
      email: email, // pegando o email que o usuario digitou
      cpf: "000.000.000-00",
    };

    // salvando o usuario no estado
    setUsuario(usuarioMock);

    // salvando tambem no localstorage pra nao perder quando recarregar a pagina
    // json.stringify transforma o objeto em texto pra poder salvar
    localStorage.setItem("usuario", JSON.stringify(usuarioMock));

    return true; // retorna true pra indicar que o login foi bem sucedido
  };

  // funcao de logout - limpa tudo do usuario
  const logout = () => {
    setUsuario(null); // remove o usuario do estado
    localStorage.removeItem("usuario"); // remove do localstorage tambem
  };

  // funcao pra recuperar o usuario do localstorage quando recarrega a pagina
  // assim o usuario continua logado mesmo depois de dar f5
  const carregarUsuario = () => {
    const usuarioSalvo = localStorage.getItem("usuario"); // pega do localstorage
    if (usuarioSalvo) {
      // json.parse transforma o texto de volta em objeto
      setUsuario(JSON.parse(usuarioSalvo));
    }
  };

  // retorna o provider que vai envolver a aplicacao
  // value e o que fica disponivel pros outros componentes usarem
  return (
    <AuthContext.Provider value={{ usuario, login, logout, carregarUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook customizado pra facilitar o uso do contexto
// em vez de usar usecontext(authcontext), so usa useauth()
export const useAuth = () => {
  const context = useContext(AuthContext);

  // validacao pra ter certeza que ta sendo usado dentro do provider
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context; // retorna o contexto com usuario, login, logout, etc
};
