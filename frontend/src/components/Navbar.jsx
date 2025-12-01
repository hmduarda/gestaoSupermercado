import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!usuario) return null;

  return (
    <nav className="barraNavegacao">
      <div className="containerNavegacao">
        <Link to="/produtos" className="logoSistema">
          Sistema Supermercado
        </Link>

        <div className="areaUsuario">
          <ul className="menuNavegacao">
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
          <button onClick={handleLogout} className="botaoSair">
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
