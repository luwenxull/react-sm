import createElement, {
  Element,
  Child,
  DOMElement,
  FunctionComponent,
  FunctionElement,
  ElementType,
} from './creatElement';
import { setStates } from './useState';
import { isFunctionElement, isElement, isEmpty } from './util';
import batchUpdate from './batchUpdate';
import logger from './logger';
import { isProduction } from './env';

function reuse(newElement: Element, oldElement: Element) {
  if (isFunctionElement(newElement)) {
    newElement.states = (oldElement as FunctionElement).states;
  } else {
    newElement.childrenMapByKey = (oldElement as DOMElement).childrenMapByKey;
  }
  if (oldElement.$dom) {
    newElement.$dom = oldElement.$dom;
  }
}

export const INNER_TextComponent: FunctionComponent = function(props) {
  return props.children as Child;
};

function renderFunctionElement(element: FunctionElement): FunctionElement {
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
    if (!isEmpty(renderElement) && type !== INNER_TextComponent) {
      renderElement = createElement(INNER_TextComponent, {}, renderElement);
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
  element.renderElement = renderElement;
  return element;
}

function renderDOMElement(element: DOMElement): DOMElement {
  const { childrenMapByKey, type } = element;
  if (!isProduction) {
    logger.funtionComponentCallStack.push(type + '-' + element.depth);
  }
  const newChildrenMapByKey: typeof childrenMapByKey = new Map();
  const childrenNumKey: Map<ElementType, number> = new Map();
  const filteredChildren: Element[] = [];
  element.children.forEach(child => {
    if (!isEmpty(child)) {
      const _child = isElement(child)
        ? child
        : createElement(INNER_TextComponent, {}, child);
      const { key, type } = _child;
      !childrenNumKey.has(type) && childrenNumKey.set(type, 0);
      !newChildrenMapByKey.has(type) &&
        newChildrenMapByKey.set(type, new Map());
      const _map = newChildrenMapByKey.get(type) as Map<
        string | number,
        Element
      >;
      let _key: string | number =
        typeof key === 'string' ? key : (childrenNumKey.get(type) as number);
      if (typeof _key === 'number') {
        childrenNumKey.set(type, _key + 1);
      }
      if (childrenMapByKey.has(type)) {
        const map = childrenMapByKey.get(type) as Map<string | number, Element>;
        if (map.has(_key)) {
          reuse(_child, map.get(_key) as Element);
        }
      }
      _map.set(_key, _child);
      _child.parent = element;
      _child.depth = (element.depth as number) + 1;
      render(_child);
      filteredChildren.push(_child);
    }
  });
  element.children = filteredChildren;
  element.childrenMapByKey = newChildrenMapByKey;
  return element;
}

export default function render(element: Element): Element {
  if (typeof element.depth !== 'number') {
    element.depth = 0; // root
  }
  if (isFunctionElement(element)) {
    renderFunctionElement(element);
  } else {
    renderDOMElement(element);
  }
  return element;
}
