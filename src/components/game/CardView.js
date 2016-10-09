import './styles/card.css';

import React, { PropTypes } from 'react';

export default function CardView({ text, isSelected, isMatched, onClick }) {
  const isFaceUp = isSelected || isMatched;
  const isCorrect = isSelected && isMatched;
  const isWrong = isSelected && !isMatched;

  let classes = "card";
  classes += isFaceUp ? " card-face-up" : " card-face-down";
  if (isSelected) { classes += " card-selected"; }
  if (isCorrect) { classes += " card-correct"; }
  if (isWrong) { classes += " card-wrong"; }

  return (
    <div className={classes} onClick={onClick}>
      <span className="card-contents">{text}</span>
    </div>
  );
}

CardView.propTypes = {
  text: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isMatched: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
