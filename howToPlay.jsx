import React from 'react';
import './howtoplay.css';
import FlashcardApp from './flashcardapp';

const HowToPlay = () => {
  return (
    <div className="how-to-play">
      <h1>How to Play Blackjack</h1>

      <section>
        <h2>Objective</h2>
        <p>
          The goal of blackjack is to beat the dealer by having a hand value as close to 21 as possible without going over.
        </p>
      </section>

      <section>
        <h2>Card Values</h2>
        <ul>
          <li>Number cards = face value (e.g., 5 = 5)</li>
          <li>Face cards (J, Q, K) = 10</li>
          <li>Ace = 1 or 11 (whichever benefits the hand more)</li>
        </ul>
      </section>

      <section>
        <h2>Gameplay</h2>
        <ol>
          <li>You and the dealer are dealt two cards.</li>
          <li>Your cards are face-up. The dealer has one face-up and one face-down card.</li>
          <li>You can then choose to:
            <ul>
              <li><strong>Hit</strong> – take another card</li>
              <li><strong>Stand</strong> – keep your current hand</li>
              <li><strong>Double Down</strong> – double your bet and take one final card</li>
              <li><strong>Split</strong> – if you have a pair, split into two hands (requires another bet)</li>
              <li><strong>Surrender</strong> – forfeit half your bet to end the hand early (if allowed)</li>
            </ul>
          </li>
          <li>The dealer reveals their hand and plays according to house rules (usually hits until 17 or higher).</li>
        </ol>
      </section>

      <section>
        <h2>Winning</h2>
        <p>
          You win if your hand is closer to 21 than the dealer’s, or if the dealer busts (goes over 21). A tie is a push — you get your bet back.
        </p>
      </section>

      <section>
        <h2>Blackjack</h2>
        <p>
          An Ace and a 10-value card (10, J, Q, K) on your first two cards is called a "Blackjack" — the best possible hand.
        </p>
      </section>

      <section>
        <h2>Practice What You Learned </h2>
        <p>Try out a few flashcards below to test your understanding!</p>
        <FlashcardApp />
      </section>
    </div>
  );
};

export default HowToPlay;
