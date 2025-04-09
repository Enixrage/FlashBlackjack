package com.blackjack;

import java.util.ArrayList;
import java.util.Collections;

public class Deck {
    private ArrayList<Card> deck;

    public Deck() {
        deck = new ArrayList<>();
        String[] suits = { "Hearts", "Diamonds", "Clubs", "Spades" };
        String[] ranks = { "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A" };
        int[] values = { 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11 };  // Face cards (J, Q, K) and Ace

        for (String suit : suits) {
            for (int i = 0; i < ranks.length; i++) {
                deck.add(new Card(suit, ranks[i], values[i]));
            }
        }
        Collections.shuffle(deck);
    }

    public Card dealCard() {
        return deck.remove(0);
    }

    public int getSize() {
        return deck.size();
    }
}
