import React, { PropTypes } from 'react';
import T from 'components/T';

export default function GoalLoaderView({ errorMessage }) {
  // TODO: Make translations for error messages.
  if (errorMessage) {
    return <p className="loading-error"><strong>Error:</strong> {errorMessage}</p>;
  } else {
    return <h2 className="loading"><T>loading</T></h2>;
  }
}

GoalLoaderView.propTypes = {
  errorMessage: PropTypes.string,
};
