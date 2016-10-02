import './styles/game.css';

import React, { PropTypes } from 'react';
import Card from './Card';
import T from 'components/T';

export default function GameView({ timeElapsed, numAttempts, cards }) {
  return (
    <div className="game">

      <div className="game-info">
        <span className="game-time"><label><T>timeElapsed</T></label> {timeElapsed}</span>
        <span className="game-attempts"><label><T>attemptsMade</T></label> {numAttempts}</span>
      </div>

      <div className="game-cards">
        {cards.map(card => <Card card={card} key={card.id} />)}
      </div>

    </div>
  );
}

GameView.propTypes = {
  timeElapsed: PropTypes.string.isRequired,
  numAttempts: PropTypes.number.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any.isRequired,
  })),
};
