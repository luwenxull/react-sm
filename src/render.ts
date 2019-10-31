import { Element } from './creatElement';
import { setStates } from './useState';
import { isFunctionElement, isElement } from './util';
import batchUpdate from './batchUpdate';

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
      const renderElement = type(
        Object.assign({}, props, { children: element.children })
      );
      if (
        isFunctionElement(renderElement) &&
        isFunctionElement(element.renderElement) &&
        renderElement.type === element.renderElement.type
      ) {
        renderElement.states = element.renderElement.states;
      }
      element.renderElement = renderElement;
      if (isElement(renderElement)) {
        renderElement.parent = element;
        renderElement.depth = (element.depth as number) + 1;
        render(renderElement);
      }
    } else {
      if (element.children instanceof Array) {
        element.children.forEach(child => {
          if (isElement(child)) {
            child.depth = (element.depth as number) + 1;
            render(child);
          }
        });
      } else if (isElement(element.children)) {
        element.children.depth = (element.depth as number) + 1;
        render(element.children);
      } // else nothing to do
    }
  }
  return element;
}
