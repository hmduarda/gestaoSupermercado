// Link é pra criar links que não recarregam a página (SPA)
// useNavigate é pra redirecionar programaticamente (tipo quando clica em sair)
import { Link, useNavigate } from "react-router-dom";
// Pegando o contexto de autenticação
import { useAuth } from "../context/AuthContext";
// Importando o CSS da navbar
import "./Navbar.css";

// Componente da barra de navegação que fica no topo da página
const Navbar = () => {
  // Pegando o usuário logado e a função de logout do contexto
  const { usuario, logout } = useAuth();
  // Hook pra navegar entre páginas
  const navigate = useNavigate();

  // Função que executa quando clica no botão Sair
  const handleLogout = () => {
    logout(); // chama a função de logout do contexto
    navigate("/login"); // redireciona pra página de login
  };

  // Se não tem usuário logado, não mostra a navbar
  // Isso previne erro quando tá na página de login
  if (!usuario) return null;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/título do sistema */}
        <h2 className="navbar-logo">Sistema Supermercado</h2>

        {/* Menu de navegação com os links principais */}
        <ul className="navbar-menu">
          <li>
            <Link to="/produtos">Produtos</Link>
          </li>
          <li>
            <Link to="/promocoes">Promoções</Link>
          </li>
          <li>
            <Link to="/usuarios">Usuários</Link>
          </li>
        </ul>

        {/* Área do usuário com nome e botão de sair */}
        <div className="navbar-user">
          {/* Mostra o nome do usuário logado */}
          <span>Olá, {usuario.nome}</span>
          {/* Botão de logout */}
          <button onClick={handleLogout} className="btn-logout">
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
