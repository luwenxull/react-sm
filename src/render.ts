import createElement, {
  Element,
  Child,
  DOMElement,
  FunctionComponent,
  FunctionElement
} from './creatElement';
import { setStates } from './useState';
import { isFunctionElement, isElement } from './util';
import batchUpdate from './batchUpdate';
import logger from './logger';
import { isProduction } from './env';

function reuse(newElement: Element, oldElement: Element) {
  if (isFunctionElement(newElement)) {
    newElement.states = (oldElement as FunctionElement<
      FunctionComponent<any>
    >).states;
  } else {
    newElement.childrenMapByKey = (oldElement as DOMElement).childrenMapByKey;
  }
}

export const INNER_TextComponent: FunctionComponent = function(props) {
  return props.children as Child;
};

export const Fragement: FunctionComponent = function(props) {
  return createElement('INNER_fragement', {}, props.children);
};

export default function render(element: Element): Element {
  if (isElement(element)) {
    if (typeof element.depth !== 'number') {
      element.depth = 0; // root
    }
    if (isFunctionElement(element)) {
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
        if (type !== INNER_TextComponent) {
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
    } else {
      const { childrenMapByKey, type } = element;
      if (!isProduction) {
        logger.funtionComponentCallStack.push(type + '-' + element.depth);
      }
      const newChildrenMapByKey: typeof childrenMapByKey = new Map();
      const childrenNumKey = new Map();
      element.children.forEach((child, index) => {
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
          typeof key === 'string' ? key : childrenNumKey.get(type);
        if (childrenMapByKey.has(type)) {
          const map = childrenMapByKey.get(type) as Map<
            string | number,
            Element
          >;
          if (typeof _key === 'number') {
            childrenNumKey.set(type, _key + 1);
          }
          if (map.has(_key)) {
            reuse(_child, map.get(_key) as Element);
          }
        } else {
          if (typeof _key === 'number') {
            childrenNumKey.set(type, _key + 1);
          }
        }
        _map.set(_key, _child);
        element.children[index] = _child;
        _child.parent = element;
        _child.depth = (element.depth as number) + 1;
        render(_child);
      });
      element.childrenMapByKey = newChildrenMapByKey;
    }
  }
  return element;
}
