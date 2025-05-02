import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../store/authStore";

const phrases = [
  "Welcome to AI Support Chat",
  "Feel free to ask something",
  "I'm here to help you 😊",
];

const Navbar = observer(() => {
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentPhrase.length) {
          setDisplayedText((prev) => prev + currentPhrase[charIndex]);
          setCharIndex((prev) => prev + 1);
        } else {
          setIsDeleting(true);
        }
      } else {
        if (charIndex > 0) {
          setDisplayedText((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? 50 : 100); // Typing and deleting speeds

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentPhraseIndex]);

  const handleLogout = () => {
    authStore.logout();
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-white/10 backdrop-blur-md border-b border-gray-700 text-white shadow-md">
      
       <h1 className="text-lg font-semibold animate-fade-in transition-all duration-500">
        {displayedText}
        <span className="ml-1 w-1 h-6 bg-white animate-blink" />
      </h1>

      {authStore.isAuthenticated && (
        <button
          onClick={handleLogout}
           className="bg-gray-800 hover:bg-gray-700 transition px-4 py-1 rounded-full text-white font-medium shadow"
        >
          Logout
        </button>
      )}

      {/* Local CSS for blinking cursor */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .animate-blink {
          animation: blink 1s step-start infinite;
        }
      `}</style>
    </div>
  );
});

export default Navbar;
