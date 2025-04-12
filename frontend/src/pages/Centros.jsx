// src/pages/Centros.jsx

import { useEffect, useState } from "react";

function Centros() {
  const [centros, setCentros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/centros")
      .then((res) => res.json())
      .then((data) => {
        setCentros(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar centros:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando centros...</p>;

  return (
    <div>
      <h1>Centros de Cultivo</h1>
      {centros.length === 0 ? (
        <p>No hay centros registrados.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Titular</th>
              <th>RUT</th>
              <th>ACS</th>
              <th>Ubicación</th>
            </tr>
          </thead>
          <tbody>
            {centros.map((centro) => (
              <tr key={centro.id}>
                <td>{centro.id}</td>
                <td>{centro.codigo_centro}</td>
                <td>{centro.titular}</td>
                <td>{centro.rut}</td>
                <td>{centro.acs}</td>
                <td>{centro.ubicacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Centros;
