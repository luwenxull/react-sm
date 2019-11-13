import {
  FunctionElement,
  Element,
  TextElement,
  TextComponent,
  _FunctionElement,
} from './creatElement';

export function isElement(element: any): element is Element {
  return typeof element === 'object' && element !== null && element._isElement;
}

export function is_FunctionElement(
  element: any
): element is FunctionElement | TextElement {
  return isElement(element) && typeof element.type === 'function';
}

export function isTextElement(element: any): element is TextElement {
  return is_FunctionElement(element) && element.type === TextComponent;
}

export function isEmpty(val: any) {
  return val === undefined || val === null;
}

/**
 * 寻找最接近的上层dom
 *
 * @export
 * @param {Element} element
 * @returns {HTMLElement}
 */
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
  if (is_FunctionElement(element)) {
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
