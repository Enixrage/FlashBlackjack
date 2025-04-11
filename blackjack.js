let deck, playerHand, dealerHand;
let money = 1000;
let currentBet = 0;
let isDoubleDown = false;
let dealerCardTimeouts = []; // To manage timeouts for card drawing

function createDeck() {
    const suits = ['♠', '♥', '♣', '♦'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const newDeck = [];
    for (const suit of suits) {
        for (const value of values) {
            newDeck.push({ value, suit });
        }
    }
    return shuffle(newDeck);
}

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function renderCard(card) {
    const suitChar = card.suit === '♠' ? 'S' : card.suit === '♥' ? 'H' : card.suit === '♣' ? 'C' : 'D';
    const cardImageUrl = `cards.php?card=${card.value}${suitChar}`;
    return `<img class="card" src="${cardImageUrl}" alt="${card.value}${card.suit}">`;
}

function updateUI(showDealerHoleCard = false) {
    const dealerCards = document.getElementById('dealer-cards');
    const playerCards = document.getElementById('player-cards');
    const dealerTotal = document.getElementById('dealer-total');
    const playerTotal = document.getElementById('player-total');

    dealerCards.innerHTML = dealerHand.map((card, index) => {
        if (index === 1 && !showDealerHoleCard) {
            return `<img class="card flip" src="cards.php?card=BACK" alt="Face Down">`;
        }
        return renderCard(card);
    }).join('');

    playerCards.innerHTML = playerHand.map(card => renderCard(card)).join('');

    dealerTotal.textContent = 'Total: ' + (showDealerHoleCard ? calculateTotal(dealerHand) : '??');
    playerTotal.textContent = 'Total: ' + calculateTotal(playerHand);
}

function calculateTotal(hand) {
    let total = 0;
    let aces = 0;
    for (let card of hand) {
        if (['J', 'Q', 'K'].includes(card.value)) total += 10;
        else if (card.value === 'A') {
            total += 11;
            aces += 1;
        } else total += parseInt(card.value);
    }
    while (total > 21 && aces > 0) {
        total -= 10;
        aces -= 1;
    }
    return total;
}

function dealInitial() {
    deck = createDeck();
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];
    updateUI(false); // Show the dealer's face-down card

    const playerTotal = calculateTotal(playerHand);
    if (playerTotal === 21) {
        const winnings = Math.floor(currentBet * 2.5); // 1.5x plus original bet
        money += winnings;
        document.getElementById('result').textContent = 'Blackjack! You win 1.5x your bet!';
        updateBalanceDisplay();
        disableActions();
    }
}

function hit() {
    if (isDoubleDown) return;
    playerHand.push(deck.pop());
    updateUI();
    const total = calculateTotal(playerHand);
    if (total > 21) {
        endGame();
    }
}

function stand() {
    if (gameEnded) return; // Prevent standing after the game has ended
    gameEnded = true; // Prevent further actions (hit/stand)
    disableActions(); // Disable buttons

    updateUI(false); // Hide hole card first
    setTimeout(() => {
        // Reveal hole card after a delay
        updateUI(true);
        
        // Dealer's turn: draw cards until reaching at least 17
        while (calculateTotal(dealerHand) < 17 && deck.length > 0) {
            dealerHand.push(deck.pop());
            updateUI(true); // Reveal dealer's hand as it's drawn
        }

        // End game after dealer's turn
        setTimeout(() => {
            endGame(); // End game after dealer's turn
        }, 600);
    }, 600); // Wait a moment before revealing the hole card
}


function doubleDown() {
    if (isDoubleDown || currentBet * 2 > money + currentBet || playerHand.length > 2) {
        alert("You can only double down before hitting or after your first card.");
        return;
    }

    money -= currentBet;
    currentBet *= 2;
    isDoubleDown = true;
    updateBalanceDisplay();

    playerHand.push(deck.pop());
    updateUI();

    const total = calculateTotal(playerHand);
    if (total > 21) {
        setTimeout(() => {
            updateUI(true);
            setTimeout(() => endGame(), 600);
        }, 600);
    } else {
        stand();
    }
}

function endGame() {
    const playerTotal = calculateTotal(playerHand);
    const dealerTotal = calculateTotal(dealerHand);
    let result = '';

    if (playerTotal > 21) {
        result = 'You bust! Dealer wins.';
    } else if (dealerTotal > 21) {
        result = 'Dealer busts! You win!';
        money += currentBet * 2;
    } else if (playerTotal > dealerTotal) {
        result = 'You win!';
        money += currentBet * 2;
    } else if (playerTotal < dealerTotal) {
        result = 'Dealer wins.';
    } else {
        result = 'Push (Tie).';
        money += currentBet;
    }

    // Show modal popup after 3 seconds
    setTimeout(() => {
        document.getElementById('result-text').textContent = result;
        document.getElementById('result-message').textContent = `Your balance: $${money}`;
        document.getElementById('result-popup').classList.add('show'); // Add class to make it visible
    }, 3000); // 3000 milliseconds = 3 seconds

    updateBalanceDisplay();
    disableActions(); // Disable all buttons after the game ends
}

function disableActions() {
    // Disable hit, stand, double down buttons
    document.getElementById('hit-button').disabled = true;
    document.getElementById('stand-button').disabled = true;
    document.getElementById('double-button').disabled = true;
}

function enableActions() {
    // Enable buttons for player actions
    document.getElementById('hit-button').disabled = false;
    document.getElementById('stand-button').disabled = false;
    document.getElementById('double-button').disabled = false;
}


function playAgain() {
    resetGame();
    document.getElementById('result-popup').style.display = 'none';
    document.getElementById('bet-container').style.display = 'flex';
}

function quitToHome() {
    window.location.href = "index.html";
}

function disableActions() {
    // Disable buttons manually or simply let Quit go back to bet
}

function updateBalanceDisplay() {
    document.querySelectorAll('#balance').forEach(el => el.textContent = 'Balance: $' + money);
}

function clearResult() {
    document.getElementById('result').textContent = '';
}

// Place Bet Logic
function placeBet() {
    const betAmount = parseInt(document.getElementById('bet-input').value);
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > money) {
        alert("Invalid bet amount! Please enter a valid bet.");
        return;
    }

    currentBet = betAmount;
    money -= currentBet;
    updateBalanceDisplay();
    clearResult();

    isDoubleDown = false;

    document.getElementById('bet-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';

    dealInitial();
}

// Reset to Bet screen (now Quit)
function resetGame() {
    deck = [];
    playerHand = [];
    dealerHand = [];
    currentBet = 0;
    isDoubleDown = false;
    clearResult();
    document.getElementById('player-cards').innerHTML = '';
    document.getElementById('dealer-cards').innerHTML = '';
    document.getElementById('player-total').textContent = '';
    document.getElementById('dealer-total').textContent = '';
    document.getElementById('bet-input').value = '';
    document.getElementById('bet-container').style.display = 'flex';
    document.getElementById('game-container').style.display = 'none';

    // Clear dealer card timeouts
    dealerCardTimeouts.forEach(timeout => clearTimeout(timeout));
    dealerCardTimeouts = [];
}

// Quick bet buttons
document.getElementById('quick-bet-5').addEventListener('click', () => setQuickBet(5));
document.getElementById('quick-bet-10').addEventListener('click', () => setQuickBet(10));
document.getElementById('quick-bet-50').addEventListener('click', () => setQuickBet(50));
document.getElementById('quick-bet-100').addEventListener('click', () => setQuickBet(100));

function setQuickBet(amount) {
    document.getElementById('bet-input').value = amount;
}
