let deck, playerHand, dealerHand;

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

function dealInitial() {
    deck = createDeck();
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];
    updateUI();
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

function renderCard(card) {
    return `<div class="card">${card.value}${card.suit}</div>`;
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
    if (playerTotal > 21) result = 'You bust! Dealer wins.';
    else if (dealerTotal > 21) result = 'Dealer busts! You win!';
    else if (playerTotal > dealerTotal) result = 'You win!';
    else if (playerTotal < dealerTotal) result = 'Dealer wins.';
    else result = 'Push (Tie).';
    document.getElementById('result').textContent = result;
}

window.onload = dealInitial;
