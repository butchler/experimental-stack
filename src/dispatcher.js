import { assert } from './util';

// It's not necessary for an app this simple, but having a central dispatcher
// like the Flux architecture can be useful in case a single action affects
// multiple unrelated stores.
//
// This super simple dispatcher doesn't do much, but it could be extended to do
// things like logging actions for debugging, helping to manage dependencies
// between stores like the Dispatcher.waitFor() in Facebook's Flux
// (https://facebook.github.io/flux/docs/overview.html#what-about-that-dispatcher)
// (although in many cases Mobx should eliminate the need for waitFor because
// you can use a @computed property to do something whenever the state in
// another store changes due to an action),
// or more.

const listeners = [];

export function register(listener) {
    assert(typeof listener === 'function', "Action listener must be function");

    listeners.push(listener);

    return listener;
}

export function unregister(listener) {
    assert(typeof listener === 'function', "Action listener must be function");

    const index = listeners.indexOf(listener);

    if (index !== -1) {
        listeners.splice(index, 1);
    }
}

export function dispatch(action) {
    assert(action && action.type && typeof action.type === 'string', "Action must have a valid 'type' property.");

    listeners.forEach((listener) => listener(action));
}
