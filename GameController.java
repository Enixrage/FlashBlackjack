package com.blackjack;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@@SessionAttributes("gameState")
public class GameController {


    @GetMapping("/")
    public String index(Model model) {
        GameState gameState = (GameState) model.getAttribute("gameState");
        if (gameState == null) {
            gameState = new GameState();
            model.addAttribute("gameState", gameState);
        }

        // Deal cards to players and dealer
        for (Player player : gameState.getPlayers()) {
            player.addCard(gameState.getDeck().dealCard());
            player.addCard(gameState.getDeck().dealCard());
        }
        gameState.getDealer().addCard(gameState.getDeck().dealCard());
        gameState.getDealer().addCard(gameState.getDeck().dealCard());

        // Add the hands and scores to the model
        model.addAttribute("players", gameState.getPlayers());
        model.addAttribute("dealerHand", gameState.getDealer().getHand());
        model.addAttribute("dealerScore", gameState.getDealer().getScore());

        return "index"; // Renders index.html
    }

    @PostMapping("/hit")
   public String hit(Model model) {
        GameState gameState = (GameState) model.getAttribute("gameState");

        // You need to track which player is currently making a move.
        Player currentPlayer = gameState.getPlayers().get(0); // For now, it’s player 1 (you can modify this)

        currentPlayer.addCard(gameState.getDeck().dealCard());
        if (currentPlayer.getScore() > 21) {
            return "bust"; // If the player busts
        }

        return "redirect:/";
    }

    @PostMapping("/stand")
   public String stand(Model model) {
        GameState gameState = (GameState) model.getAttribute("gameState");

        // Dealer's turn (dealer plays only after all players stand)
        while (gameState.getDealer().getScore() < 17) {
            gameState.getDealer().addCard(gameState.getDeck().dealCard());
        }

        String result;
        for (Player player : gameState.getPlayers()) {
            if (gameState.getDealer().getScore() > 21 || player.getScore() > gameState.getDealer().getScore()) {
                result = "Player wins!";
            } else if (player.getScore() < gameState.getDealer().getScore()) {
                result = "Dealer wins!";
            } else {
                result = "It's a tie!";
            }

            model.addAttribute("resultMessage", result);
        }

        model.addAttribute("dealerScore", gameState.getDealer().getScore());
        return "result"; // Renders result.html
    }
}
