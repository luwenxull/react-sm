import { FunctionElement, Element, Child } from './creatElement';

export function isElement(element: Child): element is Element {
  return typeof element === 'object' && element !== null;
}

export function isFunctionElement(
  element?: Child
): element is FunctionElement<any, any> {
  return (
    typeof element === 'object' &&
    element !== null &&
    typeof element.type === 'function'
  );
}