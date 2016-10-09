import { expr } from 'mobx';
import injector from 'helpers/injector';
import { flipCard } from 'constants/actions';
import CardView from './CardView';

export default injector(({ store, dispatch, card, index }) => ({
  isSelected: expr(() => store.game.isCardSelected(card)),
  text: card.text,
  isSelected: isSelected,
  isMatched: card.item.matched,
  onClick: () => dispatch(flipCard(index)),
}))(CardView);
