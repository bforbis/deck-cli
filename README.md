# deck-cli
A command line program that lets you draw from an arbitrary amount of decks

## Why does this exist?

Once upon a time, in a cabin in the woods, I was play-testing a cool new game with some friends.
This game was a battle of miniatures.
Space marines were hitting orcs and goblins with rocket powered hammers.
Tiny girls in mech suits were opening fire with their gatling cannons.
It was a fun time!

However, we needed standard 64 card decks to play this game, and lo and behold, those decks were not available.
So, me being me, I wrote a command line program to act as our decks.
Could we have just driven to the store to buy some card decks for $1?
Yes, of course! But where's the fun in that?

## Usage
Start the program with the following, then tell it how many decks to use
```
npm start

> deck-cli@1.0.0 start /Users/bforbis/git/deck-cli
> node cards.js

How many decks?
> 3
Current Deck: 1
Pick an action: pick, add, inspect, change_deck, quit
> 
```
The following actions can be done:

- **pick**: Pick a card from the current active deck
- **add**: Adds a card from the discard pile back to the top of the current deck, then shuffles the deck
- **inspect**: Prints info about how many cards are left in the active deck.
- **change_deck**: Changes the active deck
