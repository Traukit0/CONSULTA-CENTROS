import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Centros from "./pages/Centros";
import Login from "./pages/Login";

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
        <Route path="/centros" element={
          <ProtectedRoute>
            <Centros />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Capturar cualquier ruta no definida */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
