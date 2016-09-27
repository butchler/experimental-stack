import './styles/card.css';

import { observer } from 'mobx-react';
import React from 'react';

import * as dispatcher from '../dispatcher';
import { flipCard } from '../actions';

@observer
export default class CardView extends React.Component {
    constructor() {
        super();

        this.flipCard = () => dispatcher.dispatch(flipCard.create(this.props.card));
    }

    render() {
        const { card } = this.props;

        let classes = "card";
        classes += card.isFaceUp ? " card-face-up" : " card-face-down";

        if (card.isSelected) { classes += " card-selected"; }
        if (card.isCorrect) { classes += " card-correct"; }
        if (card.isWrong) { classes += " card-wrong"; }

        // TODO: Display furigana.
        return <div className={classes} onClick={this.flipCard}>
            <span className="card-contents">{card.text}</span>
        </div>;
    }
}

CardView.propTypes = {
    card: React.PropTypes.shape({
        isFaceUp: React.PropTypes.bool.isRequired,
        isSelected: React.PropTypes.bool.isRequired,
        isCorrect: React.PropTypes.bool.isRequired,
        text: React.PropTypes.string.isRequired
    })
};
