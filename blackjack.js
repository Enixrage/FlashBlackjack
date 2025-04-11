let deck, playerHand, dealerHand;
let money = 1000;
let currentBet = 0;
let isDoubleDown = false;

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

    const playerTotal = calculateTotal(playerHand);
    if (playerTotal === 21) {
        // Blackjack!
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
    if (total > 21) endGame();
}

function stand() {
    while (calculateTotal(dealerHand) < 17) {
        dealerHand.push(deck.pop());
    }
    updateUI();
    endGame();
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
        endGame();
    } else {
        stand(); // Player stands after one card
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

    // Display result in the UI instead of alert
    document.getElementById('result').textContent = result;
    document.getElementById('result-container').style.display = 'block';

    // Hide the game controls and the player's cards
    document.querySelector('.button-container').style.display = 'none';
    document.getElementById('dealer-cards').style.display = 'none';
    document.getElementById('player-cards').style.display = 'none';

    updateBalanceDisplay();
}

function disableActions() {
    // Disable buttons manually or simply let Quit go back to bet
}

function updateBalanceDisplay() {
    document.querySelectorAll('#balance').forEach(el => el.textContent = 'Balance: $' + money);
}

function quitToHome() {
    window.location.href = 'index.html'; // Navigate back to the home page
}

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

    // Hide the result and play-again button when resetting the game
    document.getElementById('result-container').style.display = 'none';
    document.querySelector('.button-container').style.display = 'flex';
    document.getElementById('dealer-cards').style.display = 'flex';
    document.getElementById('player-cards').style.display = 'flex';
}

