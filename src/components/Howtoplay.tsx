import React from 'react';
import { Link } from 'react-router-dom';

const HowToPlay: React.FC = () => {
  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-4 pt-16 pb-16
                    bg-gradient-to-b from-gray-800/60 via-green-700/90 to-gray-800/60 min-h-screen font-sans">
      <div className="max-w-3xl bg-white text-black rounded-lg shadow-lg p-8 space-y-6 font-sans">
        <h1 className="text-center text-3xl font-bold text-blue-500 mb-4">How to Play Blackjack</h1>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Objective</h2>
          <p>The goal is to beat the dealer by having a hand value closest to 21, without going over.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Card Values</h2>
          <ul className="list-disc list-inside space-y-1 text-left">
            <li>Number cards: face value</li>
            <li>Face cards (J, Q, K): 10</li>
            <li>Ace: 1 or 11 (whichever is better for your hand)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Gameplay</h2>
          <ol className="list-decimal list-inside space-y-2 text-left">
            <li>Each player gets two cards. Dealer gets two cards (one face down).</li>
            <li>
              Player chooses to:
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong className="text-blue-500">Hit</strong> – Take another card</li>
                <li><strong className="text-blue-500">Stand</strong> – End your turn</li>
                <li><strong className="text-blue-500">Double Down</strong> – Double your bet, get one more card</li>
                <li><strong className="text-blue-500">Split</strong> – If you have a pair, split into two hands</li>
                <li><strong className="text-blue-500">Surrender</strong> – Forfeit half your bet (if allowed)</li>
              </ul>
            </li>
            <li>Dealer reveals hidden card and must hit until reaching 17 or more.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Winning</h2>
          <p>You win by having a higher hand than the dealer without going over 21. If the dealer busts and you don't, you win. A tie is a push (you keep your bet).</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Blackjack</h2>
          <p>A "Blackjack" is when your first two cards are an Ace and a 10-point card. It usually pays 3:2.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Extra Tips</h2>
          <ul className="list-disc list-inside space-y-1 text-left">
            <li>Never take insurance — it’s statistically a bad bet.</li>
            <li>Use a basic strategy chart to know when to hit or stand.</li>
            <li>Always split Aces and 8s. Never split 10s or 5s.</li>
            <li>Dealers must hit soft 17 in most casinos. Know the rules!</li>
            <li>Manage your bankroll — don’t chase losses.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Practice What You Learned</h2>
          <p>Try out a few flashcards below to test your understanding or play against a bot.</p>
        </section>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Link
                to="/flashcards"
                className="bg-black !text-white font-bold px-6 py-3 rounded-lg border-2 border-black uppercase text-center 
                        transition-all duration-300 transform 
                        hover:!bg-white hover:!text-black hover:scale-105 hover:shadow-lg"
            >
                Flash Cards
            </Link>

            <Link
                to="/play"
                className="bg-black !text-white font-bold px-6 py-3 rounded-lg border-2 border-black uppercase text-center 
                        transition-all duration-300 transform 
                        hover:!bg-white hover:!text-black hover:scale-105 hover:shadow-lg"
            >
                Play Blackjack
            </Link>

            <Link
                to="/"
                className="bg-black !text-white font-bold px-6 py-3 rounded-lg border-2 border-black uppercase text-center 
                        transition-all duration-300 transform 
                        hover:!bg-white hover:!text-black hover:scale-105 hover:shadow-lg"
            >
                Quit to Home
            </Link>
        </div>

      </div>
    </div>
  );
};

export default HowToPlay;
