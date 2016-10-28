import { reduce } from 'helpers/operators';

export const action$ = new Subject();

export function dispatch(action) {
  action$.next(action);
}

export const currentLanguage$ = new Subject();
action$::reduce(reduceCurrentLanguage).subscribe(currentLanguage$);

export function reduceCurrentLanguage(state = 'en', action) {
  if (action.type === setLanguage.type) {
    return action.payload;
  }

  return state;
}
