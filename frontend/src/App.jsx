




import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


import { AuthProvider } from "./context/AuthContext";


import RotaProtegida from "./components/RotaProtegida";


import Navbar from "./components/Navbar";


import Login from "./pages/Login";
import Produtos from "./pages/Produtos";
import Promocoes from "./pages/Promocoes";
import Usuarios from "./pages/Usuarios";


import "./App.css";


function App() {
  return (
    
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

