// Define a Card class 
class Card {

  // use static lists to define which values and suits are acceptable
  static suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
  // the order of the values can be used to determine their relative values
  static values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];

  // constructor that assigns a value and a suit
  // and validates each using the static properties.
  constructor(value, suit) {
    // validate value
    if (!Card.values.includes(value))
      throw new Error("Invalid card value.\nValid values: " + Card.values);

    // validate suit
    if (!Card.suits.includes(suit))
      throw new Error("Invalid card suit.\nValid suits: " + Card.suits);

    this.value = value;
    this.suit = suit;
  }

  // display the card
  display() {
    return this.value + " of " + this.suit;
  }
}

// Define a Deck class that holds an array of Cards
class Deck {

  // define an array of Cards
  constructor() {
    this.cards = [];
    let counter = 0;
    for (let value of Card.values)
      for (let suit of Card.suits)
        this.cards[counter++] = new Card(value, suit);
  }

  // method that shuffles the array of Cards
  shuffle() {
    // for each Card in the array
    for (let i = 0; i < this.cards.length; i++) {
      // find a randome index into the array
      let j = Math.floor(Math.random() * this.cards.length);
      // and swap this Card with the randomly indexed card
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
}

// Player class that holds a name,
// a hand, and points.
class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.points = 0;
  }

  // method that pushes
  // a new card onto the hand array.
  receiveCard(card) {
    this.hand.push(card);
  }

  // method that pops
  // a Card off of the hand array.
  playCard() {
    return this.hand.pop();
  }
}

// Function that shuffles the deck and
// deals to two Players
function dealCards(deck, player0, player1) {

  // have the deck shuffle it's cards.
  deck.shuffle();
  // iterate through the Deck of Cards, two at a time (once for each Player)
  for (let i = 0; i < deck.cards.length; i = i + 2) {
    player0.receiveCard(deck.cards[i]);
    player1.receiveCard(deck.cards[i + 1]);
  }
}

// Function to determine the winner of the
// game and display the results.
function displayWinner(player0, player1) {
  if (player0.points > player1.points)
    console.log(
      `The winner is ${player0.name} with ${player0.points} points. ${player1.name} had ${player1.points} points.`
    );
  else if (player1.points > player0.points)
    console.log(
      `The winner is ${player1.name} with ${player1.points} points. ${player0.name} had ${player0.points} points.`
    );
  else console.log("It was a tie game.");
}

// Function to simulate the game of War
function playWar(player0, player1) {

  // for each card in their hand 
  let numberOfPlays = player0.hand.length;
  for (let i = 0; i < numberOfPlays; i++) {

    // get the next card from each player
    let player0Card = player0.playCard();
    let player1Card = player1.playCard();

    // construct a string describing the play
    let playDescription = `
        ${player0.name} played ${player0Card.display()} and 
        ${player1.name} played ${player1Card.display()}.
        `;

    // define local variables holding the values of the two cards
    // determined by their position in the Card.values array.
    let player0CardValue = Card.values.indexOf(player0Card.value);
    let player1CardValue = Card.values.indexOf(player1Card.value);

    // determine the winner of the hand by comparing the Card values,
    // increment the points for the winning Player, and print
    // a description of the play.
    if (player0CardValue > player1CardValue) {
      console.log(playDescription + `${player0.name} wins!`);
      player0.points++;
    } else if (player1CardValue > player0CardValue) {
      console.log(playDescription + `${player1.name} wins!`);
      player1.points++;
    } else {
      console.log(playDescription + `It's a tie!`);
    }
  }
}

let player0 = new Player("Tom");
let player1 = new Player("Joe");
let deck = new Deck();

dealCards(deck, player0, player1);
playWar(player0, player1);
displayWinner(player0, player1);

