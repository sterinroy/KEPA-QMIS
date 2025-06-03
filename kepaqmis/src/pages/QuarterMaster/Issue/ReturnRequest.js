// src/components/issue/ReturnRequest.js
import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const SIDEBAR_WIDTH = 240;

const ReturnRequest = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar activeItem="return" />
      <div style={{ flexGrow: 1, marginLeft: SIDEBAR_WIDTH }}>
        <Topbar />
        <main
          style={{
            padding: '80px 20px 20px',
            backgroundColor: '#f5f5f5',
            minHeight: '100vh',
          }}
        >
          <h2>Return Request</h2>
          <p>Return Request content goes here.</p>
        </main>
      </div>
    </div>
  );
};

export default ReturnRequest;
