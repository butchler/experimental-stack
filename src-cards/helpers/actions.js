export function action(type, mapPayload) {
  if (typeof type !== 'string') {
    throw new TypeError('action() requires a type name.');
  }

  function createAction(payload) {
    return {
      type,
      payload: mapPayload ? mapPayload(payload) : payload,
    };
  }

  createAction.type = type;

  return createAction;
}

export function asError(type, payload) {
  if (typeof type !== 'string') {
    throw new TypeError('error() requires a type name.');
  }

  return { type, error: true, payload };
}

export function shape(typeOrShape) {
  return object => checkShape(typeOrShape, object);
}

function checkShape(typeOrShape, object) {
  if (typeof typeOrShape === 'string') {
    if (typeof object !== typeOrShape) { // eslint-disable-line valid-typeof
      throw new TypeError(`shape() expected type '${typeOrShape}' but got type '${typeof object}'.`);
    }
  } else if (Array.isArray(typeOrShape)) {
    if (typeOrShape.length !== 1) {
      throw new TypeError('shape() arrays should only have a length of one.');
    }

    if (!Array.isArray(object)) {
      throw new TypeError(`shape() expected an array but got type '${typeof object}'.`);
    }

    const arrayTypeOrShape = typeOrShape[0];

    object.forEach(item => checkShape(arrayTypeOrShape, item));
  } else if (typeOrShape && typeof typeOrShape === 'object') {
    if (!(object && typeof object === 'object')) {
      throw new TypeError(`shape() expected an object but got type '${typeof object}'.`);
    }

    Object.keys(typeOrShape).forEach(key => checkShape(typeOrShape[key], object[key]));
  }

  return object;
}
