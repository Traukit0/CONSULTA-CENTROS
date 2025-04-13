import { useState } from 'react';
import Sidebar from './Sidebar';
import './Layout.css';

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="layout">
      <Sidebar collapsed={collapsed} toggleCollapse={() => setCollapsed(!collapsed)} />
      <div className={`content-area ${collapsed ? 'expanded' : ''}`}>
        <div className="header">
          <div className="header-content">
            <h1>Dashboard</h1>
            <div className="header-right">
              <span className="last-update">Última actualización: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="main-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout; 