import { inject, observer } from 'mobx-react';
import CardView from 'components/CardView';
import { flipCard } from 'constants/actions';

export default inject(({ store, dispatch }, { card }) => ({
  text: card.text,
  isSelected: store.game.isCardSelected(card),
  isMatched: card.item.matched,
  flipCard: dispatch(flipCard(card)),
})(observer(CardView));
