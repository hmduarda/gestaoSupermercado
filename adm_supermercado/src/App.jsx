// Importando o React Router pra fazer a navegação entre páginas
// BrowserRouter gerencia as rotas
// Routes define onde as rotas ficam
// Route define cada rota individual
// Navigate é pra redirecionar
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Importando o Provider de autenticação que criamos
import { AuthProvider } from "./context/AuthContext";

// Importando o componente que protege as rotas
import RotaProtegida from "./components/RotaProtegida";

// Importando a navbar
import Navbar from "./components/Navbar";

// Importando todas as páginas
import Login from "./pages/Login";
import Produtos from "./pages/Produtos";
import Promocoes from "./pages/Promocoes";
import Usuarios from "./pages/Usuarios";

// CSS global da aplicação
import "./App.css";

// Componente principal da aplicação
function App() {
  return (
    // AuthProvider envolve tudo pra que todos os componentes tenham acesso ao contexto de autenticação
    <AuthProvider>
      {/* Router habilita a navegação sem recarregar a página */}
      <Router>
        <div className="app">
          {/* Navbar aparece em todas as páginas */}
          <Navbar />

          {/* Routes define todas as rotas da aplicação */}
          <Routes>
            {/* Rota da página de login - essa é pública, qualquer um acessa */}
            <Route path="/login" element={<Login />} />

            {/* Rota raiz (/) redireciona pro login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Rota de produtos - protegida, só acessa se tiver logado */}
            <Route
              path="/produtos"
              element={
                <RotaProtegida>
                  <Produtos />
                </RotaProtegida>
              }
            />

            {/* Rota de promoções - protegida */}
            <Route
              path="/promocoes"
              element={
                <RotaProtegida>
                  <Promocoes />
                </RotaProtegida>
              }
            />

            {/* Rota de usuários - protegida */}
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
