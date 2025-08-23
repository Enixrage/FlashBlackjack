import React, { useState } from "react";

const suits = ["C", "D", "H", "S"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const buildDeck = () => suits.flatMap((s) => ranks.map((r) => `${r}${s}`));

const cardImages = import.meta.glob("../assets/*.png", { eager: true }) as Record<string, any>;
const getCardImage = (card: string) => cardImages[`../assets/${card}.png`].default;

const getHandValue = (hand: string[]) => {
  let total = 0;
  let aces = 0;
  for (let card of hand) {
    const rank = card.slice(0, -1);
    if (rank === "A") {
      aces += 1;
      total += 11;
    } else if (["K", "Q", "J"].includes(rank)) {
      total += 10;
    } else {
      total += parseInt(rank);
    }
  }
  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }
  return total;
};

const App: React.FC = () => {
  const [balance, setBalance] = useState<number>(1000);
  const [bet, setBet] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [hints, setHints] = useState(true);
  const [result, setResult] = useState<string | null>(null);

  const [deck, setDeck] = useState<string[]>([]);
  const [playerHands, setPlayerHands] = useState<string[][]>([]);
  const [activeHandIndex, setActiveHandIndex] = useState(0);
  const [dealerHand, setDealerHand] = useState<string[]>([]);

  const shuffle = (array: string[]) => [...array].sort(() => Math.random() - 0.5);

  const dealInitialHands = () => {
    const newDeck = shuffle(buildDeck());
    const player = [newDeck.pop()!, newDeck.pop()!];
    const dealer = [newDeck.pop()!, newDeck.pop()!];
    setDeck(newDeck);
    setPlayerHands([player]);
    setDealerHand(dealer);
    setActiveHandIndex(0);
  };

  const handleHandResult = (playerTotal: number, dealerTotal: number, handBet: number) => {
    if (playerTotal > 21) {
      setResult("You busted!");
    } else if (dealerTotal > 21 || playerTotal > dealerTotal) {
      setResult("You win!");
      setBalance(prev => prev + handBet * 2);
    } else if (playerTotal === dealerTotal) {
      setResult("Push!");
      setBalance(prev => prev + handBet);
    } else {
      setResult("Dealer wins!");
    }
    setGameStarted(false);
  };

  const startGame = () => {
    if (bet > 0 && bet <= balance) {
      setBalance(prev => prev - bet);
      setGameStarted(true);
      setResult(null);
      dealInitialHands();
    }
  };

  const quickBet = (amount: number) => setBet(prev => prev + amount);

  const hit = () => {
    if (!gameStarted || deck.length === 0) return;
    const newDeck = [...deck];
    const newCard = newDeck.pop()!;
    const newHands = [...playerHands];
    newHands[activeHandIndex] = [...newHands[activeHandIndex], newCard];
    setDeck(newDeck);
    setPlayerHands(newHands);

    const handTotal = getHandValue(newHands[activeHandIndex]);
    if (handTotal > 21) stand(); // ⚠️ wrap in arrow in button
  };

  const stand = (handBet?: number) => {
    if (activeHandIndex < playerHands.length - 1) {
      setActiveHandIndex(activeHandIndex + 1);
    } else {
      let dealerTotal = getHandValue(dealerHand);
      let newDeck = [...deck];
      let dealerCards = [...dealerHand];

      while (dealerTotal < 17) {
        const card = newDeck.pop()!;
        dealerCards.push(card);
        dealerTotal = getHandValue(dealerCards);
      }
      setDealerHand(dealerCards);

      const playerTotal = getHandValue(playerHands[activeHandIndex]);
      handleHandResult(playerTotal, dealerTotal, handBet ?? bet);
    }
  };

  const doubleDown = () => {
    if (!gameStarted || bet <= 0 || bet > balance) return;
    setBalance(prev => prev - bet);
    const newBet = bet * 2;
    setBet(newBet);
    hit();
    stand(newBet);
  };

  const canSplit =
    playerHands.length === 1 &&
    playerHands[0].length === 2 &&
    playerHands[0][0].slice(0, -1) === playerHands[0][1].slice(0, -1);

  const split = () => {
    if (!canSplit || !gameStarted) return;
    const newDeck = [...deck];
    const firstHand = [playerHands[0][0], newDeck.pop()!];
    const secondHand = [playerHands[0][1], newDeck.pop()!];
    setPlayerHands([firstHand, secondHand]);
    setDeck(newDeck);
    setBalance(prev => prev - bet);
    setActiveHandIndex(0);
  };

  const playAgain = () => {
    setGameStarted(false);
    setPlayerHands([]);
    setDealerHand([]);
    setDeck([]);
    setBet(0);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800/60 via-green-700/90 to-gray-800/60 text-white font-sans flex">
      {/* Left Menu */}
      <div className="w-64 bg-black/70 p-6 flex flex-col gap-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-2">Bet Options</h2>
        <input
          type="number"
          min={1}
          step={1}
          value={bet}
          onChange={(e) => setBet(Number(e.target.value))}
          className="p-2 text-black rounded border-2 border-white bg-white text-center w-full"
          placeholder="Enter Bet"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {[5, 10, 50, 100].map((amt) => (
            <button
              key={amt}
              onClick={() => quickBet(amt)}
              className="px-3 py-1 border-2 !border-white rounded hover:!bg-white hover:!text-black transition hover:!scale-105"
            >
              +{amt}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={hints}
            onChange={() => setHints(!hints)}
          />
          Hints
        </label>
        <button
          onClick={startGame}
          disabled={gameStarted || bet <= 0 || bet > balance}
          className="mt-4 px-4 py-2 !border-white bg-green-600 rounded hover:bg-green-400 disabled:opacity-50 hover:!bg-white hover:!text-black transition hover:!scale-105"
        >
          Start Game
        </button>
        <p className="!text-white !text-xl">Balance: ${balance}</p>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center gap-8 p-6 overflow-x-auto">
        {/* Dealer Section */}
        <div className="w-full flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2">Dealer ({getHandValue(dealerHand)})</h2>
          <div className="flex gap-2 mt-2 flex-wrap justify-center">
            {dealerHand.map((card, idx) => (
              <img
                key={idx}
                src={getCardImage(card)}
                alt={card}
                className="h-28 w-auto rounded shadow-lg"
              />
            ))}
          </div>
        </div>

        {/* Player Section */}
        <div className="w-full flex flex-col items-center gap-6">
          <h2 className="text-2xl font-bold mb-2">Player ({getHandValue(playerHands[activeHandIndex] || [])})</h2>
          <div className="flex gap-6 flex-wrap justify-center">
            {playerHands.map((hand, hIdx) => (
              <div
                key={hIdx}
                className={`flex flex-col items-center p-2 rounded ${
                  hIdx === activeHandIndex ? "bg-black/40" : "opacity-70"
                }`}
              >
                <div className="flex gap-2 flex-wrap justify-center">
                  {hand.map((card, idx) => (
                    <img
                      key={idx}
                      src={getCardImage(card)}
                      alt={card}
                      className="h-28 w-auto rounded shadow-lg"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 flex-wrap justify-center mt-4">
          <button
            onClick={hit}
            disabled={!gameStarted}
            className="px-6 py-2 bg-black border-2 border-white rounded font-bold hover:bg-white hover:text-black transition disabled:opacity-50"
          >
            Hit
          </button>
          <button
            onClick={() => stand()} // ✅ fixed
            disabled={!gameStarted}
            className="px-6 py-2 bg-black border-2 border-white rounded font-bold hover:bg-white hover:text-black transition disabled:opacity-50"
          >
            Stand
          </button>
          <button
            onClick={doubleDown}
            disabled={!gameStarted}
            className="px-6 py-2 bg-black border-2 border-white rounded font-bold hover:bg-white hover:text-black transition disabled:opacity-50"
          >
            Double Down
          </button>
          {canSplit && (
            <button
              onClick={split}
              disabled={!gameStarted}
              className="px-6 py-2 bg-black border-2 border-white rounded font-bold hover:bg-white hover:text-black transition disabled:opacity-50"
            >
              Split
            </button>
          )}
        </div>

        {/* Result Modal */}
        {result && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black p-8 rounded-lg shadow-lg text-center z-50">
            <h2 className="mb-2 text-xl font-bold">{result}</h2>
            <div className="flex justify-center gap-4 mt-4 flex-wrap">
              <button
                onClick={playAgain}
                className="px-4 py-2 bg-black text-white border-2 border-black rounded hover:bg-white hover:text-black transition"
              >
                Play Again
              </button>
              <button className="px-4 py-2 bg-black text-white border-2 border-black rounded hover:bg-white hover:text-black transition">
                Quit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
