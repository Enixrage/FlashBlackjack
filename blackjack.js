let deck, playerHand, dealerHand;
let money = 1000; // Starting money for the player
let currentBet = 0;

// Map suit symbols to the characters for your image naming convention
const suitMap = {
    '♠': 'S',
    '♥': 'H',
    '♣': 'C',
    '♦': 'D'
};

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

// Render card image
function renderCard(card) {
    const suitChar = suitMap[card.suit]; // Convert suit to character for URL
    const cardImageUrl = `cards.php?card=${card.value}${suitChar}`;
    return `<img class="card" src="${cardImageUrl}" alt="${card.value}${card.suit}">`;
}

function updateUI() {
    const dealerCards = document.getElementById('dealer-cards');
    const playerCards = document.getElementById('player-cards');
    const dealerTotal = document.getElementById('dealer-total');
    const playerTotal = document.getElementById('player-total');
    dealerCards.innerHTML = dealerHand.map(card => renderCard(card)).join('');
    playerCards.innerHTML = playerHand.map(card => renderCard(card)).join('');
    dealerTotal.textContent = 'Total: ' + calculateTotal(dealerHand);
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
    updateUI();
}

function hit() {
    playerHand.push(deck.pop());
    updateUI();
    const total = calculateTotal(playerHand);
    if (total > 21) endGame();
}

function stand() {
    while (calculateTotal(dealerHand) < 17) {
        dealerHand.push(deck.pop());
    }
    updateUI();
    endGame();
}

function endGame() {
    const playerTotal = calculateTotal(playerHand);
    const dealerTotal = calculateTotal(dealerHand);
    let result = '';
    if (playerTotal > 21) {
        result = 'You bust! Dealer wins.';
    } else if (dealerTotal > 21) {
        result = 'Dealer busts! You win!';
        money += currentBet * 2; // Player wins, double the bet
    } else if (playerTotal > dealerTotal) {
        result = 'You win!';
        money += currentBet * 2; // Player wins, double the bet
    } else if (playerTotal < dealerTotal) {
        result = 'Dealer wins.';
    } else {
        result = 'Push (Tie).';
        money += currentBet; // Tie, return the bet
    }

    document.getElementById('result').textContent = result;
    updateBalanceDisplay();
}

function updateBalanceDisplay() {
    document.getElementById('balance').textContent = 'Balance: $' + money;
}

function placeBet() {
    const betAmount = parseInt(document.getElementById('bet-input').value);
    
    // Check if the bet is valid
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > money) {
        alert("Invalid bet amount! Please enter a valid bet.");
        return;
    }

    // Deduct the bet from the player's balance
    currentBet = betAmount;
    money -= currentBet;
    updateBalanceDisplay();

    // Hide the bet container after the bet is placed
    document.getElementById('bet-container').style.display = 'none';

    // Start the game by dealing the initial cards
    dealInitial();
}

function resetGame() {
    deck = createDeck();
    playerHand = [];
    dealerHand = [];
    currentBet = 0;
    updateUI();
    document.getElementById('bet-container').style.display = 'block'; // Show bet input again
}
