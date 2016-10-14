import React from 'react';
import { observer, inject } from 'mobx';

export default function injector(mapProps) {
  return (WrappedComponent) => {
    function Injector(props) {
      const newProps = Object.assign({}, mapProps(props), props);

      return React.createElement(WrappedComponent, newProps);
    }

    return inject('store', 'dispatch', observer(Injector));
  };
}
