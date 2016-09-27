import './styles/results.css';

import React, { PropTypes } from 'react';
import T from 'components/T';
import StartGameButtons from 'components/StartGameButtons';

export default function GameResultsView({ timeElapsed, numAttempts, items }) {
  // Show the time elapsed, attempts made, and the list of items that appeared in the game.
  return (
    <div className="app-module">
      <div className="results">
        <h1><T>youWon</T></h1>

        <div key="time" className="results-time">
          <label><T>timeElapsed</T></label> {timeElapsed}
        </div>

        <div key="attempts" className="results-attempts">
          <label><T>attemptsMade</T></label> {numAttempts}
        </div>

        <h2><T>wordsMatched</T></h2>

        <table className="results-items">
          <thead>
            <tr>
              <th><T>english</T></th>
              <th><T>japanese</T></th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) =>
              <tr key={index}>
                <td>{item.cue}</td>
                <td>{item.response}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h2><T>playAgain</T></h2>

      <StartGameButtons />
    </div>
  );
}

GameResultsView.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    cue: PropTypes.string.isRequired,
    response: PropTypes.string.isRequired,
  })),
  timeElapsed: PropTypes.string.isRequired,
  numAttempts: PropTypes.number.isRequired,
};
