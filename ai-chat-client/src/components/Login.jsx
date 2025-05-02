// frontend/components/Login.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../store/authStore";

const Login = observer(() => {
 // const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        authStore.setUser(data.token);
        history.push("/chat"); // Redirect to chat page
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
});

export default Login;
