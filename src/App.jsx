// importando o react router pra fazer a navegacao entre paginas
// browserRouter gerencia as rotas
// routes define onde as rotas ficam
// route define cada rota individual
// navigate e pra redirecionar
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// importando o provider de autenticacao que criamos
import { AuthProvider } from "./context/AuthContext";

// importando o componente que protege as rotas
import RotaProtegida from "./components/RotaProtegida";

// importando a navbar
import Navbar from "./components/Navbar";

// importando todas tds as paginas
import Login from "./pages/Login";
import Produtos from "./pages/Produtos";
import Promocoes from "./pages/Promocoes";
import Usuarios from "./pages/Usuarios";

// css global da aplicacao
import "./App.css";

// componente principal da aplicacao
function App() {
  return (
    // authprovider envolve tudo pra que todos os componentes tenham acesso ao contexto de autenticacao
    <AuthProvider>
      {/* router habilita a navegacao sem recarregar a pagina */}
      <Router>
        <div className="app">
          {/* navbar aparece em todas as paginas */}
          <Navbar />

          {/* routes define todas as rotas da aplicacao */}
          <Routes>
            {/* rota da pagina de login - essa e publica, qualquer um acessa */}
            <Route path="/login" element={<Login />} />

            {/* rota raiz (/) redireciona pro login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* rota de produtos - protegida, so acessa se tiver logado */}
            <Route
              path="/produtos"
              element={
                <RotaProtegida>
                  <Produtos />
                </RotaProtegida>
              }
            />

            {/* rota de promocoes - protegida */}
            <Route
              path="/promocoes"
              element={
                <RotaProtegida>
                  <Promocoes />
                </RotaProtegida>
              }
            />

            {/* rota de usuarios - protegida */}
            <Route
              path="/usuarios"
              element={
                <RotaProtegida>
                  <Usuarios />
                </RotaProtegida>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
