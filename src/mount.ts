import {
  Element,
  Child,
  ComponentElement,
  TextComponent,
  Primitive,
} from './creatElement';
import { isElement, is_ComponentElement, isTextElement } from './util';
import render from './render';

type DOM = HTMLElement | DocumentFragment;

function append(element: Element | Primitive, parent: DOM) {
  if (isElement(element)) {
    if (isTextElement(element)) {
      const { renderElement } = element;
      element.$dom = document.createTextNode(String(renderElement));
      parent.appendChild(element.$dom);
    } else {
      _mount(element, parent);
    }
  }
}

export function _mount(element: Element, parent: DOM) {
  if (is_ComponentElement(element)) {
    const { renderElement } = element;
    append(renderElement, parent);
  } else {
    let dom: DOM;
    if (element.type === 'fragment') {
      dom = document.createDocumentFragment();
    } else {
      dom = document.createElement(element.type);
      element.$dom = dom as HTMLElement;
    }
    element.children.forEach(child => {
      append(child, dom);
    });
    // if (element.type === 'fragment') {
    //   element.$dom =
    // }
    parent.appendChild(dom);
  }
}

export default function mount(element: Element, parent: HTMLElement) {
  render(element);
  if (is_ComponentElement(element)) {
    element.$dom = parent;
  }
  _mount(element, parent);
}
