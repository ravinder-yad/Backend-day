import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Registration failed");
        return;
      }

      setMessage("✅ Registered Successfully");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setMessage("❌ Server Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 w-full max-w-md rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        {message && (
          <p className="text-center text-sm mt-2 text-red-500">{message}</p>
        )}

        <div className="mt-5">
          <label>Email</label>
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              className="w-full pl-10 p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label>Password</label>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              className="w-full pl-10 p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button className="w-full bg-green-600 text-white py-2 mt-6 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
