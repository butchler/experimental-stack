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
  path,
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
          <li key={id}><Answer path={[...path, id]} /></li>)}
      </ol>

      <button onClick={addAnswer}>Add answer</button>
      <button onClick={removeQuestion}>Remove question</button>
    </div>
  );
}

QuestionView.propTypes = {
  path: PropTypes.arrayOf(PropTypes.string).isRequired,
  text: PropTypes.string,
  answerIds: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
  addAnswer: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  removeQuestion: PropTypes.func.isRequired,
};
