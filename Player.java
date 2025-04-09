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
        
        //Adjust for Aces if score goes over 21
        int aceCount = (int) hand.stream().filter(c -> c.getRank().equals("A")).count();
        while (score > 21 && aceCount > 0) {
            score -= 10; //count Ace as 1 instead of 11
            aceCount--;
        }
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
