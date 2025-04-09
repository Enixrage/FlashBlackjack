import React, { useState } from 'react';
import { flashcards } from './cards';

export default function FlashcardApp() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const card = flashcards[index];

  const handleNext = () => {
    setIndex((index + 1) % flashcards.length);
    setFlipped(false);
  };

  const handlePrev = () => {
    setIndex((index - 1 + flashcards.length) % flashcards.length);
    setFlipped(false);
  };

  const handleCorrect = () => {
    setCorrectCount(correctCount + 1);
    handleNext();
  };

  const handleIncorrect = () => {
    setIncorrectCount(incorrectCount + 1);
    handleNext();
  };

  return (
    <div className="app">
      <h2>Blackjack Strategy Flashcards</h2>

      <div>
        <label>Select Difficulty: </label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy (Show Hint)</option>
          <option value="hard">Hard (No Hint)</option>
        </select>
      </div>

      <div className="card" onClick={() => setFlipped(!flipped)}>
        {!flipped ? (
          <>
            <p><strong>Player:</strong> {card.playerTotal}</p>
            <p><strong>Dealer:</strong> {card.dealerUpcard}</p>
            {difficulty === "easy" && (
              <p className="hint">💡 Hint: {card.hint}</p>
            )}
            <p className="note">Click to flip</p>
          </>
        ) : (
          <p className="strategy">🧠 Strategy: {card.strategy}</p>
        )}
      </div>

      <div className="controls">
        <button onClick={handlePrev}>⬅ Prev</button>
        <button onClick={handleNext}>Next ➡</button>
      </div>

      <div className="scoring">
        <p>✅ Correct: {correctCount}</p>
        <p>❌ Incorrect: {incorrectCount}</p>
        <button onClick={handleCorrect}>I Got It Right</button>
        <button onClick={handleIncorrect}>I Got It Wrong</button>
      </div>
    </div>
  );
}
