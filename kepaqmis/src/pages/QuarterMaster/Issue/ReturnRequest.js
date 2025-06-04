// src/components/issue/ReturnRequest.js
import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './Issue.css';

const SIDEBAR_WIDTH = 240;

const ReturnRequest = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar activeItem="return" />
      <div style={{ flexGrow: 1, marginLeft: SIDEBAR_WIDTH }}>
        <Topbar />
        <main
          className="return-request-container"
          style={{
            padding: '80px 20px 20px',
            backgroundColor: '#0C1227',
            minHeight: '100vh',
          }}
        >
          <h2>Return Requests</h2>
        </main>
      </div>
    </div>
  );
};

export default ReturnRequest;
