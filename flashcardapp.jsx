import React, { useState, useEffect } from 'react';
import './flashcard.css';

const FlashcardApp = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/flashcards');
        const data = await response.json();
        setFlashcards(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, []);

  const nextFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const prevFlashcard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return <div className="loading">Loading flashcards...</div>;
  }

  const currentFlashcard = flashcards[currentIndex];

  return (
    <div className="flashcard-app">
      <h1>Blackjack Flashcards</h1>
      <div className="flashcard">
        <h2>Player Total: {currentFlashcard.player_total}</h2>
        <p>Dealer Upcard: {currentFlashcard.dealer_upcard}</p>
        <p><strong>Strategy:</strong> {currentFlashcard.strategy}</p>
        <p><strong>Hint:</strong> <span className="hint">{currentFlashcard.hint}</span></p>
        <p><strong>Category:</strong> <span className="category">{currentFlashcard.category}</span></p>
      </div>
      <div className="controls">
        <button onClick={prevFlashcard} disabled={flashcards.length <= 1}>
          Previous
        </button>
        <button onClick={nextFlashcard} disabled={flashcards.length <= 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashcardApp;
