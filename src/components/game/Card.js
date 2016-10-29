import { connect } from 'react-redux';
import { startGame, flipCard, unflipCards } from 'constants/actions';
import { CARDS } from 'reducers/app';
import CardView from './CardView';

const INITIAL_STATE = {
  cards: [],
  prevFirstCardId: null,
  prevSecondCardId: null,
};

export function reduceCards(state = INITIAL_STATE, gameState, { type, payload }) {
  let nextCards = state.cards;

  const doUnflipCard = (id) => {
    if (id !== null) {
      nextCards[id] = {
        ...nextCards[id],
        isSelected: false,
        isFaceUp: gameState.items[gameState.cards[id].itemId].matched,
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
        isCorrect: (
          gameState.secondCardId !== null && gameState.items[gameState.cards[id].itemId].matched
        ),
        isWrong: (
          gameState.secondCardId !== null && !gameState.items[gameState.cards[id].itemId].matched
        ),
      };
    }
  };

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
  (cardState, { flipCard }, { id }) => ({
    ...cardState,
    onClick: () => flipCard(id),
  })
)(CardView);
