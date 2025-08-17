import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import HungryScanLogoImage from "/images/hungryscan-logo.png"; // Place your provided logo here

export default function LoginSplit() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
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
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminEmail', data.user.email);
      localStorage.setItem('adminRole', data.user.role);
      localStorage.setItem('adminId', data.user.id);
      localStorage.setItem('hotelId', data.user.hotelId);
      localStorage.setItem('hotelName', data.user.hotelName);

      // Redirect to dashboard
      navigate("/admin/dashboard");
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const HungryScanLogo = ({ size = 80 }) => (
    <div className="flex items-center gap-3">
      <img
        src={HungryScanLogoImage}
        alt="HungryScan Logo"
        style={{ width: size, height: size }}
        className="rounded-xl shadow-lg"
      />
      <h1 className="text-3xl font-extrabold text-[#FFB300] drop-shadow-lg">
        HungryScan
      </h1>
    </div>
  );

  return (
    <div className="min-h-screen flex">
      {/* Left Info Section */}
      <div className="hidden lg:flex lg:w-1/2 
          bg-gradient-to-br from-[#FFB300] via-[#FF8C00] to-[#1E3A8A] 
          text-white p-12 flex-col justify-between">

        <div>
          <HungryScanLogo />
          <p className="mt-6 text-lg leading-relaxed max-w-md text-white/90">
            Manage your hotel's dining experience effortlessly. Track orders,
            update menus, and delight guests — all from one place.
          </p>
        </div>
        <div className="mt-auto text-sm text-white/80">
          © {new Date().getFullYear()} HungryScan. All rights reserved.
        </div>
      </div>

      {/* Right Login Card */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <div className="flex justify-center mb-6">
            <HungryScanLogo size={60} />
          </div>
          <h2 className="text-2xl font-bold text-[#1F3B73] mb-6 text-center">
            Hotel Admin Login
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#1F3B73] mb-2">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#FFB300] focus:ring-4 focus:ring-[#FFB300]/30 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1F3B73] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:border-[#FFB300] focus:ring-4 focus:ring-[#FFB300]/30 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FF8C00] hover:text-[#E67600]"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-[#1F3B73]">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-[#FFB300] border-gray-300 rounded"
                />
                Remember me
              </label>
              <Link
                to="/admin/forgot-password"
                className="text-[#FF8C00] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FFB300] to-[#FF8C00] text-white font-semibold shadow-lg hover:scale-[1.02] focus:ring-4 focus:ring-[#FFB300]/40 disabled:opacity-50 transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[#1F3B73]">
            Don't have an account?{" "}
            <Link to="/admin/register" className="font-semibold text-[#FF8C00] hover:underline">
              Register your hotel
            </Link>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">Demo Credentials</h4>
            <p className="text-xs text-blue-700">
              Email: <span className="font-mono bg-white/60 px-2 py-1 rounded">admin@demo.com</span><br />
              Password: <span className="font-mono bg-white/60 px-2 py-1 rounded">demo123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
