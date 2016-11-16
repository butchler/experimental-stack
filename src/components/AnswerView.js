import React, { PropTypes } from 'react';
import withFunctions from 'helpers/withFunctions';

export default withFunctions({
  onTextChange: ({ setAnswerText }, event) => setAnswerText(event.target.value),
}, {
  setAnswerText: PropTypes.func.isRequired,
})(AnswerView);

function AnswerView({
  text,
  isCorrect,
  onTextChange,
  toggleAnswerIsCorrect,
  removeAnswer,
}) {
  return (
    <span>
      <input type="text" value={text} onChange={onTextChange} />

      <input type="checkbox" checked={isCorrect} onClick={toggleAnswerIsCorrect} />

      <button onClick={removeAnswer}>Remove answer</button>
    </span>
  );
}

AnswerView.propTypes = {
  text: PropTypes.string,
  isCorrect: PropTypes.bool.isRequired,
  onTextChange: PropTypes.func.isRequired,
  toggleAnswerIsCorrect: PropTypes.func.isRequired,
  removeAnswer: PropTypes.func.isRequired,
};
