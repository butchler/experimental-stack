import Store from 'helpers/Store';

const GlobalStore = Store();

export const Action = GlobalStore.Action;
export const Reducer = GlobalStore.Reducer;
export const createStoreInstance = GlobalStore.createStoreInstance;
