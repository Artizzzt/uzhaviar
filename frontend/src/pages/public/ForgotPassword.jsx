import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    
    e.preventDefault();

    // Later connect this to your backend or Firebase
    console.log("Reset link sent to:", email);

    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
    <button
  onClick={() => navigate("/sign-in")}
  className="mb-6 text-primary font-semibold hover:underline flex items-center gap-2"
>
  ← Back
</button>
        <h1 className="text-3xl font-bold text-center text-green-700">
          Forgot Password
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Enter your registered email address.
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="text-center">
            <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-5">
              ✅ Password reset link has been sent to
              <br />
              <strong>{email}</strong>
            </div>

            <Link
              to="/sign-in"
              className="text-green-700 font-semibold hover:underline"
            >
              Back to Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;