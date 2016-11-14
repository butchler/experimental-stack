import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Question from 'components/Question';

export default function QuizView({ quizId, questionIds }) {
  return (
    <div>
      {questionIds.map((id, index) =>
        <div>
          <h4>Question {index + 1}</h4>
          <Question quizId={quizId} questionId={id} />
        </div>
      )}
    </div>
  );
}

QuizView.propTypes = {
  quizId: PropTypes.string.isRequired,
  questionIds: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
};
