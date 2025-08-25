import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const fallbackRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (error: any) {
            setError(error.response?.data?.error || 'Failed to login');
        }
    };

    const handleImageError = () => {
        if (fallbackRef.current) {
            fallbackRef.current.style.display = 'block';
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Login Form */}
            <div className="flex-1 flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full">
                    <div className="bg-white rounded-3xl shadow-lg p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                Sign in
                            </h2>
                            <p className="text-gray-500 italic">
                                Welcome to citygreens
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-green-50 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        placeholder="email@address.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl bg-green-50 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <svg className="h-5 w-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {showPassword ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            )}
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password Link */}
                            <div className="text-right">
                                <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-500 underline">
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                            >
                                Log in
                            </button>

                            {/* Remember Me Toggle */}
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    onClick={() => setRememberMe(!rememberMe)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        rememberMe ? 'bg-green-600' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            rememberMe ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                                <span className="ml-3 text-sm text-gray-700">Remember me</span>
                            </div>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or</span>
                                </div>
                            </div>

                            {/* Register Link */}
                            <div className="text-center">
                                <span className="text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <Link to="/register" className="font-medium text-green-600 hover:text-green-500 underline">
                                        Register
                                    </Link>
                                </span>
                            </div>

                            {/* Second Forgot Password Link */}
                            <div className="text-center">
                                <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-500 underline">
                                    Forgot your password?
                                </Link>
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
                            src="/plant-image.jpg" 
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
                    <h3 className="text-4xl font-semibold text-gray-800 mb-2">City Greens</h3>
                    <p className="text-gray-600">Monitor and control your farm with precision</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
