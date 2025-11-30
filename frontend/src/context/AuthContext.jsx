import { createContext, useState, useContext } from "react";
import { login as loginApi } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const login = async (email, senha) => {
    try {
      const dados = await loginApi(email, senha);
      setUsuario(dados.usuario);
      return true;
    } catch (erro) {
      console.error("Erro no login:", erro);
      return false;
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  const carregarUsuario = () => {
    const usuarioSalvo = localStorage.getItem("usuario");
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, carregarUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
};
