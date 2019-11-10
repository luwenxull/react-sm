import {
  ComponentElement,
  Element,
  Child,
  Primitive,
  TextElement,
  TextComponent,
} from './creatElement';

declare const process: any;

export function isElement(element: Element | Primitive): element is Element {
  return typeof element === 'object' && element !== null && element._isElement;
}

export function isComponentElement(
  element: Element
): element is ComponentElement | TextElement {
  return (
    typeof element === 'object' &&
    element !== null &&
    typeof element.type === 'function'
  );
}

export function isTextElement(element: Element): element is TextElement {
  return element.type === TextComponent;
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
  // let results: DOMType[] = [];
  if (element.$dom) {
    return element.$dom;
  } else {
    if (isComponentElement(element)) {
    }
  }
  // if ()
}
