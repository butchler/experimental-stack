import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Quiz from 'components/Quiz';

export default function QuizListView({ quizIds, addQuiz }) {
  return (
    <div>
      {quizIds.map((id, index) =>
        <div key={id}>
          <h3>Quiz {index + 1}</h3>
          <Quiz path={[id]} />
        </div>
      )}

      <button onClick={addQuiz}>Add quiz</button>
    </div>
  );
}

QuizListView.propTypes = {
  quizIds: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
  addQuiz: PropTypes.func.isRequired,
};
