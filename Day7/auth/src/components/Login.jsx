import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      setMessage("✅ Login Successful");
    } catch (err) {
      setMessage("❌ Server Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600">
      <form
        onSubmit={handleLogin}
        className="bg-white/90 backdrop-blur-lg p-8 w-full max-w-md rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 text-sm mt-1">
          Login to your account
        </p>

        {message && (
          <p
            className={`text-center text-sm mt-4 ${
              message.includes("Successful")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* Email */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative mt-1">
            <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative mt-1">
            <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 transition text-white py-3 mt-6 rounded-lg font-semibold"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-sm mt-5 text-gray-600">
          New user?
          <span
            onClick={() => navigate("/register")}
            className="text-purple-600 font-medium cursor-pointer ml-1 hover:underline"
          >
            Create an account
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
