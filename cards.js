'use strict';

const readline = require('readline');
const _ = require('lodash');
const chalk = require('chalk');

const suites = ['spades', 'clubs', 'hearts', 'diamonds'];
const faces = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'];

const deck = [];
suites.forEach(s => {
  faces.forEach(f => {
    deck.push(`${f} of ${s}`);
  })
})

let NO_OF_DECKS = 0;
const DECKS = [];
const GRAVEYARDS = [];

let PICKED_DECK=1;


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function question(msg) {
  return new Promise(resolve => {
    rl.question(chalk.blue(msg + '\n') + '> ', answer => {
      resolve(answer);
    })
  })
}

async function askDeckNumber() {
  const answer = await question('How many decks?');
  return answer;
}

async function pickAction() {
  console.log('Current Deck: ' + chalk.bold(PICKED_DECK));
  const answer = await question("Pick an action: pick, add, inspect, change_deck, quit");
  if (answer.startsWith('p')) {
    return 'pick';
  } else if (answer.startsWith('a')) {
    return 'add';
  } else if (answer.startsWith('i')) {
    return 'inspect';
  }else if (answer.startsWith('c')) {
    return 'change_deck';
  } else if (answer.startsWith('q')) {
    process.exit();
  } else {
    console.log('Unknown action: ' + answer);
    return pickAction();
  }
}

async function pickCard() {
  const deck_no = PICKED_DECK
  if (deck_no <= 0 || deck_no > NO_OF_DECKS) {
    console.log(chalk.red(`Deck number must be between (1 - ${NO_OF_DECKS})`));
    return pickCard();
  } else {
    if (DECKS[deck_no - 1].length == 0) {
      console.log(chalk.red(`Deck ${deck_no} has no cards left to choose!`));
      return;
    }
    const card = DECKS[deck_no - 1].pop();
    GRAVEYARDS[deck_no - 1].push(card);
    console.log('Picked: ' + chalk.green(card));
    return card;
  }

}

async function addCard () {
  const deck_no = PICKED_DECK;
  const card = GRAVEYARDS[deck_no - 1].pop();
  if (card) {
    DECKS[deck_no - 1].push(card);
    DECKS[deck_no - 1] = _.shuffle(DECKS[deck_no - 1]);
    console.log(chalk.green('Added card'));
    inspectDeck();
  }
  else{
    console.log(chalk.red("No cards to add!"));
  }
  return null;


}


async function inspectDeck() {
  const deck_no = PICKED_DECK;
  if (deck_no <= 0 || deck_no > NO_OF_DECKS) {
    console.log(chalk.red(`Deck number must be between (1 - ${NO_OF_DECKS})`));
    return inspectDeck();
  } else {
    console.log(chalk.magenta('Deck > '));
    console.log(DECKS[deck_no - 1].length);
    console.log(chalk.magenta('Discard > '));
    console.log(GRAVEYARDS[deck_no - 1].length);
    return;
  }

}

async function pickDeck(){
  const answer = await question(`Which deck to use? (1 - ${NO_OF_DECKS})`);
  if (answer.match(/^\d+$/)) {
    const deck_no = Number.parseInt(answer);
    if (deck_no >= 1 && deck_no <= NO_OF_DECKS) {
      PICKED_DECK = deck_no;
      return;
    }
    else {
      console.log(chalk.red('Deck number must be 1 - ${NO_OF_DECKS}'));
      return pickDeck();
    }
  }
}

async function main() {
  NO_OF_DECKS = await askDeckNumber();
  for (let i = 0; i < NO_OF_DECKS; i++) {
    DECKS.push(_.shuffle(_.cloneDeep(deck)));
    GRAVEYARDS.push([]);
  }

  while (true) {
    const action = await pickAction();
    switch(action) {
      case 'pick':
        const card = await pickCard();
        break;
      case 'inspect':
        await inspectDeck();
        break;
      case 'add':
        await addCard();
        break;
      case 'change_deck':
        await pickDeck;
        break;
    }
  }
}
main();