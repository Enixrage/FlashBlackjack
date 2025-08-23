import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="flex-1 flex flex-col items-center pt-16 md:pt-24 pb-8 px-4 
                     bg-gradient-to-b from-gray-800/60 via-green-700/70 to-gray-800/40 min-h-screen !font-poppins">
      {/* Intro box */}
      <div className="max-w-3xl bg-black/50 backdrop-blur-md p-10 xm-5 rounded-3xl shadow-2xl text-center text-lg md:text-xl leading-relaxed text-white">
        <p>
          <strong className="text-2xl md:text-4xl font-poppins">Blackjack BootCamp</strong> is your ultimate training ground
          to master the game of Blackjack. This interactive site uses
          flashcards, tutorials, and real-time simulations to help you learn the
          rules, sharpen your strategy, and gain the confidence to beat the
          dealer.
        </p>
      </div>

      {/* Buttons stacked vertically */}
      <div className="flex flex-col items-center gap-10 mt-12 mb-20">
        {[
          { to: "/howtoplay", label: "How to Play" },
          { to: "/flashcards", label: "Flash Cards" },
          { to: "/play", label: "Play Blackjack" },
        ].map((btn) => (
          <Link key={btn.to} to={btn.to}>
            <button
              className="font-poppins bg-black !text-white !font-bold w-64 md:w-84 h-24 md:h-40 rounded-3xl border-2 border-black uppercase !text-2xl md:!text-3xl cursor-pointer
                         transition-all duration-300 transform
                         hover:!bg-white hover:!text-black
                         hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.6)]
                         hover:border-4 hover:!border-black
                         font-inter"
            >
              {btn.label}
            </button>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Home;
