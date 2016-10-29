import { startGame, flipCard, unflipCards } from 'constants/actions';

const INITIAL_STATE = {
  items: [],
  cards: [],
  firstCardId: null,
  secondCardId: null,
  numAttempts: 0,
  lastItemMatched: null,
};

export default function reduceGameState(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case startGame.type:
      return {
        ...INITIAL_STATE,
        items: payload.items.map(({ cue, response }) => ({ cue, response, matched: false })),
        cards: payload.cards.map(({ itemId, side }, index) => ({ id: index, itemId, side })),
      };
    case flipCard.type:
      // Don't do anything if the card is already selected or matched.
      if (
        payload === state.firstCardId ||
        payload === state.secondCardId ||
        state.items[state.cards[payload].itemId].matched
      ) {
        return state;
      }

      if (state.firstCardId === null) {
        // If no cards are selected.
        return { ...state, firstCardId: payload };
      } else if (state.secondCardId === null) {
        // If one card is selected.
        const updatedState = {
          ...state,
          secondCardId: payload,
          numAttempts: state.numAttempts + 1,
        };

        // Check if cards match after the player has selected two cards.
        const itemId = state.cards[payload].itemId;
        if (itemId === state.cards[state.firstCardId].itemId) {
          return {
            ...updatedState,
            secondCardId: payload,
            lastItemMatched: itemId,
            items: state.items.map((item, index) => (
              index === itemId ?
              { ...item, matched: true } :
              item
            )),
          };
        }

        return updatedState;
      } else {
        // If two cards are selected.
        return {
          ...state,
          firstCardId: payload,
          secondCardId: null,
        };
      }
    case unflipCards.type:
      return {
        ...state,
        firstCardId: null,
        secondCardId: null,
      };
    default:
  }

  return state;
}
