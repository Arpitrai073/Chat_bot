import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authStore from "../store/authStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        authStore.setUser(data.token);
        setMsg("✅ Login successful");
        navigate("/chat");
      } else {
        setMsg(data.message || "❌ Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMsg("⚠️ Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F1C2C] via-[#928DAB] to-[#2C3E50] flex items-center justify-center px-4">

      <div className="backdrop-blur-lg bg-white/30 shadow-2xl rounded-3xl p-10 w-full max-w-md border border-white/20 relative">
        <h2 className="text-3xl font-extrabold text-center text-purple-800 mb-6 drop-shadow">
          User Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 backdrop-blur"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 backdrop-blur"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
  type="submit"
  className="w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] py-2 rounded-full font-semibold text-white hover:opacity-90 transition"
>
  LOGIN
</button>

        </form>

        {msg && (
          <p className="mt-4 text-sm text-center text-gray-800 font-medium backdrop-blur">
            {msg}
          </p>
        )}

        <div className="mt-6 text-center space-y-2">
          <button
            onClick={() => navigate("/register")}
            className="text-blue-800 hover:underline hover:font-semibold transition"
          >
            New User? Register
          </button>
          <br />
          <button
            onClick={() => navigate("/admin/login")}
            className="text-purple-800 hover:underline hover:font-semibold transition"
          >
            Admin? Login here
          </button>
        </div>

        {/* Decorative blurred lights */}
        <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-400 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-400 opacity-30 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
