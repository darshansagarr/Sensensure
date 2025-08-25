import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [device_id, setDeviceId] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();
    const fallbackRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!device_id) {
                setError('Device ID is required');
                return;
            }
            await register(email, password, device_id);
            navigate('/dashboard');
        } catch (error: any) {
            setError(error.response?.data?.error || 'Failed to register');
            console.error('Registration error:', error);
        }
    };

    const handleImageError = () => {
        if (fallbackRef.current) {
            fallbackRef.current.style.display = 'block';
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Register Form */}
            <div className="flex-1 flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full">
                    <div className="bg-white rounded-3xl shadow-lg p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                Create Your Account
                            </h2>
                        </div>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="rounded-lg bg-red-50 p-4">
                                    <div className="text-sm text-red-700">{error}</div>
                                </div>
                            )}
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    className="block w-full px-3 py-3 border border-gray-300 rounded-xl bg-green-50 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="email@address.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="block w-full pr-12 px-3 py-3 border border-gray-300 rounded-xl bg-green-50 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {showPassword ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            )}
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            {/* Device ID Field */}
                            <div>
                                <label htmlFor="device_id" className="block text-sm font-medium text-gray-700 mb-1">
                                    Device ID
                                </label>
                                <p className="text-xs text-gray-500 mb-2">
                                    Register by <span className="text-green-700 font-semibold">entering</span> your device ID, which provided by Citygreens.
                                </p>
                                <input
                                    id="device_id"
                                    type="text"
                                    required
                                    className="block w-full px-3 py-3 border border-gray-300 rounded-xl bg-green-50 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Device ID"
                                    value={device_id}
                                    onChange={(e) => setDeviceId(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                            >
                                Create Account
                            </button>
                            <div className="text-center mt-4">
                                <span className="text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <a href="/login" className="font-medium text-green-600 hover:text-green-500 underline">
                                        Log in here
                                    </a>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Right Side - Plant Image */}
            <div className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center">
                <div className="text-center">
                    <div className="w-64 h-64 mx-auto mb-6 relative overflow-hidden">
                        <img 
                            src="/plant-image3.webp" 
                            alt="Smart Farming Plant" 
                            className="w-full h-full object-cover rounded-2xl shadow-lg"
                            onError={handleImageError}
                        />
                        {/* Fallback placeholder */}
                        <div 
                            ref={fallbackRef}
                            className="absolute inset-0 bg-green-100 rounded-2xl shadow-lg flex items-center justify-center" 
                            style={{display: 'none'}}
                        >
                            <div className="text-center">
                                <svg className="w-32 h-32 text-green-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 200 200">
                                    {/* Plant stem */}
                                    <path d="M100 180 L100 120 Q100 100 90 80 Q80 60 100 40 Q120 60 110 80 Q100 100 100 120 Z" fill="#22c55e"/>
                                    {/* Leaves */}
                                    <ellipse cx="85" cy="100" rx="15" ry="8" fill="#16a34a" transform="rotate(-20 85 100)"/>
                                    <ellipse cx="115" cy="90" rx="12" ry="6" fill="#16a34a" transform="rotate(15 115 90)"/>
                                    <ellipse cx="95" cy="70" rx="10" ry="5" fill="#16a34a" transform="rotate(-10 95 70)"/>
                                    <ellipse cx="105" cy="60" rx="8" ry="4" fill="#16a34a" transform="rotate(25 105 60)"/>
                                    {/* Soil */}
                                    <ellipse cx="100" cy="190" rx="40" ry="10" fill="#92400e"/>
                                </svg>
                                <p className="text-sm text-gray-600">Add your plant image to /public/plant-image.jpg</p>
                            </div>
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Farming</h3>
                    <p className="text-gray-600">Monitor and control your farm with precision</p>
                </div>
            </div>
        </div>
    );
};

export default Register;