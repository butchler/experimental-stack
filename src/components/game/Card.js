import { connect } from 'react-redux';
import { startGame, flipCard, unflipCards } from 'constants/actions';
import { CARDS } from 'reducers/app';
import CardView from './CardView';

//export function reduceCards(state = { cardStates: [], wasPairSelected: false }, gameState) {
  //const isPairSelected = gameState.firstCardId !== null && gameState.secondCardId !== null;
  //const cardStates = gameState.cards.map(card =>
    //reduceCard(cardStates[card.id], card, state.wasPairSelected, isPairSelected, gameState));

  //return { cardStates, wasPairSelected: isPairSelected };
//}

//const INITIAL_CARD_STATE = {
  //isSelected: false,
  //isMatched: false,
//};

//function reduceCard(cardState = INITIAL_CARD_STATE, card, gameState, wasPairSelected, isPairSelected) {
  //const isSelected = card.id === gameState.firstCardId;
  //const isMatched = gameState.items[card.itemId].matched;

  //if (isSelected !== cardState.isSelected ||
    //isMatched !== cardState.isMatched ||
    //(isSelected && isPairSelected !== wasPairSelected)) {
    //return {
      //isSelected,
      //isFaceUp: isSelected || isMatched,
      //isCorrect: isSelected && isPairSelected && isMatched,
      //isWrong: isSelected && isPairSelected && !isMatched,
    //};
  //}

  //return card;
//}

const INITIAL_STATE = {
  cards: [],
  prevFirstCardId: null,
  prevSecondCardId: null,
};

export function reduceCards(state = INITIAL_STATE, gameState, { type, payload }) {
  const doUnflipCard = (id) => {
    if (id !== null) {
      nextCards[id] = {
        ...nextCards[id],
        isSelected: false,
        isFaceUp: gameState.cards[id].matched,
        isCorrect: false,
        isWrong: false,
      };
    }
  };

  const doFlipCard = (id) => {
    if (id !== null) {
      nextCards[id] = {
        ...nextCards[id],
        isSelected: true,
        isFaceUp: true,
        isCorrect: gameState.secondCardId !== null && gameState.cards[id].matched,
        isWrong: gameState.secondCardId !== null && !gameState.cards[id].matched,
      };
    }
  };

  let nextCards = state.cards;

  switch (type) {
    case startGame.type:
      nextCards = payload.cards.map(card => ({
        text: gameState.items[card.itemId][card.side],
        isSelected: false,
        isFaceUp: false,
        isCorrect: false,
        isWrong: false,
      }));
      break;
    case unflipCards.type:
      nextCards = [...state.cards];
      doUnflipCard(state.prevFirstCardId);
      doUnflipCard(state.prevSecondCardId);
      break;
    case flipCard.type:
      nextCards = [...state.cards];
      doUnflipCard(state.prevFirstCardId);
      doUnflipCard(state.prevSecondCardId);
      doFlipCard(gameState.firstCardId);
      doFlipCard(gameState.secondCardId);
      break;
    default:
  }

  return {
    cards: nextCards,
    prevFirstCardId: gameState.firstCardId,
    prevSecondCardId: gameState.secondCardId,
  };
}

export default connect(
  (state, { id }) => state[CARDS].cards[id],
  { flipCard },
  (stateProps, { flipCard }, { id }) => ({
    onClick: () => flipCard(id),
  })
)(CardView);
