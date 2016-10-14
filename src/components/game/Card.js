import { expr } from 'mobx';
import injector from 'helpers/injector';
import { flipCard } from 'constants/actions';
import CardView from './CardView';

export default injector(({ store, dispatch, card }) => ({
  isSelected: expr(() => store.game.isCardSelected(card)),
  isPairSelected: store.game.firstCardSelected && store.game.secondCardSelected,
  text: card.text,
  isMatched: card.item.matched,
  onClick: () => dispatch(flipCard(card.id)),
}))(CardView);
