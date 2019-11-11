import {
  ComponentElement,
  Element,
  Child,
  Primitive,
  TextElement,
  TextComponent,
  _ComponentElement,
} from './creatElement';

declare const process: any;

export function isElement(element: any): element is Element {
  return typeof element === 'object' && element !== null && element._isElement;
}

export function is_ComponentElement(
  element: any
): element is ComponentElement | TextElement {
  return isElement(element) && typeof element.type === 'function';
}

export function isTextElement(element: any): element is TextElement {
  return is_ComponentElement(element) && element.type === TextComponent;
}

export function isEmpty(val: any) {
  return val === undefined || val === null;
}

export function findClosetParentDom(element: Element): HTMLElement {
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

export function findDeeperDom(element: Element): Array<HTMLElement | Text> {
  if (is_ComponentElement(element)) {
    if (element.type === TextComponent) {
      return [element.$dom as Text];
    } else if (isElement(element.renderElement)) {
      return findDeeperDom(element.renderElement);
    } else {
      return [];
    }
  } else {
    if (element.$dom) {
      return [element.$dom];
    } else {
      let results: Array<HTMLElement | Text> = [];
      element.children.forEach(child => {
        results = results.concat(findDeeperDom(child));
      });
      return results;
    }
  }
}
