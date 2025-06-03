import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const SIDEBAR_WIDTH = 240;

const StockDetails = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar activeItem="stock" />
      <div style={{ flexGrow: 1, marginLeft: SIDEBAR_WIDTH }}>
        <Topbar />
        <main
          style={{
            padding: '80px 20px 20px',
            backgroundColor: '#f5f5f5',
            minHeight: '100vh',
          }}
        >
          <h2>Stock Details</h2>
          <p>Display your stock details content here.</p>
        </main>
      </div>
    </div>
  );
};

export default StockDetails;
