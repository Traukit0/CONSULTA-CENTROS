import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ collapsed, toggleCollapse }) {
  const [expandedMenus, setExpandedMenus] = useState({
    inspecciones: false,
    funcionarios: false,
    centros: false,
    responsables: false,
    estadisticas: false,
    configuraciones: false
  });

  const toggleMenu = (menu) => {
    setExpandedMenus({
      ...expandedMenus,
      [menu]: !expandedMenus[menu]
    });
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 5.25zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 6.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" />
            </svg>
          </div>
          {!collapsed && (
            <div className="logo-text">
              <h2>AcuiGestor</h2>
              <div className="logo-subtitle">Gestión de Inspecciones</div>
            </div>
          )}
        </div>
        <button className="collapse-btn" onClick={toggleCollapse}>
          {collapsed ? '>' : '<'}
        </button>
      </div>

      <div className="sidebar-content">
        <ul className="menu-list">
          {/* Dashboard */}
          <li className="menu-item">
            <Link to="/dashboard" className="menu-link">
              <span className="menu-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
              </span>
              {!collapsed && <span className="menu-text">Dashboard</span>}
            </Link>
          </li>

          {/* Inspecciones */}
          <li className="menu-item">
            <div 
              className={`menu-link ${expandedMenus.inspecciones ? 'active' : ''}`}
              onClick={() => toggleMenu('inspecciones')}
            >
              <span className="menu-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zm9.586 4.594a.75.75 0 00-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.116-.062l3-3.75z" clipRule="evenodd" />
                </svg>
              </span>
              {!collapsed && (
                <>
                  <span className="menu-text">Inspecciones</span>
                  <span className="submenu-toggle">
                    {expandedMenus.inspecciones ? '▼' : '▶'}
                  </span>
                </>
              )}
            </div>
            {!collapsed && expandedMenus.inspecciones && (
              <ul className="submenu">
                <li className="submenu-item">
                  <Link to="/ingresar-inspeccion">Ingresar inspección</Link>
                </li>
                <li className="submenu-item">
                  <a href="#modificar-inspeccion">Modificar inspección</a>
                </li>
                <li className="submenu-item">
                  <a href="#consultar-inspecciones">Consultar inspecciones</a>
                </li>
                <li className="submenu-item">
                  <a href="#resumen-centro">Resumen por centro</a>
                </li>
              </ul>
            )}
          </li>

          {/* Funcionarios */}
          <li className="menu-item">
            <div 
              className={`menu-link ${expandedMenus.funcionarios ? 'active' : ''}`}
              onClick={() => toggleMenu('funcionarios')}
            >
              <span className="menu-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
              </span>
              {!collapsed && (
                <>
                  <span className="menu-text">Funcionarios</span>
                  <span className="submenu-toggle">
                    {expandedMenus.funcionarios ? '▼' : '▶'}
                  </span>
                </>
              )}
            </div>
            {!collapsed && expandedMenus.funcionarios && (
              <ul className="submenu">
                <li className="submenu-item">
                  <a href="#ingresar-fiscalizador">Ingresar fiscalizador</a>
                </li>
                <li className="submenu-item">
                  <a href="#modificar-fiscalizador">Modificar fiscalizador</a>
                </li>
                <li className="submenu-item">
                  <a href="#listado-funcionarios">Listado de funcionarios</a>
                </li>
                <li className="submenu-item">
                  <a href="#inspecciones-funcionario">Inspecciones por funcionario</a>
                </li>
              </ul>
            )}
          </li>

          {/* Centros */}
          <li className="menu-item">
            <div 
              className={`menu-link ${expandedMenus.centros ? 'active' : ''}`}
              onClick={() => toggleMenu('centros')}
            >
              <span className="menu-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
                  <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clipRule="evenodd" />
                  <path d="M12 7.875a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
                </svg>
              </span>
              {!collapsed && (
                <>
                  <span className="menu-text">Centros</span>
                  <span className="submenu-toggle">
                    {expandedMenus.centros ? '▼' : '▶'}
                  </span>
                </>
              )}
            </div>
            {!collapsed && expandedMenus.centros && (
              <ul className="submenu">
                <li className="submenu-item">
                  <a href="#detalle-centro">Detalle del centro</a>
                </li>
              </ul>
            )}
          </li>

          {/* Responsables */}
          <li className="menu-item">
            <div 
              className={`menu-link ${expandedMenus.responsables ? 'active' : ''}`}
              onClick={() => toggleMenu('responsables')}
            >
              <span className="menu-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                  <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                </svg>
              </span>
              {!collapsed && (
                <>
                  <span className="menu-text">Responsables</span>
                  <span className="submenu-toggle">
                    {expandedMenus.responsables ? '▼' : '▶'}
                  </span>
                </>
              )}
            </div>
            {!collapsed && expandedMenus.responsables && (
              <ul className="submenu">
                <li className="submenu-item">
                  <a href="#listado-responsables">Listado de responsables</a>
                </li>
              </ul>
            )}
          </li>

          {/* Estadísticas */}
          <li className="menu-item">
            <div 
              className={`menu-link ${expandedMenus.estadisticas ? 'active' : ''}`}
              onClick={() => toggleMenu('estadisticas')}
            >
              <span className="menu-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zm3.75-1.5a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0V12zm2.25-3a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0V9.75A.75.75 0 0113.5 9zm3.75-1.5a.75.75 0 00-1.5 0v9a.75.75 0 001.5 0v-9z" clipRule="evenodd" />
                </svg>
              </span>
              {!collapsed && (
                <>
                  <span className="menu-text">Estadísticas</span>
                  <span className="submenu-toggle">
                    {expandedMenus.estadisticas ? '▼' : '▶'}
                  </span>
                </>
              )}
            </div>
            {!collapsed && expandedMenus.estadisticas && (
              <ul className="submenu">
                <li className="submenu-item">
                  <a href="#graficos-inspecciones">Gráficos de inspecciones</a>
                </li>
              </ul>
            )}
          </li>

          {/* Configuraciones */}
          <li className="menu-item">
            <div 
              className={`menu-link ${expandedMenus.configuraciones ? 'active' : ''}`}
              onClick={() => toggleMenu('configuraciones')}
            >
              <span className="menu-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
                </svg>
              </span>
              {!collapsed && (
                <>
                  <span className="menu-text">Configuraciones</span>
                  <span className="submenu-toggle">
                    {expandedMenus.configuraciones ? '▼' : '▶'}
                  </span>
                </>
              )}
            </div>
            {!collapsed && expandedMenus.configuraciones && (
              <ul className="submenu">
                <li className="submenu-item">
                  <a href="#tipos-inspeccion">Tipos de inspección</a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      <div className="sidebar-footer">
        {!collapsed && (
          <div className="user-info">
            <div className="user-avatar">MC</div>
            <div className="user-details">
              <div className="user-name">Manuel Cano</div>
              <div className="user-role">Administrador</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar; 