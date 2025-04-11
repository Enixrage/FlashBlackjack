import React from 'react';
import '../styles/Login.css'; // You can move styles into this CSS file

const Login = () => {
  return (
    <div className="login-page">
      <header className="header">
        <img
          src="http://18.206.83.67/image.php"
          alt="Poker Cards Logo"
          className="logo"
        />
        <h1>Blackjack Game</h1>
      </header>

      <div className="form-container">
        <h2>Create Account</h2>
        <form action="/register" method="POST">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" required />

          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />

          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

