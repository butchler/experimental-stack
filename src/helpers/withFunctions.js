import React from 'react';

export default function withFunctions(functions, propTypes) {
  return (Component) => {
    class WithFunctions extends React.Component {
      constructor(...constructorArgs) {
        super(...constructorArgs);

        this.functions = {};
        Object.keys(functions).forEach((name) => {
          const func = functions[name];
          this.functions[name] = (...args) => func(this.props, ...args);
        });
      }

      render() {
        return <Component {...this.functions} {...this.props} />;
      }
    }

    WithFunctions.propTypes = propTypes;

    const componentName = Component.displayName || Component.name || 'Component';
    WithFunctions.displayName = `WithFunctions(${componentName})`;

    return WithFunctions;
  };
}
