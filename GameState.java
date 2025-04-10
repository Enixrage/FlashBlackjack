import java.util.ArrayList;

public class GameState {
    private Deck deck;
    private ArrayList<Player> players; // List of players (up to 5)
    private Player dealer;
    private int round;

    public GameState() {
        this.deck = new Deck();
        this.players = new ArrayList<>();
        this.dealer = new Player();
        this.round = 1;
        
        for (int i = 0; i < 5; i++) {
            players.add(new Player()); //creates up to 5 users to play
        }
    }

    public Deck getDeck() { return deck; }
    public ArrayList<Player> getPlayers() { return players; }
    public Player getDealer() { return dealer; }
    public int getRound() { return round; }

    public void incrementRound() {
        round++;
    }

    public void reset() {
        this.deck = new Deck();
        this.dealer.resetHand();
        this.round = 1;
        for (Player player : players) {
            player.resetHand();
        }
    }
}
