import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ChefHat, Users, BarChart3, Shield, Zap, Star, CheckCircle } from 'lucide-react';

function Home() {
    const [activeTab, setActiveTab] = useState('about');

    const subscriptionPlans = [
        {
            name: 'Basic',
            price: '₹999',
            period: 'month',
            features: [
                'Up to 50 orders/month',
                'Basic menu management',
                'Order notifications',
                'Email support',
                'Basic reports'
            ],
            popular: false
        },
        {
            name: 'Standard',
            price: '₹1,999',
            period: 'month',
            features: [
                'Up to 200 orders/month',
                'Advanced menu management',
                'Kitchen staff panel',
                'Real-time notifications',
                'Advanced reports',
                'Priority support'
            ],
            popular: true
        },
        {
            name: 'Premium',
            price: '₹3,999',
            period: 'month',
            features: [
                'Unlimited orders',
                'Full menu management',
                'Multi-staff access',
                'Real-time analytics',
                'Custom branding',
                '24/7 support',
                'API access'
            ],
            popular: false
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">HungryScan</h1>
                        </div>
                        <nav className="hidden md:flex space-x-8">
                            <button
                                onClick={() => setActiveTab('about')}
                                className={`text-sm font-medium transition-colors ${activeTab === 'about' ? 'text-green-600' : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                About
                            </button>
                            <button
                                onClick={() => setActiveTab('plans')}
                                className={`text-sm font-medium transition-colors ${activeTab === 'plans' ? 'text-green-600' : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                Plans
                            </button>
                            <Link
                                to="/admin/login"
                                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                Admin Login
                            </Link>
                            <Link
                                to="/kitchen/login"
                                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                Kitchen Login
                            </Link>
                        </nav>
                        <div className="flex space-x-4">
                            <Link
                                to="/admin/login"
                                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/admin/register"
                                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                            >
                                Register Hotel
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {activeTab === 'about' && (
                    <div className="space-y-16">
                        {/* Hero Section */}
                        <div className="text-center space-y-6">
                            <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
                                Transform Your Restaurant with
                                <span className="text-green-600"> QR Ordering</span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                HungryScan revolutionizes dine-in experiences with contactless QR-based ordering.
                                Streamline operations, reduce wait times, and boost customer satisfaction.
                            </p>
                            <div className="flex justify-center space-x-4">
                                <Link
                                    to="/admin/register"
                                    className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition-colors"
                                >
                                    Get Started Free
                                </Link>
                                <button
                                    onClick={() => setActiveTab('plans')}
                                    className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors"
                                >
                                    View Plans
                                </button>
                            </div>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                    <Zap className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Orders</h3>
                                <p className="text-gray-600">
                                    Customers scan QR codes and place orders instantly. No more waiting for servers or paper menus.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-sm border">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <BarChart3 className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Real-time Analytics</h3>
                                <p className="text-gray-600">
                                    Track sales, popular dishes, and customer preferences with detailed analytics and reports.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-sm border">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                    <Shield className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Reliable</h3>
                                <p className="text-gray-600">
                                    Enterprise-grade security with 99.9% uptime. Your data and orders are always protected.
                                </p>
                            </div>
                        </div>

                        {/* How It Works */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">How It Works</h3>
                            <div className="grid md:grid-cols-4 gap-8">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold text-green-600">1</span>
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Setup QR Codes</h4>
                                    <p className="text-sm text-gray-600">Generate unique QR codes for each table</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold text-blue-600">2</span>
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Customers Order</h4>
                                    <p className="text-sm text-gray-600">Scan QR, browse menu, and place orders</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold text-purple-600">3</span>
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Kitchen Prepares</h4>
                                    <p className="text-sm text-gray-600">Staff receives orders and prepares food</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold text-orange-600">4</span>
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Serve & Enjoy</h4>
                                    <p className="text-sm text-gray-600">Food is served and customers enjoy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'plans' && (
                    <div className="space-y-12">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
                            <p className="text-lg text-gray-600">Start with our free trial, then choose the plan that fits your restaurant</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {subscriptionPlans.map((plan, index) => (
                                <div
                                    key={index}
                                    className={`bg-white rounded-2xl shadow-sm border p-8 relative ${plan.popular ? 'ring-2 ring-green-500' : ''
                                        }`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                            <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                                Most Popular
                                            </span>
                                        </div>
                                    )}

                                    <div className="text-center mb-8">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                        <div className="mb-4">
                                            <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                            <span className="text-gray-600">/{plan.period}</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-4 mb-8">
                                        {plan.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center">
                                                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        to="/admin/register"
                                        className={`w-full py-3 px-6 rounded-lg font-medium text-center transition-colors ${plan.popular
                                                ? 'bg-green-600 text-white hover:bg-green-700'
                                                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                            }`}
                                    >
                                        {plan.popular ? 'Get Started' : 'Choose Plan'}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                                    <Building2 className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold">HungryScan</span>
                            </div>
                            <p className="text-gray-400">
                                Revolutionizing restaurant ordering with QR technology.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 HungryScan. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
