import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      {/* KPI Cards */}
      <div className="dashboard-cards">
        <div className="kpi-card blue">
          <div className="kpi-content">
            <div className="kpi-info">
              <h3>Total Inspecciones</h3>
              <div className="kpi-value">1,248</div>
              <div className="kpi-trend positive">+12% desde el mes pasado</div>
            </div>
            <div className="kpi-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM3 13.5h18v-2.25H3v2.25z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="kpi-card yellow">
          <div className="kpi-content">
            <div className="kpi-info">
              <h3>Centros Activos</h3>
              <div className="kpi-value">42</div>
              <div className="kpi-trend">+3 nuevos este mes</div>
            </div>
            <div className="kpi-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
                <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clipRule="evenodd" />
                <path d="M12 7.875a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="kpi-card green">
          <div className="kpi-content">
            <div className="kpi-info">
              <h3>Fiscalizadores</h3>
              <div className="kpi-value">28</div>
              <div className="kpi-trend">2 en capacitación</div>
            </div>
            <div className="kpi-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="kpi-card purple">
          <div className="kpi-content">
            <div className="kpi-info">
              <h3>Inspecciones Pendientes</h3>
              <div className="kpi-value">18</div>
              <div className="kpi-trend">5 programadas para hoy</div>
            </div>
            <div className="kpi-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <div className="tabs-header">
          <button className="tab-btn active">Inspecciones Recientes</button>
          <button className="tab-btn">Centros Destacados</button>
          <button className="tab-btn">Funcionarios Activos</button>
          <div className="tab-actions">
            <button className="action-btn">Ver todos</button>
          </div>
        </div>
        
        <div className="tab-content">
          <div className="inspections-list">
            <h2>Inspecciones Recientes</h2>
            <p className="subtitle">Últimas inspecciones registradas en el sistema</p>
            
            <div className="inspection-item">
              <div className="inspection-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="inspection-details">
                <div className="inspection-title">Centro Operativo 1</div>
                <div className="inspection-subtitle">Inspección de Seguridad</div>
              </div>
              <div className="inspection-meta">
                <div className="meta-date">12/04/2025</div>
                <div className="meta-user">Carlos Martínez</div>
              </div>
            </div>
            
            <div className="inspection-item">
              <div className="inspection-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="inspection-details">
                <div className="inspection-title">Centro Operativo 2</div>
                <div className="inspection-subtitle">Inspección de Seguridad</div>
              </div>
              <div className="inspection-meta">
                <div className="meta-date">12/04/2025</div>
                <div className="meta-user">Carlos Martínez</div>
              </div>
            </div>
            
            <div className="inspection-item">
              <div className="inspection-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="inspection-details">
                <div className="inspection-title">Centro Operativo 3</div>
                <div className="inspection-subtitle">Inspección de Seguridad</div>
              </div>
              <div className="inspection-meta">
                <div className="meta-date">12/04/2025</div>
                <div className="meta-user">Carlos Martínez</div>
              </div>
            </div>
            
            <div className="inspection-item">
              <div className="inspection-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="inspection-details">
                <div className="inspection-title">Centro Operativo 4</div>
                <div className="inspection-subtitle">Inspección de Seguridad</div>
              </div>
              <div className="inspection-meta">
                <div className="meta-date">12/04/2025</div>
                <div className="meta-user">Carlos Martínez</div>
              </div>
            </div>
            
            <div className="inspection-item">
              <div className="inspection-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="inspection-details">
                <div className="inspection-title">Centro Operativo 5</div>
                <div className="inspection-subtitle">Inspección de Seguridad</div>
              </div>
              <div className="inspection-meta">
                <div className="meta-date">12/04/2025</div>
                <div className="meta-user">Carlos Martínez</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Widgets */}
      <div className="dashboard-charts">
        <div className="chart-container">
          <h2>Inspecciones por Tipo</h2>
          <p className="subtitle">Distribución de inspecciones según su tipo</p>
          <div className="chart-placeholder">
            <div className="placeholder-text">Gráfico de distribución</div>
          </div>
        </div>
        
        <div className="chart-container">
          <h2>Tendencia Mensual</h2>
          <p className="subtitle">Evolución de inspecciones en los últimos 12 meses</p>
          <div className="chart-placeholder">
            <div className="placeholder-text">Gráfico de tendencia</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 