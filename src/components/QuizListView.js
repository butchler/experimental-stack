import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Quiz from 'components/Quiz';

export default function QuizListView({ quizIds }) {
  return (
    <div>
      {quizIds.map((id, index) =>
        <div>
          <h3>Quiz {index + 1}</h3>
          <Quiz quizId={id} />
        </div>
      )}
    </div>
  );
}

QuizListView.propTypes = {
  quizIds: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
};
