import { FunctionElement, Element, Child, DOMType } from './creatElement';

declare const process: any;

export function isElement(element: Child): element is Element {
  return typeof element === 'object' && element !== null && element._isElement;
}

export function isFunctionElement(element?: Child): element is FunctionElement {
  return (
    typeof element === 'object' &&
    element !== null &&
    typeof element.type === 'function'
  );
}

export function isEmpty(val: any) {
  return val === undefined || val === null;
}

export function findClosetParentDom(element: Element): HTMLElement | Text {
  if (element.parent) {
    if (element.parent.$dom) {
      return element.parent.$dom;
    } else {
      return findClosetParentDom(element.parent);
    }
  } else {
    return element.$dom as HTMLElement;
  }
}

export function findDeeperdDom(element: Element) {
  let results: DOMType[] = []
  if (element.$dom) {
    return element.$dom;
  } else {
    if (isFunctionElement(element)) {

    }
  }
  // if ()
}
