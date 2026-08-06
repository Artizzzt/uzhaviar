import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Sprout, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Button from '../../components/Button';

const SignIn = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  console.log('SignIn Render:', { emailOrPhone, password });

  const handleSubmit = (e) => {
  e.preventDefault();
  setError("");

  if (!emailOrPhone.trim() || !password.trim()) {
    setError("Please fill in all fields.");
    return;
  }

  // Admin login
  if (emailOrPhone === "admin@gmail.com") {
    if (password === "admin123") {
      navigate("/admin-dashboard");
    } else {
      setError("Invalid email or password.");
    }
    return; // Prevent farmer login check
  }

  // Farmer login
  const success = login(emailOrPhone, password);

  if (success) {
    navigate("/dashboard");
  } else {
    setError("Invalid email or password.");
  }
};
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      
      {/* 1. LEFT HALF - Welcome Panel (Hidden on Mobile) */}
      <div className="hidden md:flex w-1/2 bg-darkgreen relative items-center justify-center p-12 text-white overflow-hidden select-none">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ecfdf5_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        {/* Decorative circle shapes for premium design */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary opacity-5 rounded-full filter blur-xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#86efac] opacity-5 rounded-full filter blur-xl"></div>

        <div className="relative flex flex-col items-center text-center space-y-6 max-w-sm z-10">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-lg text-primary">
            <Sprout size={36} className="stroke-[2.5]" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white leading-tight">
            Welcome Back!
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Sign in to monitor your crops, check fertilizer plans, and manage your farm records.
          </p>
        </div>
      </div>

      {/* 2. RIGHT HALF - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 bg-white relative">
        {/* Back to Home Link */}
        <Link 
          to="/role-selection" 
          className="absolute top-8 left-8 text-xs font-bold text-primary hover:text-green-700 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft size={14} className="stroke-[3]" />
          Back
        </Link>

        {/* Form Container */}
        <div className="w-full max-w-md space-y-8 mt-8">
          
          {/* Form Header Card header style */}
          </div>
          <div className="text-center md:text-left space-y-2">
            <div className="w-12 h-12 bg-lightgreen text-primary rounded-xl flex items-center justify-center mx-auto md:mx-0 shadow-sm border border-green-100 mb-3 shrink-0 select-none">
              <Sprout size={22} className="stroke-[2.5]" />
            </div>
            <h2 className="text-2xl font-black text-textdark tracking-tight">Sign In</h2>
            <p className="text-xs text-textmuted">Access your farm dashboard</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Inline Error Block */}
            {error && (
              <div className="bg-red-50 text-danger text-xs font-semibold p-3.5 rounded-xl border border-red-100">
                {error}
              </div>
            )}

            {/* Email / Phone Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-textdark uppercase tracking-wider block">
                Email / Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-textmuted">
                  <Mail size={16} />
                </div>
                <input
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="email@example.com"
                  className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm text-textdark bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all focus:outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-textdark uppercase tracking-wider block">
                  Password
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-[11px] font-extrabold text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-textmuted">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl text-sm text-textdark bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-textmuted hover:text-primary transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                className="w-full font-bold py-3.5"
              >
                Sign In
              </Button>
            </div>
          </form>

          {/* Footer Register Link */}
          <p className="text-sm text-textmuted text-center pt-2 select-none">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline font-bold">
              Create New Account
            </Link>
          </p>

        </div>
      </div>
      
    </div>
  );
};

export default SignIn;
