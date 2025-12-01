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
      <Router>
        <div className="app">
          <Navbar />

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route
              path="/produtos"
              element={
                <RotaProtegida>
                  <Produtos />
                </RotaProtegida>
              }
            />

            <Route
              path="/promocoes"
              element={
                <RotaProtegida>
                  <Promocoes />
                </RotaProtegida>
              }
            />

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
