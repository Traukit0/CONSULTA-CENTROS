import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWithToken } from '../utils/api';
import './IngresarInspeccion.css';

function IngresarInspeccion() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split('T')[0],
    codigo_centro: '',
    tipo_inspeccion: '',
    // Datos del responsable
    responsable_nombre: '',
    responsable_rut: '',
    responsable_cargo: '',
    responsable_telefono: '',
    responsable_email: '',
    observaciones: '',
    // Fiscalizadores
    fiscalizador_1_id: '',
    fiscalizador_2_id: ''
  });
  
  const [centroCargado, setCentroCargado] = useState(null);
  const [tiposInspeccion, setTiposInspeccion] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [cargandoCentro, setCargandoCentro] = useState(false);
  const [cargandoTipos, setCargandoTipos] = useState(true);
  const [cargandoFuncionarios, setCargandoFuncionarios] = useState(true);
  const [errorTipos, setErrorTipos] = useState('');
  const [errorFuncionarios, setErrorFuncionarios] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');
  const [errorFiscalizadores, setErrorFiscalizadores] = useState('');

  // Cargar tipos de inspección al iniciar
  useEffect(() => {
    const cargarTiposInspeccion = async () => {
      try {
        setCargandoTipos(true);
        setErrorTipos('');
        
        // Corregir la ruta usando guiones en lugar de guiones bajos
        const response = await fetchWithToken('/tipos-inspeccion/');
        
        if (response.ok) {
          const data = await response.json();
          console.log('Tipos de inspección cargados:', data);
          setTiposInspeccion(data);
          
          if (data.length === 0) {
            setErrorTipos('No hay tipos de inspección registrados en el sistema');
          }
        } else {
          console.error('Error al cargar tipos de inspección:', response.status);
          setErrorTipos('No se pudieron cargar los tipos de inspección');
          setTiposInspeccion([]);
        }
      } catch (err) {
        console.error('Error al cargar tipos de inspección:', err);
        setErrorTipos('Error de conexión al cargar los tipos de inspección');
        setTiposInspeccion([]);
      } finally {
        setCargandoTipos(false);
      }
    };

    cargarTiposInspeccion();
  }, []);

  // Cargar funcionarios al iniciar
  useEffect(() => {
    const cargarFuncionarios = async () => {
      try {
        setCargandoFuncionarios(true);
        setErrorFuncionarios('');
        
        const response = await fetchWithToken('/funcionarios/');
        
        if (response.ok) {
          const data = await response.json();
          console.log('Funcionarios cargados:', data);
          setFuncionarios(data);
          
          if (data.length === 0) {
            setErrorFuncionarios('No hay funcionarios registrados en el sistema');
          }
        } else {
          console.error('Error al cargar funcionarios:', response.status);
          setErrorFuncionarios('No se pudieron cargar los funcionarios');
          setFuncionarios([]);
        }
      } catch (err) {
        console.error('Error al cargar funcionarios:', err);
        setErrorFuncionarios('Error de conexión al cargar los funcionarios');
        setFuncionarios([]);
      } finally {
        setCargandoFuncionarios(false);
      }
    };

    cargarFuncionarios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validación específica para fiscalizadores
    if (name === 'fiscalizador_1_id' || name === 'fiscalizador_2_id') {
      // Limpiar mensajes de error previos
      setErrorFiscalizadores('');
      
      const otherFiscalizador = name === 'fiscalizador_1_id' ? 'fiscalizador_2_id' : 'fiscalizador_1_id';
      
      // Si el valor no está vacío y coincide con el otro fiscalizador
      if (value && value === formData[otherFiscalizador]) {
        setErrorFiscalizadores('No puede seleccionar el mismo funcionario para ambos fiscalizadores');
        return;
      }
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const buscarCentro = async () => {
    const codigoCentro = formData.codigo_centro.trim();
    
    // Validar formato (6 dígitos numéricos)
    if (!/^\d{6}$/.test(codigoCentro)) {
      setError('El código del centro debe ser un número de 6 dígitos');
      return;
    }
    
    try {
      setCargandoCentro(true);
      setError('');
      
      const response = await fetchWithToken(`/centros/${codigoCentro}`);
      
      if (response.ok) {
        const data = await response.json();
        setCentroCargado(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Centro no encontrado');
        setCentroCargado(null);
      }
    } catch (err) {
      console.error('Error al buscar centro:', err);
      setError('Error de conexión al buscar el centro');
      setCentroCargado(null);
    } finally {
      setCargandoCentro(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que se haya buscado un centro
    if (!centroCargado) {
      setError('Debe buscar y seleccionar un centro válido');
      return;
    }
    
    // Validar que se haya seleccionado un tipo de inspección
    if (!formData.tipo_inspeccion) {
      setError('Debe seleccionar un tipo de inspección');
      return;
    }
    
    // Validar que no se haya seleccionado el mismo funcionario para ambos fiscalizadores
    if (formData.fiscalizador_1_id && formData.fiscalizador_2_id && 
        formData.fiscalizador_1_id === formData.fiscalizador_2_id) {
      setErrorFiscalizadores('No puede seleccionar el mismo funcionario para ambos fiscalizadores');
      return;
    }
    
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    try {
      // Paso 1: Crear/buscar el responsable primero
      const responsableData = {
        nombre: formData.responsable_nombre,
        rut: formData.responsable_rut,
        cargo: formData.responsable_cargo,
        telefono: formData.responsable_telefono,
        email: formData.responsable_email
      };

      // Enviar datos del responsable para obtener su ID
      const responsableResponse = await fetchWithToken('/responsables/', {
        method: 'POST',
        body: JSON.stringify(responsableData)
      });

      if (!responsableResponse.ok) {
        const errorData = await responsableResponse.json();
        setError(errorData.error || 'Error al guardar datos del responsable');
        setShowConfirmation(false);
        return;
      }

      // Obtener el ID del responsable creado/encontrado
      const responsableResult = await responsableResponse.json();
      const responsableId = responsableResult.id;

      // Paso 2: Crear la inspección usando el ID del responsable
      const inspeccionData = {
        fecha: formData.fecha,
        centro_id: centroCargado.id,
        tipo_id: formData.tipo_inspeccion,
        responsable_id: responsableId, // Ahora usamos el ID numérico
        fiscalizador_1_id: formData.fiscalizador_1_id,
        fiscalizador_2_id: formData.fiscalizador_2_id || null,
        observaciones: formData.observaciones
      };

      const inspeccionResponse = await fetchWithToken('/inspecciones/', {
        method: 'POST',
        body: JSON.stringify(inspeccionData)
      });

      if (inspeccionResponse.ok) {
        navigate('/dashboard');
      } else {
        const errorData = await inspeccionResponse.json();
        setError(errorData.error || 'Error al guardar la inspección');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error de conexión al enviar los datos');
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  // Función para obtener el nombre de un funcionario por su ID
  const getFuncionarioNombre = (id) => {
    const funcionario = funcionarios.find(f => f.id.toString() === id.toString());
    return funcionario ? funcionario.nombre : '';
  };

  return (
    <div className="ingresar-inspeccion-container">
      <div className="inspeccion-header">
        <h1>Ingresar Nueva Inspección</h1>
        <p>Complete el formulario para registrar una nueva inspección</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="inspeccion-form">
        <div className="form-section">
          <h2>Información General</h2>
          
          <div className="form-group">
            <label htmlFor="fecha">Fecha de Inspección</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="codigo_centro">Código del Centro</label>
            <div className="input-with-button">
              <input
                type="text"
                id="codigo_centro"
                name="codigo_centro"
                value={formData.codigo_centro}
                onChange={handleChange}
                placeholder="Ingrese código de 6 dígitos"
                pattern="\d{6}"
                title="El código debe ser un número de 6 dígitos"
                required
              />
              <button 
                type="button" 
                className="btn-buscar"
                onClick={buscarCentro}
                disabled={cargandoCentro}
              >
                {cargandoCentro ? 'Buscando...' : 'Buscar'}
              </button>
            </div>
          </div>

          {centroCargado && (
            <div className="centro-info">
              <div className="info-item">
                <span className="info-label">Titular:</span>
                <span className="info-value">{centroCargado.titular}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Ubicación:</span>
                <span className="info-value">{centroCargado.ubicacion}</span>
              </div>
              <div className="info-item">
                <span className="info-label">ACS:</span>
                <span className="info-value">{centroCargado.acs}</span>
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="tipo_inspeccion">Tipo de Inspección</label>
            <select
              id="tipo_inspeccion"
              name="tipo_inspeccion"
              value={formData.tipo_inspeccion}
              onChange={handleChange}
              required
              disabled={cargandoTipos || tiposInspeccion.length === 0}
            >
              <option value="">Seleccione un tipo</option>
              {tiposInspeccion.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nombre}
                </option>
              ))}
            </select>
            {cargandoTipos && <div className="loading-indicator">Cargando tipos de inspección...</div>}
            {errorTipos && <div className="error-indicator">{errorTipos}</div>}
            {!cargandoTipos && tiposInspeccion.length === 0 && !errorTipos && (
              <div className="error-indicator">No hay tipos de inspección disponibles</div>
            )}
          </div>
        </div>

        <div className="form-section">
          <h2>Responsable del Centro</h2>
          
          <div className="form-group">
            <label htmlFor="responsable_nombre">Nombre Completo</label>
            <input
              type="text"
              id="responsable_nombre"
              name="responsable_nombre"
              value={formData.responsable_nombre}
              onChange={handleChange}
              placeholder="Nombre del responsable"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="responsable_rut">RUT</label>
            <input
              type="text"
              id="responsable_rut"
              name="responsable_rut"
              value={formData.responsable_rut}
              onChange={handleChange}
              placeholder="Ej: 12.345.678-9"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="responsable_cargo">Cargo</label>
            <input
              type="text"
              id="responsable_cargo"
              name="responsable_cargo"
              value={formData.responsable_cargo}
              onChange={handleChange}
              placeholder="Cargo del responsable"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="responsable_telefono">Teléfono de Contacto</label>
            <input
              type="tel"
              id="responsable_telefono"
              name="responsable_telefono"
              value={formData.responsable_telefono}
              onChange={handleChange}
              placeholder="Ej: +56 9 1234 5678"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="responsable_email">Correo Electrónico</label>
            <input
              type="email"
              id="responsable_email"
              name="responsable_email"
              value={formData.responsable_email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Fiscalizadores</h2>
          
          {errorFiscalizadores && <div className="error-message">{errorFiscalizadores}</div>}
          
          <div className="fiscalizador-container">
            <h3>Fiscalizador Principal</h3>
            <div className="form-group">
              <label htmlFor="fiscalizador_1_id">Seleccione Fiscalizador</label>
              <select
                id="fiscalizador_1_id"
                name="fiscalizador_1_id"
                value={formData.fiscalizador_1_id}
                onChange={handleChange}
                required
                disabled={cargandoFuncionarios || funcionarios.length === 0}
              >
                <option value="">Seleccione un fiscalizador</option>
                {funcionarios.map((funcionario) => (
                  <option key={funcionario.id} value={funcionario.id}>
                    {funcionario.nombre} - {funcionario.rut}
                  </option>
                ))}
              </select>
              {cargandoFuncionarios && <div className="loading-indicator">Cargando funcionarios...</div>}
              {errorFuncionarios && <div className="error-indicator">{errorFuncionarios}</div>}
            </div>
            
            {formData.fiscalizador_1_id && (
              <div className="funcionario-info">
                <p>Fiscalizador seleccionado: <strong>{getFuncionarioNombre(formData.fiscalizador_1_id)}</strong></p>
              </div>
            )}
          </div>

          <div className="fiscalizador-container">
            <h3>Fiscalizador Secundario (opcional)</h3>
            <div className="form-group">
              <label htmlFor="fiscalizador_2_id">Seleccione Fiscalizador</label>
              <select
                id="fiscalizador_2_id"
                name="fiscalizador_2_id"
                value={formData.fiscalizador_2_id}
                onChange={handleChange}
                disabled={cargandoFuncionarios || funcionarios.length === 0}
              >
                <option value="">Seleccione un fiscalizador</option>
                {funcionarios.map((funcionario) => (
                  <option 
                    key={funcionario.id} 
                    value={funcionario.id}
                    disabled={formData.fiscalizador_1_id === funcionario.id.toString()}
                  >
                    {funcionario.nombre} - {funcionario.rut}
                  </option>
                ))}
              </select>
            </div>
            
            {formData.fiscalizador_2_id && (
              <div className="funcionario-info">
                <p>Fiscalizador seleccionado: <strong>{getFuncionarioNombre(formData.fiscalizador_2_id)}</strong></p>
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <h2>Observaciones</h2>
          
          <div className="form-group">
            <label htmlFor="observaciones">Observaciones</label>
            <textarea
              id="observaciones"
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              rows="6"
              className="observaciones-textarea"
              placeholder="Ingrese observaciones o detalles adicionales"
              style={{ width: "100%" }}
            ></textarea>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancelar" onClick={handleCancel}>
            Cancelar
          </button>
          <button 
            type="submit" 
            className="btn-guardar" 
            disabled={!centroCargado || tiposInspeccion.length === 0}
          >
            Guardar Inspección
          </button>
        </div>
      </form>

      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-dialog">
            <h2>Confirmar Registro</h2>
            <p>¿Está seguro que desea registrar esta inspección?</p>
            <div className="confirmation-actions">
              <button 
                className="btn-cancelar" 
                onClick={() => setShowConfirmation(false)}
              >
                Cancelar
              </button>
              <button 
                className="btn-confirmar" 
                onClick={handleConfirm}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IngresarInspeccion; 