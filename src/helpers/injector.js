import React from 'react';
import { observer, inject } from 'mobx-react';

export default function injector(mapProps) {
  return (WrappedComponent) => {
    function Injector(props) {
      const newProps = Object.assign({}, mapProps(props), props);

      return React.createElement(WrappedComponent, newProps);
    }

    Injector.displayName = `Injector(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return inject('store', 'dispatch')(observer(Injector));
  };
}
