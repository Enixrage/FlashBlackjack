const flashcards = [
    {
      id: 1,
      playerTotal: "16",
      dealerUpcard: "10",
      strategy: "Surrender if allowed, otherwise hit",
      hint: "Dealer 10 is strong. Your 16 is weak. What can reduce loss?"
    },
    {
      id: 2,
      playerTotal: "12",
      dealerUpcard: "4",
      strategy: "Stand",
      hint: "Dealer 4 is a bust card. Let them make a mistake."
    },
    {
      id: 3,
      playerTotal: "13",
      dealerUpcard: "7",
      strategy: "Hit",
      hint: "13 vs 7 is dangerous. You need a stronger total."
    },
    {
      id: 4,
      playerTotal: "8",
      dealerUpcard: "5",
      strategy: "Hit",
      hint: "Always hit when below 8 - hand is not strong enough."
    },
    {
      id: 5,
      playerTotal: "10",
      dealerUpcard: "9",
      strategy: "Double down",
      hint: "You hold advantage, get im."
    },
    {
      id: 6,
      playerTotal: "6,6",
      dealerUpcard: "3",
      strategy: "Split",
      hint: "Split to get a better hand."
    },
    {
      id: 7,
      playerTotal: "9,9",
      dealerUpcard: "7",
      strategy: "Stand",
      hint: "18 is strong - 7 is dangerous"
    },
    {
      id: 8,
      playerTotal: "A,4",
      dealerUpcard: "4",
      strategy: "Double down",
      hint: "Double against weak upcard - soft 15 can be better."
    },
    {
      id: 9,
      playerTotal: "A,6",
      dealerUpcard: "2",
      strategy: "Hit",
      hint: "Soft 17 vs. strong upcard - try to get a better hand."
    },
    {
      id: 10,
      playerTotal: "8,8",
      dealerUpcard: "10",
      strategy: "Split",
      hint: "16 is the worst hand - always split."
    },
    {
      id: 11,
      playerTotal: "11",
      dealerUpcard: "6",
      strategy: "Double down",
      hint: "Dealer 6 is weak. Take advantage with a strong 11."
    },
    {
      id: 12,
      playerTotal: "A,7",
      dealerUpcard: "9",
      strategy: "Hit",
      hint: "Soft 18 is decent, but 9 is strong. Improve your hand."
    },
    {
      id: 13,
      playerTotal: "4,4",
      dealerUpcard: "5",
      strategy: "Split",
      hint: "Split 4s against weak cards to gain an edge."
    },
    {
      id: 14,
      playerTotal: "7,7",
      dealerUpcard: "8",
      strategy: "Hit",
      hint: "14 is weak. Don’t stand against an 8."
    },
    {
      id: 15,
      playerTotal: "A,8",
      dealerUpcard: "6",
      strategy: "Double down",
      hint: "Soft 19 is strong, but 6 is weaker—maximize your win."
    },
    {
      id: 16,
      playerTotal: "13",
      dealerUpcard: "2",
      strategy: "Stand",
      hint: "Dealer 2 is not too strong—better to hold your hand."
    },
    {
      id: 17,
      playerTotal: "15",
      dealerUpcard: "10",
      strategy: "Surrender if allowed, otherwise hit",
      hint: "Tough spot—cut losses if surrender is on the table."
    },
    {
      id: 18,
      playerTotal: "A,3",
      dealerUpcard: "6",
      strategy: "Double down",
      hint: "Soft 14 can improve—dealer 6 is a bust card."
    },
    {
      id: 19,
      playerTotal: "9",
      dealerUpcard: "3",
      strategy: "Double down",
      hint: "A strong starting hand vs weak dealer—push your advantage."
    },
    {
      id: 20,
      playerTotal: "10",
      dealerUpcard: "10",
      strategy: "Hit",
      hint: "Equal strength—go for the win."
    }
  ];
let index = 0;
let flipped = false;
let correctCount = 0;
let incorrectCount = 0;

const cardEl = document.getElementById("card");
const correctEl = document.getElementById("correctCount");
const incorrectEl = document.getElementById("incorrectCount");
const difficultyEl = document.getElementById("difficulty");

function renderCard() {
  const card = flashcards[index];
  const difficulty = difficultyEl.value;
  if (!flipped) {
    cardEl.innerHTML = `
      <p><strong>Player:</strong> ${card.playerTotal}</p>
      <p><strong>Dealer:</strong> ${card.dealerUpcard}</p>
      ${difficulty === "easy" ? `<p class="hint">Hint: ${card.hint}</p>` : ""}
      <p class="note">Click to flip</p>
    `;
  } else {
    cardEl.innerHTML = `<p class="strategy">Strategy: ${card.strategy}</p>`;
  }
}

cardEl.addEventListener("click", () => {
  flipped = !flipped;
  renderCard();
});

document.getElementById("nextBtn").addEventListener("click", () => {
  index = (index + 1) % flashcards.length;
  flipped = false;
  renderCard();
});

document.getElementById("prevBtn").addEventListener("click", () => {
  index = (index - 1 + flashcards.length) % flashcards.length;
  flipped = false;
  renderCard();
});

document.getElementById("correctBtn").addEventListener("click", () => {
  correctCount++;
  correctEl.textContent = correctCount;
  index = (index + 1) % flashcards.length;
  flipped = false;
  renderCard();
});

document.getElementById("incorrectBtn").addEventListener("click", () => {
  incorrectCount++;
  incorrectEl.textContent = incorrectCount;
  index = (index + 1) % flashcards.length;
  flipped = false;
  renderCard();
});

difficultyEl.addEventListener("change", renderCard);

// Initial render
renderCard();