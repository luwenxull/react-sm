import { Element, Child } from './creatElement';
import { isElement, isFunctionElement } from './util';
import render from './render';

type DOM = HTMLElement | DocumentFragment;

function _mount(element: Child, parent: DOM) {
  if (isElement(element)) {
    mount(element, parent);
  } else {
    parent.appendChild(document.createTextNode(String(element)));
  }
}

export default function mount(element: Element, parent: DOM) {
  render(element);
  if (isFunctionElement(element)) {
    const { renderElement } = element;
    _mount(renderElement, parent);
  } else {
    let dom: DOM;
    if (element.type === 'fragment') {
      dom = document.createDocumentFragment();
    } else {
      dom = document.createElement(element.type);
    }
    if (element.children instanceof Array) {
      element.children.forEach(child => {
        _mount(child, dom);
      });
    } else {
      _mount(element.children, dom);
    }
    element.$dom = dom;
    parent.appendChild(dom);
  }
}
