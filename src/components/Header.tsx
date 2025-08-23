import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import BlackjackLogo from "../assets/blackjack.png";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    if (window.innerWidth >= 768) setMenuOpen(true);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      closeTimeout.current = setTimeout(() => {
        setMenuOpen(false);
      }, 200); // 200ms delay before closing
    }
  };

  return (
    <header className="bg-black text-white fixed top-0 left-0 w-full z-10 px-5 py-10 flex items-center justify-between box-border relative">
      {/* Logo + Title */}
      <Link
        to="/"
        className="flex items-center no-underline !text-white visited:!text-white focus:!text-white md:absolute md:left-1/2 md:transform md:-translate-x-1/2"
      >
        <img
          src={BlackjackLogo}
          alt="Poker Cards Logo"
          className="h-16 md:h-20 w-auto mr-2 transform transition-transform duration-300 hover:!scale-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
        />
        <h1 className="!text-white font-bold !text-2xl md:!text-5xl m-0 font-poppins hover:underline transform transition duration-300 hover:!scale-101 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
          Blackjack BootCamp
        </h1>
      </Link>

      {/* Right side: dropdown + login */}
      <div className="ml-auto flex items-center space-x-4 relative">
        {/* Dropdown Menu Button */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={() => window.innerWidth < 768 && setMenuOpen(!menuOpen)}
            className="!bg-black !text-white !border-2 !border-white px-6 py-3 !text-md md:!text-xl font-bold rounded-lg cursor-pointer transition-transform duration-300 hover:!bg-white hover:!text-black hover:!scale-110"
          >
            Menu
          </button>

          {/* Dropdown Items */}
          {menuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 !bg-black border-2 !border-white rounded-lg shadow-lg flex flex-col"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {[
                { to: "/", label: "Home" },
                { to: "/play", label: "Play Blackjack" },
                { to: "/flashcards", label: "Flash Cards" },
                { to: "/howtoplay", label: "How to Play" },
                { to: "/contact", label: "Contact Us" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="bg-black !text-white px-6 py-3 rounded-lg !text-lg font-bold cursor-pointer transition-transform duration-300 hover:bg-white hover:!text-black hover:!scale-105"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Login Button */}
        <Link
          to="/login"
          className="bg-black !text-white !border-2 !border-white px-6 py-3 !text-sm md:!text-lg font-bold rounded-lg cursor-pointer transition-transform duration-300 hover:bg-white hover:!text-black hover:!scale-110"
        >
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
