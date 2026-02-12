import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, UserPlus, ArrowRight, ShieldCheck } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.1),transparent),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.1),transparent)]">
      <div className="w-full max-w-md glass p-8 rounded-3xl animate-in fade-in slide-in-from-bottom-5 duration-500">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-2xl bg-primary-600 text-white mb-4 shadow-xl shadow-primary-500/20">
            <UserPlus size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
          <p className="text-slate-500 mt-2">Join CarePulse family today</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors" size={20} />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Full Name"
              required
              className="input-field pl-12"
            />
          </div>

          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors" size={20} />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email Address"
              required
              className="input-field pl-12"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors" size={20} />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required 
              className="input-field pl-12"
            />
          </div>

          <div className="relative group">
            <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors" size={20} />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              className="input-field pl-12"
            />
          </div>

          <button type="submit" className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 shadow-xl shadow-primary-500/20">
            Create Account
            <ArrowRight size={20} />
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
