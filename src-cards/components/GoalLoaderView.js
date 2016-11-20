import React, { PropTypes } from 'react';
import T from 'components/T';
import GameLauncher from 'components/game-launcher/GameLauncher';

const GoalLoaderView = ({ goalLoaded, errorMessage }) => {
  if (goalLoaded) {
    return <GameLauncher />;
  } else if (errorMessage) {
    // TODO: Make translations for error messages.
    return <p className="loading-error"><strong>Error:</strong> {errorMessage}</p>;
  } else {
    return <h2 className="loading"><T>loading</T></h2>;
  }
}

GoalLoaderView.propTypes = {
  goalLoaded: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

export default GoalLoaderView;
