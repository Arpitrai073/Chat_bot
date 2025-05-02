import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminLoginPage from "./pages/AdminLogin";// New page
import ChatBox from "./components/ChatBox";
import AdminPanel from "./components/AdminPanel";

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/chat" element={<ChatBox />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
