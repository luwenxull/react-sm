import { Element, Child } from './creatElement';
import { isElement, isFunctionElement } from './util';
import render from './render';

function _mount(element: Child, parent: HTMLElement) {
  if (isElement(element)) {
    mount(element, parent);
  } else {
    parent.appendChild(document.createTextNode(String(element)));
  }
}

export default function mount(element: Element, parent: HTMLElement) {
  render(element);
  if (isFunctionElement(element)) {
    const { renderElement } = element;
    _mount(renderElement, parent);
  } else {
    const dom = document.createElement(element.type);
    parent.appendChild(dom);
    if (element.children instanceof Array) {
      element.children.forEach(child => {
        _mount(child, dom);
      });
    } else {
      _mount(element.children, dom);
    }
  }
}
