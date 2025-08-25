import React from 'react';
import Dashboard from './Dashboard';
import FarmCam from './FarmCam';

const AppRouter: React.FC = () => {
  if (window.location.pathname === '/farmcam') {
    return <FarmCam />;
  }
  return <Dashboard />;
};

export default AppRouter; 