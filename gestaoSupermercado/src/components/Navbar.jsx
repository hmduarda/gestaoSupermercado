// link e pra criar links que nao recarregam a pagina 
// usenavigate e pra redirecionar programaticamente (tipo quando clica em sair)
import { Link, useNavigate } from "react-router-dom";
// pegando o contexto de autenticacao
import { useAuth } from "../context/AuthContext";
// importando o css da navbar
import "./Navbar.css";

// componente da barra de navegacao que fica no topo da pagina
const Navbar = () => {
  // pegando o usuario logado e a funcao de logout do contexto
  const { usuario, logout } = useAuth();
  // hook pra navegar entre paginas
  const navigate = useNavigate();

  // funcao que executa quando clica no botao sair
  const handleLogout = () => {
    logout(); // chama a funcao de logout do contexto
    navigate("/login"); // redireciona pra pagina de login
  };

  // se nao tem usuario logado, nao mostra a navbar
  // isso previne erro quando ta na pagina de login
  if (!usuario) return null;

  return (
    <nav className="barraNavegacao">
      <div className="containerNavegacao">
        {/* logo/titulo do sistema cm link para home */}
        <Link to="/produtos" className="logoSistema">
          Sistema Supermercado
        </Link>

        {/* area do usuario com menu e botao de sair */}
        <div className="areaUsuario">
          {/* menu de navegacao com os links principais */}
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
          {/* botao de logout */}
          <button onClick={handleLogout} className="botaoSair">
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
