import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Answer from 'components/Answer';

export default function QuestionView({
  quizId,
  questionId,
  text,
  answerIds,
}) {
  return (
    <div>
      <p>{text}</p>

      <ol>
        {answerIds.map(id =>
          <li><Answer quizId={quizId} questionId={questionId} answerId={id} /></li>)}
      </ol>
    </div>
  );
}

QuestionView.propTypes = {
  quizId: PropTypes.string.isRequired,
  questionId: PropTypes.string.isRequired,
  text: PropTypes.string,
  answerIds: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
};
