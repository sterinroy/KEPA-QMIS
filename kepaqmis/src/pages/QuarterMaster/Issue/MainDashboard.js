import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const SIDEBAR_WIDTH = 240;

const MainDashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar activeItem="dashboard" onNavigate={() => {}} />
      <div style={{ flexGrow: 1, marginLeft: SIDEBAR_WIDTH }}>
        <Topbar />
        <main style={{ padding: '80px 20px 20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
          <h1>Dashboard Content Goes Here</h1>
        </main>
      </div>
    </div>
  );
};

export default MainDashboard;
