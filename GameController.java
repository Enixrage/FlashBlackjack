package com.blackjack;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Controller
public class GameController {

    private Deck deck = new Deck();
    private Player player = new Player();
    private Player dealer = new Player();

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("playerHand", player.getHand());
        model.addAttribute("playerScore", player.getScore());
        model.addAttribute("dealerHand", dealer.getHand());
        model.addAttribute("dealerScore", dealer.getScore());
        return "index"; // This will render index.html
    }

    @PostMapping("/hit")
    public String hit(Model model) {
        player.addCard(deck.dealCard());
        if (player.getScore() > 21) {
            return "bust"; // If player busts
        }
        return "redirect:/";
    }

    @PostMapping("/stand")
    public String stand(Model model) {
        model.addAttribute("playerScore", player.getScore());
        model.addAttribute("dealerScore", dealer.getScore());

        String result;
        if (dealer.getScore() > 21 || player.getScore() > dealer.getScore()) {
            result = "Player wins!";
        } else if (player.getScore() < dealer.getScore()) {
            result = "Dealer wins!";
        } else {
            result = "It's a tie!";
        }
        
        model.addAttribute("resultMessage", result);
        return "result"; // This will render result.html after the game ends
    }

        private void resetGame() {
        deck = new Deck();
        player.resetHand();
        dealer.resetHand();
        player.addCard(deck.dealCard());
        player.addCard(deck.dealCard());   //After new round the game resets
        dealer.addCard(deck.dealCard());
        dealer.addCard(deck.dealCard());
    }
}
