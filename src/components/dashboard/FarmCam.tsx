import React, { useState } from 'react';

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

const FarmCam: React.FC = () => {
  const [rtspUrl, setRtspUrl] = useState('');
  const [submittedUrl, setSubmittedUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [imgKey, setImgKey] = useState(0); // For force-refresh
  const [backendStatus, setBackendStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');

  // Check backend connectivity on component mount
  React.useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/`);
      if (response.ok) {
        setBackendStatus('connected');
      } else {
        setBackendStatus('disconnected');
      }
    } catch (error) {
      setBackendStatus('disconnected');
      console.error('Backend connection failed:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (backendStatus !== 'connected') {
      setError('Backend server is not connected. Please check your server configuration.');
      return;
    }
    if (!rtspUrl.startsWith('rtsp://')) {
      setError('Please enter a valid RTSP URL.');
      return;
    }
    setError('');
    setLoading(true);
    setSubmittedUrl(rtspUrl);
    setImgKey(prev => prev + 1);
  };

  const handleImgLoad = () => {
    setLoading(false);
    setError('');
  };

  const handleImgError = () => {
    setLoading(false);
    setError('Failed to load stream. Please check the RTSP URL, camera connectivity, and backend logs.');
  };

  const getStreamUrl = () => {
    return `${BACKEND_BASE_URL}/camera/stream?url=${encodeURIComponent(submittedUrl)}`;
  };

  const getBackendStatusColor = () => {
    switch (backendStatus) {
      case 'connected': return 'bg-green-500';
      case 'disconnected': return 'bg-red-500';
      case 'checking': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getBackendStatusText = () => {
    switch (backendStatus) {
      case 'connected': return 'Connected';
      case 'disconnected': return 'Disconnected';
      case 'checking': return 'Checking...';
      default: return 'Unknown';
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <h2 className="text-2xl font-bold mb-6">Universal RTSP Camera Stream Viewer</h2>
      {/* Backend Status */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${getBackendStatusColor()}`}></div>
            <span className="font-medium">Backend Server: {getBackendStatusText()}</span>
          </div>
          <div className="text-sm text-gray-600">
            {BACKEND_BASE_URL}
          </div>
        </div>
        {backendStatus === 'disconnected' && (
          <div className="mt-2 text-red-600 text-sm">
            Cannot connect to backend server. Please check if the server is running and accessible.
          </div>
        )}
      </div>
      {/* RTSP URL Input */}
      <form onSubmit={handleSubmit} className="mb-6">
        <label className="block text-sm font-medium mb-2">RTSP URL:</label>
        <input
          type="text"
          value={rtspUrl}
          onChange={e => setRtspUrl(e.target.value)}
          placeholder="Enter RTSP URL (e.g. rtsp://user:pass@ip:554/stream1)"
          className="border px-3 py-2 rounded w-full mb-2"
        />
        <button
          type="submit"
          disabled={backendStatus !== 'connected'}
          className="bg-blue-600 text-white px-6 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700"
        >
          Start Stream
        </button>
      </form>
      {/* Status Messages */}
      {loading && <div className="text-blue-600 mb-4">Loading stream...</div>}
      {error && <div className="text-red-600 mb-4 p-3 bg-red-50 rounded">{error}</div>}
      {/* Stream Display */}
      {submittedUrl && !error && (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Streaming from:</h3>
            <div className="mb-4 p-3 bg-gray-100 rounded break-all text-sm">
              {submittedUrl}
            </div>
          </div>
          <div className="relative">
            <img
              key={imgKey}
              src={getStreamUrl()}
              alt="Camera Stream"
              className="w-full max-w-full border border-gray-300 rounded-lg shadow-lg"
              style={{ maxHeight: '600px', objectFit: 'contain' }}
              onLoad={handleImgLoad}
              onError={handleImgError}
            />
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                <div className="text-white text-lg">Loading stream...</div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Instructions */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Instructions:</h3>
        <ul className="text-sm space-y-1">
          <li>• Enter the RTSP URL of any compatible camera (e.g. Tapo, Hikvision, Dahua, etc.)</li>
          <li>• The backend will relay the stream using FFmpeg and serve it as MJPEG</li>
          <li>• Deploy the backend to a cloud server (e.g. GCP) for global access</li>
          <li>• Ensure your camera is accessible from the cloud server (public IP, DDNS, or VPN)</li>
          <li>• For best results, use a static IP or DDNS for your camera</li>
        </ul>
      </div>
    </div>
  );
};

export default FarmCam; 