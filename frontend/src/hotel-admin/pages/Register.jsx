import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Building2, AlertCircle, CheckCircle, Upload, Crown } from 'lucide-react';

function Register() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Hotel Details
        hotelName: '',
        hotelType: '',
        cuisine: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
        email: '',

        // Admin Details
        adminName: '',
        adminEmail: '',
        adminPhone: '',
        password: '',
        confirmPassword: '',

        // Business Details
        gstNumber: '',
        panNumber: '',
        businessType: '',
        seatingCapacity: '',

        // Subscription
        subscriptionPlan: 'basic'
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [logoFile, setLogoFile] = useState(null);

    const subscriptionPlans = [
        {
            id: 'basic',
            name: 'Basic',
            price: '₹999',
            period: 'month',
            features: ['Up to 50 orders/month', 'Basic menu management', 'Email support']
        },
        {
            id: 'standard',
            name: 'Standard',
            price: '₹1,999',
            period: 'month',
            features: ['Up to 200 orders/month', 'Kitchen staff panel', 'Priority support']
        },
        {
            id: 'premium',
            name: 'Premium',
            price: '₹3,999',
            period: 'month',
            features: ['Unlimited orders', 'Multi-staff access', '24/7 support']
        }
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setLogoFile(file);
        }
    };

    const validateStep = (currentStep) => {
        switch (currentStep) {
            case 1:
                if (!formData.hotelName || !formData.hotelType || !formData.address || !formData.city || !formData.phone) {
                    setError('Please fill in all required fields');
                    return false;
                }
                break;
            case 2:
                if (!formData.adminName || !formData.adminEmail || !formData.password || !formData.confirmPassword) {
                    setError('Please fill in all required fields');
                    return false;
                }
                if (formData.password !== formData.confirmPassword) {
                    setError('Passwords do not match');
                    return false;
                }
                if (formData.password.length < 6) {
                    setError('Password must be at least 6 characters long');
                    return false;
                }
                break;
        }
        return true;
    };

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(step + 1);
            setError('');
        }
    };

    const prevStep = () => {
        setStep(step - 1);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    hotelName: formData.hotelName,
                    hotelType: formData.hotelType,
                    cuisine: formData.cuisine,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    pincode: formData.pincode,
                    phone: formData.phone,
                    email: formData.email,
                    adminName: formData.adminName,
                    adminEmail: formData.adminEmail,
                    adminPhone: formData.adminPhone,
                    password: formData.password,
                    subscriptionPlan: formData.subscriptionPlan,
                    gstNumber: formData.gstNumber,
                    panNumber: formData.panNumber,
                    businessType: formData.businessType,
                    seatingCapacity: formData.seatingCapacity
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            // Store authentication data
            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminEmail', data.user.email);
            localStorage.setItem('adminRole', data.user.role);
            localStorage.setItem('adminId', data.user.id);
            localStorage.setItem('hotelId', data.user.hotelId);

            navigate('/admin/dashboard');
        } catch (error) {
            setError(error.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const renderStep1 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-amber-900 font-['Poppins',sans-serif]">Hotel Information</h3>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-amber-800 mb-3 font-['Poppins',sans-serif]">
                        Hotel Name *
                    </label>
                    <input
                        type="text"
                        name="hotelName"
                        value={formData.hotelName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-amber-200/50 rounded-2xl focus:ring-4 focus:ring-amber-200/30 focus:border-amber-400 transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-amber-600/60 font-medium text-amber-900"
                        placeholder="Enter hotel name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-amber-800 mb-3 font-['Poppins',sans-serif]">
                        Hotel Type *
                    </label>
                    <select
                        name="hotelType"
                        value={formData.hotelType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-amber-200/50 rounded-2xl focus:ring-4 focus:ring-amber-200/30 focus:border-amber-400 transition-all duration-300 bg-white/80 backdrop-blur-sm font-medium text-amber-900"
                    >
                        <option value="">Select hotel type</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="cafe">Café</option>
                        <option value="bar">Bar & Lounge</option>
                        <option value="fast-food">Fast Food</option>
                        <option value="fine-dining">Fine Dining</option>
                        <option value="casual-dining">Casual Dining</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-amber-800 mb-3 font-['Poppins',sans-serif]">
                        Cuisine Type
                    </label>
                    <input
                        type="text"
                        name="cuisine"
                        value={formData.cuisine}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-amber-200/50 rounded-2xl focus:ring-4 focus:ring-amber-200/30 focus:border-amber-400 transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-amber-600/60 font-medium text-amber-900"
                        placeholder="e.g., Indian, Chinese, Italian"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-amber-800 mb-3 font-['Poppins',sans-serif]">
                        Phone Number *
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-amber-200/50 rounded-2xl focus:ring-4 focus:ring-amber-200/30 focus:border-amber-400 transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-amber-600/60 font-medium text-amber-900"
                        placeholder="Enter phone number"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-amber-800 mb-3 font-['Poppins',sans-serif]">
                    Address *
                </label>
                <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-amber-200/50 rounded-2xl focus:ring-4 focus:ring-amber-200/30 focus:border-amber-400 transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-amber-600/60 font-medium text-amber-900"
                    placeholder="Enter complete address"
                />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-amber-800 mb-3 font-['Poppins',sans-serif]">
                        City *
                    </label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-amber-200/50 rounded-2xl focus:ring-4 focus:ring-amber-200/30 focus:border-amber-400 transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-amber-600/60 font-medium text-amber-900"
                        placeholder="Enter city"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-amber-800 mb-3 font-['Poppins',sans-serif]">
                        State
                    </label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-amber-200/50 rounded-2xl focus:ring-4 focus:ring-amber-200/30 focus:border-amber-400 transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-amber-600/60 font-medium text-amber-900"
                        placeholder="Enter state"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-amber-800 mb-3 font-['Poppins',sans-serif]">
                        Pincode
                    </label>
                    <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-amber-200/50 rounded-2xl focus:ring-4 focus:ring-amber-200/30 focus:border-amber-400 transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-amber-600/60 font-medium text-amber-900"
                        placeholder="Enter pincode"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-amber-800 mb-3 font-['Poppins',sans-serif]">
                    Hotel Logo
                </label>
                <div className="border-2 border-dashed border-amber-300/50 rounded-2xl p-8 text-center bg-gradient-to-br from-amber-50/50 to-yellow-50/50 hover:from-amber-100/50 hover:to-yellow-100/50 transition-all duration-300">
                    <Upload className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="logo-upload"
                    />
                    <label htmlFor="logo-upload" className="cursor-pointer">
                        <span className="text-amber-700 hover:text-amber-800 font-semibold">Upload logo</span>
                        <span className="text-amber-600/80"> or drag and drop</span>
                    </label>
                    <p className="text-xs text-amber-600/70 mt-2">PNG, JPG up to 2MB</p>
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-amber-900 font-['Poppins',sans-serif]">Admin Account</h3>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-amber-800 mb-3 font-['Poppins',sans-serif]">
                        Full Name *
                    </label>
                    <input
                        type="text"
                        name="adminName"
                        value={formData.adminName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-amber-200/50 rounded-2xl focus:ring-4 focus:ring-amber-200/30 focus:border-amber-400 transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-amber-600/60 font-medium text-amber-900"
                        placeholder="Enter your full name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-amber-800 mb-3 font-['Poppins',sans-serif]">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        name="adminEmail"
                        value={formData.adminEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-amber-200/50 rounded-2xl focus:ring-4 focus:ring-amber-200/30 focus:border-amber-400 transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-amber-600/60 font-medium text-amber-900"
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-amber-800 mb-3 font-['Poppins',sans-serif]">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="adminPhone"
                        value={formData.adminPhone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-amber-200/50 rounded-2xl focus:ring-4 focus:ring-amber-200/30 focus:border-amber-400 transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-amber-600/60 font-medium text-amber-900"
                        placeholder="Enter your phone number"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-amber-800 mb-3 font-['Poppins',sans-serif]">
                        Password *
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 pr-12 border-2 border-amber-200/50 rounded-2xl focus:ring-4 focus:ring-amber-200/30 focus:border-amber-400 transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-amber-600/60 font-medium text-amber-900"
                            placeholder="Create a password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-amber-600 hover:text-amber-700 transition-colors"
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-amber-800 mb-3 font-['Poppins',sans-serif]">
                        Confirm Password *
                    </label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-3 pr-12 border-2 border-amber-200/50 rounded-2xl focus:ring-4 focus:ring-amber-200/30 focus:border-amber-400 transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-amber-600/60 font-medium text-amber-900"
                            placeholder="Confirm your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-amber-600 hover:text-amber-700 transition-colors"
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-amber-900 font-['Poppins',sans-serif]">Business Details</h3>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-amber-800 mb-3 font-['Poppins',sans-serif]">
                        GST Number
                    </label>
                    <input
                        type="text"
                        name="gstNumber"
                        value={formData.gstNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-amber-200/50 rounded-2xl focus:ring-4 focus:ring-amber-200/30 focus:border-amber-400 transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-amber-600/60 font-medium text-amber-900"
                        placeholder="Enter GST number"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-amber-800 mb-3 font-['Poppins',sans-serif]">
                        PAN Number
                    </label>
                    <input
                        type="text"
                        name="panNumber"
                        value={formData.panNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-amber-200/50 rounded-2xl focus:ring-4 focus:ring-amber-200/30 focus:border-amber-400 transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-amber-600/60 font-medium text-amber-900"
                        placeholder="Enter PAN number"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-amber-800 mb-3 font-['Poppins',sans-serif]">
                        Business Type
                    </label>
                    <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-amber-200/50 rounded-2xl focus:ring-4 focus:ring-amber-200/30 focus:border-amber-400 transition-all duration-300 bg-white/80 backdrop-blur-sm font-medium text-amber-900"
                    >
                        <option value="">Select business type</option>
                        <option value="proprietorship">Proprietorship</option>
                        <option value="partnership">Partnership</option>
                        <option value="private-limited">Private Limited</option>
                        <option value="public-limited">Public Limited</option>
                        <option value="llp">LLP</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-amber-800 mb-3 font-['Poppins',sans-serif]">
                        Seating Capacity
                    </label>
                    <input
                        type="number"
                        name="seatingCapacity"
                        value={formData.seatingCapacity}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-amber-200/50 rounded-2xl focus:ring-4 focus:ring-amber-200/30 focus:border-amber-400 transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-amber-600/60 font-medium text-amber-900"
                        placeholder="Number of seats"
                    />
                </div>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-amber-900 font-['Poppins',sans-serif]">Choose Your Plan</h3>
            <p className="text-amber-700/80 font-medium">Select a subscription plan that fits your restaurant's needs</p>

            <div className="grid md:grid-cols-3 gap-6">
                {subscriptionPlans.map((plan) => (
                    <div
                        key={plan.id}
                        className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 ${formData.subscriptionPlan === plan.id
                            ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-lg shadow-amber-200/30'
                            : 'border-amber-200/50 hover:border-amber-300 bg-white/80 backdrop-blur-sm'
                            }`}
                        onClick={() => setFormData({ ...formData, subscriptionPlan: plan.id })}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-amber-900 font-['Poppins',sans-serif]">{plan.name}</h4>
                            {formData.subscriptionPlan === plan.id && (
                                <CheckCircle className="w-6 h-6 text-amber-500" />
                            )}
                        </div>
                        <div className="mb-4">
                            <span className="text-2xl font-bold text-amber-900 font-['Poppins',sans-serif]">{plan.price}</span>
                            <span className="text-amber-700/80">/{plan.period}</span>
                        </div>
                        <ul className="space-y-2">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-center text-sm text-amber-700/80">
                                    <CheckCircle className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-100 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-3xl flex items-center justify-center shadow-lg shadow-amber-200/50">
                                <Crown className="w-10 h-10 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center">
                                <Building2 className="w-3 h-3 text-white" />
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-amber-900 mb-2 font-['Poppins',sans-serif]">
                        HungryScan
                    </h1>
                    <h2 className="text-3xl font-bold text-amber-800 mb-2 font-['Poppins',sans-serif]">
                        Register Your Hotel
                    </h2>
                    <p className="text-amber-700/80 font-medium text-lg">
                        Join HungryScan and transform your restaurant with QR-based ordering
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        {[1, 2, 3, 4].map((stepNumber) => (
                            <div key={stepNumber} className="flex items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${step >= stepNumber
                                        ? 'bg-gradient-to-br from-amber-500 to-yellow-600 text-white shadow-lg shadow-amber-200/50'
                                        : 'bg-amber-200/50 text-amber-700'
                                        }`}
                                >
                                    {stepNumber}
                                </div>
                                {stepNumber < 4 && (
                                    <div
                                        className={`w-20 h-1 mx-3 rounded-full transition-all duration-300 ${step > stepNumber ? 'bg-gradient-to-r from-amber-500 to-yellow-600' : 'bg-amber-200/50'
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-amber-200/30 border border-amber-100/50 p-8 transform transition-all duration-300 hover:shadow-amber-300/40">
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50/80 border border-red-200 rounded-2xl p-4 flex items-center space-x-3 mb-6 backdrop-blur-sm">
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                <span className="text-sm text-red-700 font-medium">{error}</span>
                            </div>
                        )}

                        {step === 1 && renderStep1()}
                        {step === 2 && renderStep2()}
                        {step === 3 && renderStep3()}
                        {step === 4 && renderStep4()}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8">
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={step === 1}
                                className="px-8 py-3 border-2 border-amber-300/50 rounded-2xl text-amber-800 hover:bg-amber-50 hover:border-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold font-['Poppins',sans-serif]"
                            >
                                Previous
                            </button>

                            {step < 4 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-2xl hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 shadow-lg shadow-amber-200/50 font-semibold font-['Poppins',sans-serif]"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-2xl hover:from-amber-600 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-amber-200/50 font-semibold font-['Poppins',sans-serif]"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center space-x-3">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Creating account...</span>
                                        </div>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-sm text-amber-700/80 font-medium">
                        Already have an account?{' '}
                        <Link
                            to="/admin/login"
                            className="font-semibold text-amber-800 hover:text-amber-900 transition-colors hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
