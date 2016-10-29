import 'components/game/styles/card.css';

import React, { PropTypes } from 'react';

export default function CardView({ text, isFaceUp, isSelected, isCorrect, isWrong, onClick }) {
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
  isFaceUp: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  isWrong: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
