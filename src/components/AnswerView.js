import React, { PropTypes } from 'react';

export default function AnswerView({ text, isCorrect }) {
  if (isCorrect) {
    return <em>{text}</em>;
  } else {
    return <span>{text}</span>;
  }
}

AnswerView.propTypes = {
  text: PropTypes.string,
  isCorrect: PropTypes.bool.isRequired,
};
