import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    BarChart3,
    Users,
    ShoppingBag,
    TrendingUp,
    Clock,
    CheckCircle,
    Plus,
    Bell,
    Settings,
    LogOut,
    Building2,
    DollarSign,
    FolderOpen
} from 'lucide-react';

function Dashboard() {
    const [stats, setStats] = useState({
        totalOrders: 0,
        monthlyRevenue: 0,
        activeOrders: 0,
        totalCustomers: 0
    });

    const [recentOrders, setRecentOrders] = useState([]);
    const [popularDishes, setPopularDishes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadDashboardData = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock data
            setStats({
                totalOrders: 1247,
                monthlyRevenue: 45600,
                activeOrders: 8,
                totalCustomers: 342
            });

            setRecentOrders([
                {
                    id: 'ORD-001',
                    tableNumber: 5,
                    items: ['Butter Chicken', 'Naan', 'Rice'],
                    total: 450,
                    status: 'preparing',
                    time: '2 min ago'
                },
                {
                    id: 'ORD-002',
                    tableNumber: 12,
                    items: ['Chicken Biryani', 'Raita'],
                    total: 380,
                    status: 'ready',
                    time: '5 min ago'
                }
            ]);

            setPopularDishes([
                { name: 'Butter Chicken', orders: 45, revenue: 20250 },
                { name: 'Chicken Biryani', orders: 38, revenue: 14440 },
                { name: 'Paneer Tikka', orders: 32, revenue: 9600 }
            ]);

            setIsLoading(false);
        };

        loadDashboardData();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'preparing': return 'bg-blue-100 text-blue-800';
            case 'ready': return 'bg-green-100 text-green-800';
            case 'completed': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'ready':
            case 'completed':
                return <CheckCircle className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminEmail');
        localStorage.removeItem('adminRole');
        window.location.href = '/admin/login';
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">HungryScan Admin</h1>
                                <p className="text-sm text-gray-600">Dashboard</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                <Bell className="w-6 h-6" />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                <Settings className="w-6 h-6" />
                            </button>
                            <button
                                onClick={handleLogout}
                                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            >
                                <LogOut className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Orders */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <ShoppingBag className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    {/* Revenue */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                                <p className="text-2xl font-bold text-gray-900">₹{stats.monthlyRevenue.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    {/* Active Orders */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Active Orders</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.activeOrders}</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </div>

                    {/* Customers */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Orders */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border">
                            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                                <Link to="/admin/orders" className="text-sm text-green-600 hover:text-green-700 font-medium">
                                    View all
                                </Link>
                            </div>
                            <div className="p-6 space-y-4">
                                {recentOrders.map((order) => (
                                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                <span className="text-sm font-bold text-green-600">#{order.tableNumber}</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{order.id}</p>
                                                <p className="text-sm text-gray-600">
                                                    {order.items.slice(0, 2).join(', ')}
                                                    {order.items.length > 2 && ` +${order.items.length - 2} more`}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="font-semibold text-gray-900">₹{order.total}</span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                <div className="flex items-center space-x-1">
                                                    {getStatusIcon(order.status)}
                                                    <span className="capitalize">{order.status}</span>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions & Popular Dishes */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <Link to="/admin/menu/add" className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                    <Plus className="w-5 h-5 text-green-600" />
                                    <span className="font-medium text-green-700">Add Menu Item</span>
                                </Link>
                                <Link to="/admin/menu" className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                                    <FolderOpen className="w-5 h-5 text-orange-600" />
                                    <span className="font-medium text-orange-700">Manage Categories</span>
                                </Link>
                                <Link to="/admin/orders" className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                                    <span className="font-medium text-blue-700">View Orders</span>
                                </Link>
                                <Link to="/admin/reports" className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                                    <BarChart3 className="w-5 h-5 text-purple-600" />
                                    <span className="font-medium text-purple-700">Generate Reports</span>
                                </Link>
                            </div>
                        </div>

                        {/* Popular Dishes */}
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Dishes</h3>
                            <div className="space-y-4">
                                {popularDishes.map((dish, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900">{dish.name}</p>
                                            <p className="text-sm text-gray-600">{dish.orders} orders</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-900">₹{dish.revenue.toLocaleString()}</p>
                                            <p className="text-xs text-gray-500">Revenue</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
