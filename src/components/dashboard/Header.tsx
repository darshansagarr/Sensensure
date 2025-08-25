
import React from 'react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  deviceId?: string;
}

const Header: React.FC<HeaderProps> = ({ deviceId }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login'; // Redirect to login page
  };

  const handleCamera = () => {
    window.location.href = '/farmcam'; // Navigate to farmcam page
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF] text-[#0077B6] shadow flex flex-col">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-2">
          <img
            src="/CGLogo.jpeg"
            alt="City Greens Logo"
            className="h-9 w-15 object-contain"
            />
          {/* <span className="font-bold text-lg">City Greens</span> */}
        </div>

        <div className="text-xl font-semibold ml-14 text-[#0077B6]">Dashboard</div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleCamera}
            className="hover:underline cursor-pointer bg-transparent border-none text-[#0077B6] flex items-center"
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
           <span className="mr-1">Camera</span>
          </button>
          <button
            onClick={handleLogout}
            className="hover:underline cursor-pointer bg-transparent border-none text-[#0077B6]"
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            Logout
          </button>
          <span>{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
      <div className="bg-[#5fa8d3] text-center py-1 text-sm text-white border-t border-white/30">
        Device id:- <span className="font-mono">{deviceId || 'N/A'}</span>
      </div>
    </header>
  );
};

export default Header;
