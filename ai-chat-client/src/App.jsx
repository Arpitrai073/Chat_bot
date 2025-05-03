import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminLoginPage from "./pages/AdminLogin";
import ChatBox from "./components/ChatBox";
import AdminPanel from "./components/AdminPanel";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute"; // ✅ import
import authStore from "./store/authStore";

function App() {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/chat"
          element={
            authStore.user ? (
              <ChatBox />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/" element={<LoginPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminPanel />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
