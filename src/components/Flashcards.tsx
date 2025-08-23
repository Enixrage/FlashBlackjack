import { useState } from "react";

interface Flashcard {
  id: number;
  playerTotal: string;
  dealerUpcard: string;
  strategy: string;
  hint: string;
}

const flashcards: Flashcard[] = [
  { id: 1, playerTotal: "16", dealerUpcard: "10", strategy: "Surrender if allowed, otherwise hit", hint: "Dealer 10 is strong. Your 16 is weak. What can reduce loss?" },
  { id: 2, playerTotal: "12", dealerUpcard: "4", strategy: "Stand", hint: "Dealer 4 is a bust card. Let them make a mistake." },
  { id: 3, playerTotal: "13", dealerUpcard: "7", strategy: "Hit", hint: "13 vs 7 is dangerous. You need a stronger total." },
  { id: 4, playerTotal: "8", dealerUpcard: "5", strategy: "Hit", hint: "Always hit when below 8 - hand is not strong enough." },
  { id: 5, playerTotal: "10", dealerUpcard: "9", strategy: "Double down", hint: "You hold advantage, get im." },
  { id: 6, playerTotal: "6,6", dealerUpcard: "3", strategy: "Split", hint: "Split to get a better hand." },
  { id: 7, playerTotal: "9,9", dealerUpcard: "7", strategy: "Stand", hint: "18 is strong - 7 is dangerous" },
  { id: 8, playerTotal: "A,4", dealerUpcard: "4", strategy: "Double down", hint: "Double against weak upcard - soft 15 can be better." },
  { id: 9, playerTotal: "A,6", dealerUpcard: "2", strategy: "Hit", hint: "Soft 17 vs. strong upcard - try to get a better hand." },
  { id: 10, playerTotal: "8,8", dealerUpcard: "10", strategy: "Split", hint: "16 is the worst hand - always split." },
  { id: 11, playerTotal: "11", dealerUpcard: "6", strategy: "Double down", hint: "Dealer 6 is weak. Take advantage with a strong 11." },
  { id: 12, playerTotal: "A,7", dealerUpcard: "9", strategy: "Hit", hint: "Soft 18 is decent, but 9 is strong. Improve your hand." },
  { id: 13, playerTotal: "4,4", dealerUpcard: "5", strategy: "Split", hint: "Split 4s against weak cards to gain an edge." },
  { id: 14, playerTotal: "7,7", dealerUpcard: "8", strategy: "Hit", hint: "14 is weak. Don’t stand against an 8." },
  { id: 15, playerTotal: "A,8", dealerUpcard: "6", strategy: "Double down", hint: "Soft 19 is strong, but 6 is weaker—maximize your win." },
  { id: 16, playerTotal: "13", dealerUpcard: "2", strategy: "Stand", hint: "Dealer 2 is not too strong—better to hold your hand." },
  { id: 17, playerTotal: "15", dealerUpcard: "10", strategy: "Surrender if allowed, otherwise hit", hint: "Tough spot—cut losses if surrender is on the table." },
  { id: 18, playerTotal: "A,3", dealerUpcard: "6", strategy: "Double down", hint: "Soft 14 can improve—dealer 6 is a bust card." },
  { id: 19, playerTotal: "9", dealerUpcard: "3", strategy: "Double down", hint: "A strong starting hand vs weak dealer—push your advantage." },
  { id: 20, playerTotal: "10", dealerUpcard: "10", strategy: "Hit", hint: "Equal strength—go for the win." }
];

const Flashcards: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [difficulty, setDifficulty] = useState<"easy" | "hard">("easy");

  const card = flashcards[index];

  const nextCard = () => {
    setIndex((prev) => (prev + 1) % flashcards.length);
    setFlipped(false);
  };

  const prevCard = () => {
    setIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setFlipped(false);
  };

  const markCorrect = () => {
    setCorrectCount((prev) => prev + 1);
    nextCard();
  };

  const markIncorrect = () => {
    setIncorrectCount((prev) => prev + 1);
    nextCard();
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-6 pt-36 
                     bg-gradient-to-b from-gray-800/60 via-green-700/90 to-gray-800/60 min-h-screen font-sans">
      <h2 className="text-white text-3xl mb-6">Blackjack Strategy Flashcards</h2>

      <div className="mb-6">
        <label className="text-white font-bold text-lg mr-2">Select Difficulty:</label>
        <select
          className="px-4 py-2 text-white bg-black border-2 border-white rounded-md font-bold focus:outline-none focus:border-lime-500"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as "easy" | "hard")}
        >
          <option value="easy">Easy (Show Hint)</option>
          <option value="hard">Hard (No Hint)</option>
        </select>
      </div>

      <div
        className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg cursor-pointer transition-transform transform hover:scale-105 w-full max-w-xl"
        onClick={() => setFlipped((prev) => !prev)}
      >
        {!flipped ? (
          <div>
            <p><strong>Player:</strong> {card.playerTotal}</p>
            <p><strong>Dealer:</strong> {card.dealerUpcard}</p>
            {difficulty === "easy" && <p className="text-lime-400 mt-2">Hint: {card.hint}</p>}
            <p className="text-gray-400 mt-2">Click to flip</p>
          </div>
        ) : (
          <p className="text-sky-400 font-bold">Strategy: {card.strategy}</p>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <button onClick={prevCard} className="bg-black text-white text-xl font-bold px-6 py-3 border-2 border-white rounded-lg hover:bg-white hover:text-black transition">
          ⬅ Prev
        </button>
        <button onClick={nextCard} className="bg-black text-white text-xl font-bold px-6 py-3 border-2 border-white rounded-lg hover:bg-white hover:text-black transition">
          Next ➡
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-6 text-white font-bold">
        <p>Correct: {correctCount}</p>
        <p>Incorrect: {incorrectCount}</p>
        <button onClick={markCorrect} className="bg-black px-5 py-2 rounded-lg border-2 border-white hover:bg-white hover:text-black transition">
          I Got It Right
        </button>
        <button onClick={markIncorrect} className="bg-black px-5 py-2 rounded-lg border-2 border-white hover:bg-white hover:text-black transition">
          I Got It Wrong
        </button>
      </div>
    </main>
  );
};

export default Flashcards;
