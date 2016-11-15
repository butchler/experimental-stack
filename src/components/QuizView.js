import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Question from 'components/Question';

export default function QuizView({ quizId, questionIds, addQuestion }) {
  return (
    <div>
      {questionIds.map((id, index) =>
        <div key={id}>
          <h4>Question {index + 1}</h4>
          <Question quizId={quizId} questionId={id} />
        </div>
      )}

      <button onClick={addQuestion}>Add question</button>
    </div>
  );
}

QuizView.propTypes = {
  quizId: PropTypes.string.isRequired,
  questionIds: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
  addQuestion: PropTypes.func.isRequired,
};
