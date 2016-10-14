import 'components/game/styles/card.css';

import React, { PropTypes } from 'react';

export default function CardView({ text, isSelected, isPairSelected, isMatched, onClick }) {
  const isFaceUp = isSelected || isMatched;
  const isCorrect = isSelected && isPairSelected && isMatched;
  const isWrong = isSelected && isPairSelected && !isMatched;

  let classes = 'card';
  classes += isFaceUp ? ' card-face-up' : ' card-face-down';
  if (isSelected) { classes += ' card-selected'; }
  if (isCorrect) { classes += ' card-correct'; }
  if (isWrong) { classes += ' card-wrong'; }

  return (
    <button className={classes} onClick={onClick}>
      <span className="card-contents">{text}</span>
    </button>
  );
}

CardView.propTypes = {
  text: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isMatched: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
