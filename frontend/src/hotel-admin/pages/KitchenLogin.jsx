import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ChefHat, AlertCircle } from 'lucide-react';

function KitchenLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/kitchen-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Store authentication data
            localStorage.setItem('kitchenToken', data.token);
            localStorage.setItem('kitchenEmail', data.user.email);
            localStorage.setItem('kitchenRole', data.user.role);
            localStorage.setItem('kitchenId', data.user.id);
            localStorage.setItem('hotelId', data.user.hotelId);
            localStorage.setItem('hotelName', data.user.hotelName);

            navigate('/kitchen/dashboard');
        } catch (error) {
            setError(error.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-100 to-yellow-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-3xl flex items-center justify-center shadow-lg shadow-amber-200/50">
                            <ChefHat className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-amber-900 mb-2 font-['Poppins',sans-serif]">
                        HungryScan
                    </h1>
                    <h2 className="text-2xl font-semibold text-amber-800 mb-2 font-['Poppins',sans-serif]">
                        Kitchen Staff Login
                    </h2>
                    <p className="text-amber-700/80 font-medium">
                        Access your kitchen dashboard to manage orders
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                <span className="text-sm text-red-700">{error}</span>
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Signing in...</span>
                                </div>
                            ) : (
                                'Sign in to Kitchen'
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Need help?{' '}
                        <Link
                            to="/admin/login"
                            className="font-medium text-orange-600 hover:text-orange-500"
                        >
                            Contact admin
                        </Link>
                    </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials</h4>
                    <p className="text-xs text-blue-700">
                        Email: <span className="font-mono">chef@demo.com</span><br />
                        Password: <span className="font-mono">demo123</span>
                    </p>
                </div>

                <div className="text-center">
                    <Link
                        to="/admin/login"
                        className="text-sm text-gray-500 hover:text-gray-700"
                    >
                        ← Back to Admin Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default KitchenLogin;
