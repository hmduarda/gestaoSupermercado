// Importando as funções do React que vou usar
// createContext cria um contexto pra compartilhar dados entre componentes
// useState pra guardar o estado do usuário logado
// useContext pra acessar o contexto em outros componentes
import { createContext, useState, useContext } from "react";

// Criando o contexto de autenticação
// Isso vai permitir que qualquer componente acesse os dados do usuário logado
const AuthContext = createContext();

// Provider é o componente que vai envolver toda a aplicação
// Ele guarda o estado do usuário e fornece as funções de login/logout
export const AuthProvider = ({ children }) => {
  // Estado que guarda os dados do usuário logado (ou null se não estiver logado)
  const [usuario, setUsuario] = useState(null);

  // Função de login - por enquanto é mock, aceita qualquer email/senha
  // Quando conectar com backend de verdade, vai fazer uma requisição pra API aqui
  const login = (email, senha) => {
    // Criando um usuário fake só pra testar
    // No backend real, isso viria da API
    const usuarioMock = {
      id: 1,
      nome: "Admin",
      email: email, // pegando o email que o usuário digitou
      cpf: "000.000.000-00",
    };

    // Salvando o usuário no estado
    setUsuario(usuarioMock);

    // Salvando também no localStorage pra não perder quando recarregar a página
    // JSON.stringify transforma o objeto em texto pra poder salvar
    localStorage.setItem("usuario", JSON.stringify(usuarioMock));

    return true; // retorna true pra indicar que o login foi bem sucedido
  };

  // Função de logout - limpa tudo do usuário
  const logout = () => {
    setUsuario(null); // remove o usuário do estado
    localStorage.removeItem("usuario"); // remove do localStorage também
  };

  // Função pra recuperar o usuário do localStorage quando recarrega a página
  // Assim o usuário continua logado mesmo depois de dar F5
  const carregarUsuario = () => {
    const usuarioSalvo = localStorage.getItem("usuario"); // pega do localStorage
    if (usuarioSalvo) {
      // JSON.parse transforma o texto de volta em objeto
      setUsuario(JSON.parse(usuarioSalvo));
    }
  };

  // Retorna o Provider que vai envolver a aplicação
  // value é o que fica disponível pros outros componentes usarem
  return (
    <AuthContext.Provider value={{ usuario, login, logout, carregarUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado pra facilitar o uso do contexto
// Em vez de usar useContext(AuthContext), só usa useAuth()
export const useAuth = () => {
  const context = useContext(AuthContext);

  // Validação pra ter certeza que tá sendo usado dentro do Provider
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context; // retorna o contexto com usuario, login, logout, etc
};
