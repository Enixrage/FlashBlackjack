package com.blackjack;

import java.util.ArrayList;

public class Player {
    private ArrayList<Card> hand;
    private int score;

    public Player() {
        hand = new ArrayList<>();
        score = 0;
    }

    public void addCard(Card card) {
        hand.add(card);
        score += card.getValue();
    }

    public int getScore() {
        return score;
    }

    public void resetHand() {
        hand.clear();
        score = 0;
    }

    public ArrayList<Card> getHand() {
        return hand;
    }
}
