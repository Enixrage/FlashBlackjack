import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-white p-4 flex flex-col items-center w-screen">
      {/* Links row */}
      <div className="flex flex-wrap justify-center mb-2.5">
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
            className="mx-4 text-lg md:text-xl font-bold font-poppins !text-white !no-underline 
                      visited:!text-white focus:!text-white active:!text-white hover:!text-white
                      hover:inline-block hover:scale-102 hover:shadow-[0_0_8px_rgba(255,255,255,0.6)] 
                      hover:outline hover:outline-2 hover:outline-white hover:rounded-md hover:px-2 hover:py-1
                      transition-all duration-300"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Copyright stacked below */}
      <div className="text-white font-poppins text-center">&copy; 2025 Blackjack BootCamp</div>
    </footer>

  );
}

export default Footer;