// src/pages/Home.jsx
import '../styles/Home.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home">
      <header>
        <img src="http://18.206.83.67/image.php" alt="Poker Cards Logo" className="logo" />
        <h1>Blackjack Game</h1>
        <Link to="/login" className="login-button">Login</Link>
      </header>

      <div className="button-container">
        <Link to="/play">
          <button className="button">Play Blackjack</button>
        </Link>
        <Link to="/how-to-play">
          <button className="button">How to Play</button>
        </Link>
        <Link to="/flashcards">
          <button className="button">Flash Cards</button>
        </Link>
      </div>
    </div>
  );
}
