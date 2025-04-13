import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Centros from "./pages/Centros";
import Login from "./pages/Login";
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import IngresarInspeccion from './pages/IngresarInspeccion';

// Componente para proteger rutas
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/centros" element={
          <ProtectedRoute>
            <Layout>
              <Centros />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/ingresar-inspeccion" element={
          <ProtectedRoute>
            <Layout>
              <IngresarInspeccion />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
