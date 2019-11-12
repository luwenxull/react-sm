import { FunctionElement, DOMElement } from './creatElement';
import { is_FunctionElement } from './util';

export type Events =
  | 'onClick'
  | 'onMousemove'
  | 'onMouseenter'
  | 'onMouseleave'
  | 'onChange';

function bubble(
  element: FunctionElement | DOMElement,
  type: string,
  e: Event
): void {
  let stop = false;
  if (element.props && typeof element.props[type] === 'function') {
    element.props[type](e, () => {
      stop = true;
    });
  }
  if (element.parent && !stop) {
    bubble(element.parent, type, e);
  }
}

function getEventType(type: string): string {
  return type[2].toLowerCase() + type.slice(3);
}

export default function bindEvents(element: DOMElement, type: Events): void {
  (<HTMLElement>element.$dom).addEventListener(getEventType(type), e => {
    // e.preventDefault()
    e.stopPropagation();
    bubble(element, type, e);
  });
}
