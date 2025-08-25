import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ResetPassword: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const { resetPassword } = useAuth();
    const fallbackRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await resetPassword(token || '', password);
            setMessage('Password successfully reset');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error: any) {
            setError(error.response?.data?.error || 'Failed to reset password');
        }
    };

    const handleImageError = () => {
        if (fallbackRef.current) {
            fallbackRef.current.style.display = 'block';
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Reset Form */}
            <div className="flex-1 flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full">
                    <div className="bg-white rounded-3xl shadow-lg p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                Forgot password?
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Enter your email and we'll send you a link to reset your password.
                            </p>
                        </div>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="rounded-lg bg-red-50 p-4">
                                    <div className="text-sm text-red-700">{error}</div>
                                </div>
                            )}
                            {message && (
                                <div className="rounded-lg bg-green-50 p-4">
                                    <div className="text-sm text-green-700">{message}</div>
                                </div>
                            )}
                            {/* Email Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    New Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="block w-full px-3 py-3 border border-gray-300 rounded-xl bg-green-50 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="New Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm New Password
                                </label>
                                <input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="password"
                                    required
                                    className="block w-full px-3 py-3 border border-gray-300 rounded-xl bg-green-50 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Confirm New Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                            >
                                Reset Password
                            </button>
                            <div className="text-center mt-4">
                                <a href="/login" className="font-medium text-green-600 hover:text-green-500 underline">
                                    Go back to Sign In.
                                </a>
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
                                <p className="text-sm text-gray-600">Add your plant image to /public/plant-image3.webp</p>
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

export default ResetPassword;
