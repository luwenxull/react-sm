import {
  Element,
  Child,
  FunctionComponent,
  FunctionElement
} from './creatElement';
import { isElement, isFunctionElement, isEmpty } from './util';
import render, { INNER_TextComponent } from './render';

type DOM = HTMLElement | DocumentFragment;

function append(element: Child, parent: DOM) {
  if (isElement(element)) {
    if (element.type === INNER_TextComponent) {
      const { renderElement } = element as FunctionElement<any>;
      if (!isEmpty(renderElement)) {
        element.$dom = document.createTextNode(String(renderElement));
        parent.appendChild(element.$dom);
      }
    } else {
      _mount(element, parent);
    }
  } else {
    // ignore undefine and null
    if (!isEmpty(element)) {
      parent.appendChild(document.createTextNode(String(element)));
    }
  }
}

function _mount(element: Element, parent: DOM) {
  if (isFunctionElement(element)) {
    const { renderElement } = element;
    append(renderElement, parent);
  } else {
    let dom: DOM;
    if (element.type === 'INNER_fragement') {
      dom = document.createDocumentFragment();
    } else {
      dom = document.createElement(element.type);
      element.$dom = dom as HTMLElement;
    }
    element.children.forEach(child => {
      // if (child)
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
  if (isFunctionElement(element)) {
    element.$dom = parent;
  }
  _mount(element, parent);
}
