CREATE TABLE flashcards (
  id SERIAL PRIMARY KEY,
  player_total TEXT NOT NULL,
  dealer_upcard TEXT NOT NULL,
  strategy TEXT NOT NULL,
  hint TEXT,
  category TEXT
);
INSERT INTO flashcards (player_total, dealer_upcard, strategy, hint, category)
VALUES
  ('16', '10', 'Surrender if allowed, otherwise hit', 'Dealer 10 is strong. Your 16 is weak.', 'Hard Totals'),
  ('12', '4', 'Stand', 'Dealer 4 is a bust card. Let them make a mistake.', 'Hard Totals'),
  ('13', '7', 'Hit', '13 vs 7 is risky. You need a better total.', 'Hard Totals');