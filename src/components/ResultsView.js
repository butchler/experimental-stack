import './styles/results.css';

import { observer } from 'mobx-react';
import React from 'react';

@observer
export default class ResultsView extends React.Component {
    render() {
        const { game, strings } = this.props.store;

        // Show the time elapsed, attempts made, and the list of items that appeared in the game.
        return <div className="results">
            <h1>{strings.youWon}</h1>

            <div className="results-time"><label>{strings.timeElapsed}</label> {game.timeElapsedString}</div>
            <div className="results-attempts"><label>{strings.attemptsMade}</label> {game.numAttempts}</div>

            <h2>{strings.wordsMatched}</h2>

            <table className="results-items">
                <thead>
                    <tr><th>{strings.english}</th><th>{strings.japanese}</th></tr>
                </thead>

                <tbody>
                    {game.items.map((item) => <tr key={item.item.id}><td>{item.item.cue.text}</td><td>{item.item.response.text}</td></tr>)}
                </tbody>
            </table>
        </div>;
    }
}

ResultsView.propTypes = {
    store: React.PropTypes.shape({
        game: React.PropTypes.object.isRequired,
        strings: React.PropTypes.objectOf(React.PropTypes.string).isRequired
    })
};
