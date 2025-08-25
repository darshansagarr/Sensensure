import { useEffect, useState } from 'react';
import { io as socketIO } from 'socket.io-client';
import type { Socket } from 'socket.io-client';
import { SensorData, ToggleDeviceData } from '../types';
import { useAuth } from '../context/AuthContext';

// Use environment variable or fallback to port 5001
const SOCKET_SERVER_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    
    // Initialize socket connection with device_id and auth token
    const socketInstance = socketIO(SOCKET_SERVER_URL, {
      query: { device_id: user.device_id },
      auth: { token: localStorage.getItem('token') }
    });
    
    socketInstance.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });
    
    socketInstance.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });
    
    socketInstance.on('sensor-data', (data: SensorData) => {
      console.log('Received sensor data:', data);
      setSensorData(data);
    });
    
    setSocket(socketInstance);
    
    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);
  
  // Function to toggle device status
  const toggleDevice = (deviceData: ToggleDeviceData) => {
    if (socket) {
      socket.emit('toggle-device', deviceData);
    }
  };
  
  return { socket, isConnected, sensorData, toggleDevice };
}; 