import { FunctionElement, Element, Child } from './creatElement';

declare const process: any;

export function isElement(element: Child): element is Element {
  return typeof element === 'object' && element !== null && element._isElement;
}

export function isFunctionElement(
  element?: Child
): element is FunctionElement<any> {
  return (
    typeof element === 'object' &&
    element !== null &&
    typeof element.type === 'function'
  );
}

export function isEmpty(val: any) {
  return val === undefined || val === null;
}

export function findClosetParentWithDom(element: Element): Element {
  if (element.parent) {
    if (element.parent.$dom) {
      return element.parent;
    } else {
      return findClosetParentWithDom(element.parent);
    }
  } else {
    return element;
  }
}

export function findRelatedDom(element: Element) {
  if (element.$dom) {
    return element.$dom;
  } else {
  }
  // if ()
}
