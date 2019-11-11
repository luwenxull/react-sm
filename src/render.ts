import createElement, {
  Element,
  DOMElement,
  ElementType,
  TextComponent,
  _ComponentElement,
  createTextElement,
} from './creatElement';
import { setStates } from './useState';
import { is_ComponentElement, isElement, isEmpty } from './util';
import batchUpdate from './batchUpdate';
import logger from './logger';
import { isProduction } from './env';

function reuse(newElement: Element, oldElement: Element) {
  if (is_ComponentElement(newElement)) {
    newElement.states = (<_ComponentElement>oldElement).states;
    newElement.renderElement = (<_ComponentElement>oldElement).renderElement;
  } else {
    newElement.childrenMapByKey = (<DOMElement>oldElement).childrenMapByKey;
  }
  if (oldElement.$dom) {
    newElement.$dom = oldElement.$dom;
  }
}

function renderComponentElement(element: _ComponentElement): _ComponentElement {
  const { states, props, type } = element;
  if (!isProduction) {
    logger.funtionComponentCallStack.push(type.name + '-' + element.depth);
  }
  setStates(states, (index: number, value: unknown) => {
    states[index] = value;
    batchUpdate(element);
  });
  let renderElement = type(
    Object.assign({}, props, { children: element.children })
  );
  if (!isElement(renderElement)) {
    if (!isEmpty(renderElement) && type !== TextComponent) {
      renderElement = createTextElement(renderElement) as any;
    }
  }
  if (isElement(renderElement)) {
    renderElement.parent = element;
    renderElement.depth = (element.depth as number) + 1;
    if (
      isElement(element.renderElement) &&
      element.renderElement.type === renderElement.type
    ) {
      reuse(renderElement, element.renderElement);
    }
    render(renderElement);
  }
  element.renderElement = renderElement as Element;
  return element;
}

function renderDOMElement(element: DOMElement): DOMElement {
  const { childrenMapByKey, type } = element;
  if (!isProduction) {
    logger.funtionComponentCallStack.push(type + '-' + element.depth);
  }
  const newChildrenMapByKey: typeof childrenMapByKey = new Map();
  const childrenNumKey: Map<ElementType, number> = new Map();
  element.children.forEach(child => {
    const { key, type } = child;
    !childrenNumKey.has(type) && childrenNumKey.set(type, 0);
    !newChildrenMapByKey.has(type) && newChildrenMapByKey.set(type, new Map());
    const _map = newChildrenMapByKey.get(type) as Map<string | number, Element>;
    let _key: string | number =
      typeof key === 'string' ? key : (childrenNumKey.get(type) as number);
    if (typeof _key === 'number') {
      childrenNumKey.set(type, _key + 1);
    }
    if (childrenMapByKey.has(type)) {
      const map = childrenMapByKey.get(type) as Map<string | number, Element>;
      if (map.has(_key)) {
        reuse(child, map.get(_key) as Element);
      }
    }
    _map.set(_key, child);
    child.parent = element;
    child.depth = (element.depth as number) + 1;
    render(child);
  });

  element.childrenMapByKey = newChildrenMapByKey;
  return element;
}

export default function render(element: Element): Element {
  if (typeof element.depth !== 'number') {
    element.depth = 0; // root
  }
  if (is_ComponentElement(element)) {
    renderComponentElement(element);
  } else {
    renderDOMElement(element);
  }
  return element;
}
