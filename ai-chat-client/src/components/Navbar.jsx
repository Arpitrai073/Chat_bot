// src/components/Navbar.jsx
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../store/authStore";

const Navbar = observer(() => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authStore.logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
      <h1 className="text-lg font-semibold">AI Support Chat</h1>
      {authStore.isAuthenticated && (
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100"
        >
          Logout
        </button>
      )}
    </div>
  );
});

export default Navbar;
