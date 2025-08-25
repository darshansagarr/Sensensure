

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import { widgetConfig } from './widgetConfig';
import StatCard from './StatCard';
import CircularGauge from './CircularGauge';
import Header from './Header';
import ToggleSwitch from './ToggleSwitch';
import LineChartWidget from './LineChartWidget';
// import CameraStatus from './CameraStatus';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [deviceData, setDeviceData] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (user?.device_id) {
      // Initial fetch
      apiService.getDeviceData(user.device_id).then(latestData => {
        setDeviceData(latestData);
        setChartData(prev => ([
          ...prev.slice(-19),
          {
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            temp_in: (latestData as any).temp_in,
            temp_out: (latestData as any).temp_out,
            rh_in: (latestData as any).rh_in,
            rh_out: (latestData as any).rh_out,
            rain_out: (latestData as any).rain_out,
            vpd_in: (latestData as any).vpd_in,
            vpd_out: (latestData as any).vpd_out,
            // ...add more as needed
          }
        ]));
      });
      // Poll every 10 seconds for new data
      interval = setInterval(() => {
        apiService.getDeviceData(user.device_id).then(latestData => {
          setDeviceData(latestData);
          setChartData(prev => ([
            ...prev.slice(-19),
            {
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              temp_in: (latestData as any).temp_in,
              temp_out: (latestData as any).temp_out,
              rh_in: (latestData as any).rh_in,
              rh_out: (latestData as any).rh_out,
              rain_out: (latestData as any).rain_out,
              vpd_in: (latestData as any).vpd_in,
              vpd_out: (latestData as any).vpd_out,
              // Add more variables as needed
            }
          ]));
        });
      }, 10000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [user?.device_id]);

  if (!deviceData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading device data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e0f2f1] p-4 md:p-8">
      <Header deviceId={user?.device_id} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-3">
        {/* Camera Status Widget
        <div className="lg:col-span-2">
          <CameraStatus />
        </div>
         */}
        {Object.entries(deviceData).map(([key, value]) => {
          if (key === 'device_id' || key === 'id' || value == null) return null;
          const config = widgetConfig[key as keyof typeof widgetConfig];
          if (config && !config.hidden) {
            if (config.type === 'StatCard' && (typeof value === 'number' || typeof value === 'string')) {
              return <StatCard key={key} title={config.title} value={value} unit={config.unit} />;
            }
            if (config.type === 'ToggleSwitch') {
              return (
                <ToggleSwitch
                  key={key}
                  label={config.title}
                  isOn={!!value}
                  onToggle={() => {/* handle toggle logic here */}}
                />
              );
            }
            if (config.type === 'CircularGauge' && typeof value === 'number') {
              return (
                <CircularGauge
                  key={key}
                  title={config.title}
                  value={value}
                  maxValue={100}
                  unit={config.unit}
                />
              );
            }
            return null;
          }
          // If config exists and is hidden, skip rendering
          if (config && config.hidden) return null;
          // Otherwise, render a default card for unknown fields
          return (
            <div key={key} className="bg-gray-100 rounded-lg p-4 shadow flex flex-col items-center">
              <div className="text-gray-700 text-sm font-semibold mb-2">{key}</div>
              <div className="text-2xl font-bold text-custom-green">{String(value)}</div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <LineChartWidget
          data={chartData}
          lines={[
            { key: 'temp_in', name: 'Temperature In (°C)', color: '#007bff' },
            { key: 'temp_out', name: 'Temperature Out (°C)', color: '#28a745' },
          ]}
          title="Temperature Chart"
        />

        <LineChartWidget
          data={chartData}
          lines={[
            { key: 'rh_in', name: 'Humidity In (%)', color: '#ff9800' },
            { key: 'rh_out', name: 'Humidity Out (%)', color: '#ff5733' },
          ]}
          title="Humidity Chart"
        />

        <LineChartWidget
          data={chartData}
          lines={[
            { key: 'rain_out', name: 'Rainfall', color: '#1B4965' }
          ]}
          title="Rain Chart"
        />

        <LineChartWidget
          data={chartData}
          lines={[
            { key: 'vpd_in', name: 'VPD In', color: '#8e44ad' },
            { key: 'vpd_out', name: 'VPD Out', color: '#16a085' },
          ]}
          title="VPD Chart"
        />
      </div>
    </div>
  );
};

export default Dashboard;