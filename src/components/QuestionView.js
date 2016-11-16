import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Answer from 'components/Answer';
import withFunctions from 'helpers/withFunctions';

export default withFunctions({
  onTextChange: ({ setQuestionText }, event) => setQuestionText(event.target.value),
}, {
  setQuestionText: PropTypes.func.isRequired,
})(QuestionView);

function QuestionView({
  quizId,
  questionId,
  text,
  answerIds,
  addAnswer,
  onTextChange,
  removeQuestion,
}) {
  return (
    <div>
      <input type="text" value={text} onChange={onTextChange} />

      <ol>
        {answerIds.map(id =>
          <li key={id}><Answer quizId={quizId} questionId={questionId} answerId={id} /></li>)}
      </ol>

      <button onClick={addAnswer}>Add answer</button>
      <button onClick={removeQuestion}>Remove question</button>
    </div>
  );
}

QuestionView.propTypes = {
  quizId: PropTypes.string.isRequired,
  questionId: PropTypes.string.isRequired,
  text: PropTypes.string,
  answerIds: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
  addAnswer: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  removeQuestion: PropTypes.func.isRequired,
};
