import './styles/game.css';

import { observer } from 'mobx-react';
import React from 'react';

import CardView from './CardView';

@observer
export default class GameView extends React.Component {
    render() {
        const { game, strings } = this.props.store;

        return <div className="game">

            <div className="game-info">
                <span className="game-time"><label>{strings.timeElapsed}</label> {game.timeElapsedString}</span>
                <span className="game-attempts"><label>{strings.attemptsMade}</label> {game.numAttempts}</span>
            </div>

            <div className="game-cards">
                {game.cards.map((card) => <CardView card={card} key={card.key} />)}
            </div>

        </div>;
    }
}

GameView.propTypes = {
    store: React.PropTypes.shape({
        game: React.PropTypes.object.isRequired,
        strings: React.PropTypes.objectOf(React.PropTypes.string).isRequired
    })
};
