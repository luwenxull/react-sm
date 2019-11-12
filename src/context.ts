import { Component, Element } from './creatElement';
import logger from './logger';
import { getRenderingFunctionElement } from './rendering';

interface Render<T> {
  (v: T): unknown;
}

interface Context<T> {
  Provider: Component<{ value: T }>;
  Consumer: Component;
}

function findContextValue<T>(
  element: Element,
  provider: Component<{ value: T }>,
  defaultValue: T
): T {
  if (
    element.type === provider &&
    (<object>element.props).hasOwnProperty('value')
  ) {
    return element.props.value;
  } else {
    if (element.parent) {
      return findContextValue(element.parent, provider, defaultValue);
    } else {
      return defaultValue;
    }
  }
}

export default function createContext<T>(value: T): Context<T> {
  const Provider: Component<{ value?: T }> = function(props) {
    if (props.children instanceof Array) {
      logger.warn(
        'Context Provider Received an array. If you need a list of elements, you can use "fragment"'
      );
    }
    return props.children;
  };
  const Consumer: Component = props => {
    if (typeof props.children === 'function') {
      return props.children(
        findContextValue(getRenderingFunctionElement(), Provider, value)
      );
    } else {
      logger.warn('Context Consumer expect to received a function as child');
      return undefined;
    }
  };
  const context: Context<T> = {
    Provider,
    Consumer,
  };
  return context;
}
