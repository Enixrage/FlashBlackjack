package com.blackjack;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
        while (dealer.getScore() < 17) {
            dealer.addCard(deck.dealCard());
        }
        return "result"; // This will render result.html after the game ends
    }
}
