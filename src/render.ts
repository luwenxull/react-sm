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
  if (newElement.type === oldElement.type) {
    if (isFunctionElement(newElement)) {
      newElement.states = (oldElement as FunctionElement<
        FunctionComponent<any>
      >).states;
    } else {
      newElement.keyedChildren = (oldElement as DOMElement).keyedChildren;
    }
  }
}

export const _TextComponent: FunctionComponent = function(props) {
  return props.children as Child;
};

export default function render(element: Element): Element {
  if (isElement(element)) {
    if (typeof element.depth !== 'number') {
      element.depth = 0; // root
    }
    if (isFunctionElement(element)) {
      const { states, props, type } = element;
      setStates(states, (index: number, value: unknown) => {
        states[index] = value;
        batchUpdate(element);
      });
      if (!isProduction) {
        logger.funtionComponentCallStack.push(type.name);
      }
      let renderElement = type(
        Object.assign({}, props, { children: element.children })
      );
      if (!isElement(renderElement)) {
        if (type !== _TextComponent) {
          renderElement = createElement(
            _TextComponent,
            {},
            renderElement
          );
        }
      }
      if (isElement(renderElement)) {
        renderElement.parent = element;
        renderElement.depth = (element.depth as number) + 1;
        if (isElement(element.renderElement)) {
          reuse(renderElement, element.renderElement);
        }
        render(renderElement);
      }
      element.renderElement = renderElement;
    } else {
      const { keyedChildren } = element;
      const _keyedChildren: typeof keyedChildren = {};
      element.children.forEach((child, index) => {
        const _child = isElement(child)
          ? child
          : createElement(_TextComponent, {}, child);
        const { key } = _child;
        if (typeof key === 'string') {
          if (keyedChildren[key]) {
            reuse(_child, keyedChildren[key]);
          }
          _keyedChildren[key] = _child;
        }
        element.children[index] = _child;
        _child.parent = element;
        _child.depth = (element.depth as number) + 1;
        render(_child);
      });
      element.keyedChildren = _keyedChildren;
    }
  }
  return element;
}
