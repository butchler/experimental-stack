import 'components/game-launcher/styles/results.css';

import React, { PropTypes } from 'react';
import T from 'components/T';
import StartGameButtons from 'components/game-launcher/StartGameButtons';

/**
 * Show the time elapsed, attempts made, and the list of items that appeared in the game.
 */
export default function GameResultsView({ timeElapsed, numAttempts, items }) {
  return (
    <div className="app-module">
      <div className="results">
        <h1><T>youWon</T></h1>

        <div key="time" className="results-time">
          <span className="label"><T>timeElapsed</T></span> {timeElapsed}
        </div>

        <div key="attempts" className="results-attempts">
          <span className="label"><T>attemptsMade</T></span> {numAttempts}
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
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  timeElapsed: PropTypes.string.isRequired,
  numAttempts: PropTypes.number.isRequired,
};
