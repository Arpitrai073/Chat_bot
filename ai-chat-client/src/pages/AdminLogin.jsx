import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("adminToken", data.token); // ✅ Store token
        navigate("/admin"); // ✅ Redirect to protected admin panel
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("⚠️ Admin login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black px-4">
      <div className="bg-gradient-to-br from-slate-800 to-gray-900 text-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-amber-400 drop-shadow-md animate-pulse">
          Admin Portal
        </h2>

        {error && (
          <p className="bg-red-100 text-red-700 px-3 py-2 mb-4 rounded text-sm">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 placeholder-gray-400 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 placeholder-gray-400 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          />
        </div>

        <button
          onClick={handleAdminLogin}
          className="mt-6 w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-semibold tracking-wide shadow-lg transition-transform transform hover:scale-105"
        >
          Login as Admin
        </button>

        <div className="mt-6 text-sm text-center text-gray-400 animate-fade-in">
          🚨 Admin Access Only — Unauthorized entry is monitored.
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
