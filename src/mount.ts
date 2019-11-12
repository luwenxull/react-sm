import { Element } from './creatElement';
import { isElement, is_FunctionElement, isTextElement } from './util';
import render from './render';
import bindEvents from './bindEvents';
import handleProps from './handleProps';

type DOM = HTMLElement | DocumentFragment;

function appendTextNode(element: any, parent: DOM) {
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
  if (is_FunctionElement(element)) {
    const { renderElement } = element;
    appendTextNode(renderElement, parent);
  } else {
    let dom: DOM;
    if (element.type === 'fragment') {
      dom = document.createDocumentFragment();
    } else {
      dom = document.createElement(element.type);
      element.$dom = dom as HTMLElement;
      element.props && handleProps(element);
    }
    element.children.forEach(child => {
      appendTextNode(child, dom);
    });
    // if (element.type === 'fragment') {
    //   element.$dom =
    // }
    parent.appendChild(dom);
  }
}

export default function mount(element: Element, parent: HTMLElement) {
  render(element);
  if (is_FunctionElement(element)) {
    element.$dom = parent;
  }
  _mount(element, parent);
}
