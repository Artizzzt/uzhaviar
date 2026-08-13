import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Shield } from "lucide-react";
import Button from "../../components/Button";

const AdminSignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

 const handleSubmit = (e) => {
  e.preventDefault();

  const adminEmail = "admin@gmail.com";
  const adminPassword = "admin123";

  if (email === adminEmail && password === adminPassword) {
    navigate("/admin-dashboard");
  } else {
    alert("Invalid admin credentials");
  }
};
  const isFormValid =
  email.trim() !== "" && password.trim() !== "";

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Left Panel */}
      <div className="hidden md:flex w-1/2 bg-blue-900 items-center justify-center text-white p-12">
        <div className="text-center">
          <Shield size={60} className="mx-auto mb-5" />
          <h1 className="text-4xl font-bold">Admin Portal</h1>
          <p className="mt-4 text-blue-100">
            Sign in to manage users, crops, reports and the platform.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">

        <Link
          to="/"
          className="absolute top-8 left-8 flex items-center gap-2 text-blue-700 font-semibold"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <div className="w-full max-w-md">

          <h2 className="text-3xl font-bold text-blue-800 mb-2">
            Admin Sign In
          </h2>

          <p className="text-gray-500 mb-8">
            Enter your administrator credentials.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block mb-2 font-semibold">
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full border rounded-lg py-3 pl-10 pr-4"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full border rounded-lg py-3 pl-10 pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

           <Button
  type="submit"
  disabled={!isFormValid}
  className={`w-full ${
    isFormValid
      ? "bg-blue-700 hover:bg-blue-800"
      : "bg-gray-400 cursor-not-allowed"
  }`}
>
  Admin Sign In
</Button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;