import React from 'react';
import Sidebar from './Sidebar'; // Or a shared Sidebar
import Topbar from './Topbar';
import IssueForm from './IssueForm';

const SIDEBAR_WIDTH = 240;

const IssueDashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar activeItem="issue" onNavigate={() => {}} />
      <div style={{ flexGrow: 1, marginLeft: SIDEBAR_WIDTH }}>
        <Topbar />
        <main style={{ padding: '80px 20px 20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
          <IssueForm />
        </main>
      </div>
    </div>
  );
};

export default IssueDashboard;
