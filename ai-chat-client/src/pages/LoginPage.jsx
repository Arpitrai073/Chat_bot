import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authStore from "../store/authStore"; // MobX store

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        authStore.setUser(data.token); // Store token in MobX
        setMsg("✅ Login successful");
        navigate("/chat"); // Redirect to chat page
      } else {
        setMsg(data.message || "❌ Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMsg("⚠️ Server error. Try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit" // Change to submit to trigger form submission correctly
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Login
          </button>
        </form>
        {msg && <p className="mt-4 text-center text-sm">{msg}</p>}
      </div>
    </div>
  );
}
