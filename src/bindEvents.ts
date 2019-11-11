import { ComponentElement, DOMElement, Events } from './creatElement';
import { is_ComponentElement } from './util';

const availableEvents: Set<Events> = new Set([
  'onClick',
  'onMousemove',
  'onMouseenter',
  'onMouseleave',
  'onChange',
]);

function bubble(
  element: ComponentElement | DOMElement,
  type: string,
  e: Event
): void {
  if (element.props && typeof element.props[type] === 'function') {
    element.props[type](e);
  }
  if (element.parent) {
    bubble(element.parent, type, e);
  }
}

function getEventType(type: string): string {
  return type[2].toLowerCase() + type.slice(3);
}

export default function bindEvents(
  element: ComponentElement | DOMElement,
  props: { [props: string]: unknown }
): void {
  if (!is_ComponentElement(element)) {
    Object.keys(props).forEach(key => {
      if (availableEvents.has(key as any)) {
        (<HTMLElement>element.$dom).addEventListener(getEventType(key), e => {
          // e.preventDefault()
          e.stopPropagation();
          bubble(element, key, e);
        });
      }
    });
  }
}
