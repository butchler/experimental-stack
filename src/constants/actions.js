import { assert } from './util';

// This file holds all of the actions in the app. According to the Redux
// website, the advantages of keeping all the actions in one place are:
//
// * It helps keep the naming consistent because all action types are gathered
// in a single place.
// * Sometimes you want to see all existing actions before working on a new
// feature. It may be that the action you need was already added by somebody on
// the team, but you didn’t know.
// * The list of action types that were added, removed, and changed in a Pull
// Request helps everyone on the team keep track of scope and implementation of
// new features.
// * If you make a typo when importing an action constant, you will get
// undefined. Redux will immediately throw when dispatching such an action, and
// you’ll find the mistake sooner.
//

// This class just creates some convenience functions to make it slightly
// easier to dispatch and listen to actions.
class ActionType {
    type;

    actionCreator = null;
    propertyNames = null;

    // If you create an action type with:
    //
    // const someAction = new ActionType('SOME_ACTION', 'property1', 'property2');
    //
    // then calling someAction.create(value1, value2) will return an object like
    //
    // {
    //     type: 'SOME_ACTION',
    //     property1: value1,
    //     property2: value2,
    // }
    //
    // You can also pass an action creator function along directly:
    //
    // new ActionType('SOME_ACTION', (property1, property2) => {
    //     return {
    //         property1,
    //         property2,
    //         timestamp: window.performance.now()
    //     };
    // });
    //
    constructor(typeName, ...propertyNames) {
        assert(typeof typeName === 'string', "ActionType requires a typeName");

        this.type = typeName;

        if (propertyNames.length > 0 && typeof propertyNames[0] === 'function') {
            this.actionCreator = propertyNames[0];
        } else {
            for (let i = 0; i < propertyNames.length; i++) {
                assert(typeof propertyNames[i] === 'string', "ActionType property names must be strings");
            }

            this.propertyNames = propertyNames;
        }
    }

    create(...args) {
        if (this.actionCreator !== null) {
            // Use the action creator function if there was one.
            const action = this.actionCreator(...args);

            action.type = this.type;

            return action;
        } else {
            // Assign each argument to the corresponding property.
            assert(args.length === this.propertyNames.length, "Wrong number of arguments to action creator");

            const action = {};

            for (let i = 0; i < this.propertyNames.length; i++) {
                action[this.propertyNames[i]] = args[i];
            }

            action.type = this.type;

            return action;
        }
    }
}


// Actions
// =======
export const setLanguage = new ActionType('SET_LANGUAGE', 'languageCode');

export const startGame = new ActionType('START_GAME', 'numItems');
export const quitGame = new ActionType('QUIT_GAME');
export const flipCard = new ActionType('FLIP_CARD', 'card');
