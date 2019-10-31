import { Element } from './creatElement';
import { setStates } from './useState';
import { isFunctionElement, isElement } from './util';

export default function inflate(element: Element, subsequent: boolean = false) {
  if (isFunctionElement(element)) {
    const { states, props, type } = element;
    setStates(states, (index: number, value: unknown) => {
      states[index] = value;
      inflate(element, true);
    });
    const renderElement = type(
      Object.assign({}, props, { children: element.children })
    );
    if (
      subsequent &&
      isFunctionElement(renderElement) &&
      isFunctionElement(element.renderElement) &&
      renderElement.type === element.renderElement.type
    ) {
      renderElement.states = element.renderElement.states;
    }
    element.renderElement = renderElement;
    if (isElement(renderElement)) {
      renderElement.parent = element;
      inflate(renderElement, subsequent);
    }
  } else {
    if (element.children instanceof Array) {
      element.children.forEach(child => {
        if (isElement(child)) {
          inflate(child, subsequent);
        }
      });
    } else if (isElement(element.children)) {
      inflate(element.children, subsequent);
    } // else nothing to do
  }
}
