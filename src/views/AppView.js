// Import CSS first so that CSS imported in other files comes after the
// contents of normalize.css in the generated bundle.css.
import './styles/normalize.css';
import './styles/base.css';
import './styles/app.css';

import { observer } from 'mobx-react';
import React from 'react';

import * as dispatcher from '../dispatcher';
import { startGame, quitGame } from '../actions';
import * as constants from '../constants';

import GameView from './GameView';
import ResultsView from './ResultsView';

// Top level component.
@observer
export default class AppView extends React.Component {
    constructor() {
        super();

        // Make event handler in constructor so that we don't have to create a
        // new closure each render.
        this.startEasy = () => dispatcher.dispatch(startGame.create(constants.NUM_ITEMS_EASY));
        this.startMedium = () => dispatcher.dispatch(startGame.create(constants.NUM_ITEMS_MEDIUM));
        this.startHard = () => dispatcher.dispatch(startGame.create(constants.NUM_ITEMS_HARD));

        this.quitGame = () => {
            if (confirm(this.props.store.strings.confirmQuit)) {
                dispatcher.dispatch(quitGame.create());
            }
        };
    }

    render() {
        const { game, goal, strings } = this.props.store;

        if (!goal.isLoaded) {
            // Wait until the goal is loaded before allowing the player to
            // start the game.
            if (goal.errorMessage !== null) {
                return <div className="app"><p className="loading-error"><strong>{"Error:"}</strong> {goal.errorMessage}</p></div>;
            } else {
                return <div className="app"><h2 className="loading">{strings.loading}</h2></div>;
            }
        } else if (game === null) {
            // When the app first starts, show an explanation of the game and
            // let the player start it.
            return <div className="app">
                <div className="app-module">

                    <h1 className="title">{strings.memoryGame}</h1>

                    <p style={{marginTop: '40px'}}>{strings.learnWordsParagraph}</p>

                    <p style={{marginBottom: '40px'}}>{strings.flipOverParagraph}</p>

                    <button className="start-game-button" onClick={this.startEasy}>{strings.startEasy}</button>
                    <button className="start-game-button" onClick={this.startMedium}>{strings.startMedium}</button>
                    <button className="start-game-button" onClick={this.startHard}>{strings.startHard}</button>

                </div>
            </div>;
        } else if (!game.showResults) {
            // Show the game in progress.
            return <div className="app">

                <GameView store={this.props.store} />

                <button className="start-game-button" onClick={this.quitGame}>{strings.quitGame}</button>

            </div>;
        } else {
            // Show the results of the game after the game finishes.
            return <div className="app">
                <div className="app-module">

                    <ResultsView store={this.props.store} />

                    <h2>{strings.playAgain}</h2>

                    <button className="start-game-button" onClick={this.startEasy}>{strings.startEasy}</button>
                    <button className="start-game-button" onClick={this.startMedium}>{strings.startMedium}</button>
                    <button className="start-game-button" onClick={this.startHard}>{strings.startHard}</button>

                </div>
            </div>;
        }
    }
}

// Nested shapes in propTypes doesn't seem to be working.
// The following propTypes should cause a warning to be displayed because of
// the BOGUS required property in store.game, but it doesn't show anything:
/*AppView.propTypes = {
    store: React.PropTypes.shape({
        game: React.PropTypes.shape({
            showResults: React.PropTypes.bool.isRequired,
            BOGUS: React.PropTypes.bool.isRequired
        }),
        goal: React.PropTypes.shape({
            isLoaded: React.PropTypes.bool.isRequired
        }),
        strings: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
    })
};*/

// For now, just use shallow propTypes.
AppView.propTypes = {
    store: React.PropTypes.shape({
        game: React.PropTypes.object,
        goal: React.PropTypes.object.isRequired,
        strings: React.PropTypes.objectOf(React.PropTypes.string).isRequired
    })
};
