import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Question from 'components/Question';

export default function QuizView({
  path,
  questionIds,
  addQuestion,
  removeQuiz,
}) {
  return (
    <div>
      {questionIds.map((id, index) =>
        <div key={id}>
          <h4>Question {index + 1}</h4>
          <Question path={[...path, id]} />
        </div>
      )}

      <button onClick={addQuestion}>Add question</button>
      <button onClick={removeQuiz}>Remove quiz</button>
    </div>
  );
}

QuizView.propTypes = {
  path: PropTypes.arrayOf(PropTypes.string).isRequired,
  questionIds: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
  addQuestion: PropTypes.func.isRequired,
  removeQuiz: PropTypes.func.isRequired,
};
