package com.blackjack;

public class GameState {
    private Deck deck;
    private Player player;
    private Player dealer;
    private int round;

    public GameState() {
        this.deck = new Deck();
        this.player = new Player();
        this.dealer = new Player();
        this.round = 1;
    }

    // Getters and Setters
    public Deck getDeck() { return deck; }
    public Player getPlayer() { return player; }
    public Player getDealer() { return dealer; }
    public int getRound() { return round; }

    public void incrementRound() {
        round++;
    }

    public void reset() {
        this.deck = new Deck();
        this.player.resetHand();
        this.dealer.resetHand();
        this.round = 1;
    }
}

