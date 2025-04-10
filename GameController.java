package com.blackjack;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;

@Controller
public class GameController {

    @GetMapping("/play")
    public String play(Model model) {

        // Check if there's already a game state in the session, otherwise create one
        GameState gameState = (GameState) session.getAttribute("gameState");
        if (gameState == null) {
            gameState = new GameState();
            session.setAttribute("gameState", gameState);
        }
        
        player.resetHand();
        dealer.resetHand();
        deck = new Deck(); // start new deck each time

        player.addCard(deck.dealCard());
        player.addCard(deck.dealCard());

        dealer.addCard(deck.dealCard());

        model.addAttribute("playerHand", player.getHand());
        model.addAttribute("playerScore", player.getScore());
        model.addAttribute("dealerHand", dealer.getHand());
        model.addAttribute("dealerScore", dealer.getScore());

    return "play"; // Renders play.html
}

    /*@GetMapping("/")
    public String index(HttpSession session, Model model) {
        // Check if there's already a game state in the session, otherwise create one
        GameState gameState = (GameState) session.getAttribute("gameState");
        if (gameState == null) {
            gameState = new GameState();
            session.setAttribute("gameState", gameState);
        }

        // Deal initial cards to player and dealer
        gameState.getPlayer().addCard(gameState.getDeck().dealCard());
        gameState.getPlayer().addCard(gameState.getDeck().dealCard());
        gameState.getDealer().addCard(gameState.getDeck().dealCard());
        gameState.getDealer().addCard(gameState.getDeck().dealCard());

        model.addAttribute("playerHand", gameState.getPlayer().getHand());
        model.addAttribute("playerScore", gameState.getPlayer().getScore());
        model.addAttribute("dealerHand", gameState.getDealer().getHand());
        model.addAttribute("dealerScore", gameState.getDealer().getScore());

        return "index"; // Render index.html
    }*/

    @PostMapping("/hit")
    public String hit(HttpSession session, Model model) {
        GameState gameState = (GameState) session.getAttribute("gameState");

        gameState.getPlayer().addCard(gameState.getDeck().dealCard());
        if (gameState.getPlayer().getScore() > 21) {
            return "bust"; // If player busts
        }

        return "redirect:/play"; // Redirect back to game page
    }

    @PostMapping("/stand")
    public String stand(HttpSession session, Model model) {
        GameState gameState = (GameState) session.getAttribute("gameState");

        // Dealer's turn
        while (gameState.getDealer().getScore() < 17) {
            gameState.getDealer().addCard(gameState.getDeck().dealCard());
        }

        String result;
        if (gameState.getDealer().getScore() > 21 || gameState.getPlayer().getScore() > gameState.getDealer().getScore()) {
            result = "Player wins!";
        } else if (gameState.getPlayer().getScore() < gameState.getDealer().getScore()) {
            result = "Dealer wins!";
        } else {
            result = "It's a tie!";
        }

        model.addAttribute("resultMessage", result);
        model.addAttribute("playerScore", gameState.getPlayer().getScore());
        model.addAttribute("dealerScore", gameState.getDealer().getScore());

        // Reset the game for the next round
        gameState.reset();

        return "result"; // Render result.html
    }
}
