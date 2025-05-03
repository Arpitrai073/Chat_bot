import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setMsg("✅ Registration successful! Redirecting...");
        setTimeout(() => navigate("/login"), 1500); // redirect after 1.5s
      } else {
        setMsg(data.message || "❌ Registration failed");
      }
    } catch (err) {
      console.error("Register error:", err);
      setMsg("⚠️ Server error. Try again later.");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 px-4">
      <div className="backdrop-blur-lg bg-white/30 rounded-3xl p-10 w-full max-w-md border border-white/20 shadow-xl relative">
        <h2 className="text-3xl font-bold text-center text-emerald-800 mb-6 drop-shadow">
          Create Account
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 text-gray-800 placeholder-gray-500 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 text-gray-800 placeholder-gray-500 mb-6 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
        >
          Register
        </button>

        {msg && (
          <p className="mt-4 text-sm text-center text-gray-800 font-medium">
            {msg}
          </p>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-emerald-800 hover:underline hover:font-semibold transition"
          >
            Already a user? Login
          </button>
        </div>

        {/* Decorative glows */}
        <div className="absolute -top-6 -left-6 w-24 h-24 bg-emerald-300 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-teal-300 opacity-30 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
