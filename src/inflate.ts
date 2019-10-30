import { Element } from './creatElement';
import { setStates } from './useState';
import { isFunctionElement, isElement } from './util';

export default function inflate(element: Element) {
  if (isFunctionElement(element)) {
    const { states, props, type } = element;
    setStates(states);
    const renderElement = type(
      Object.assign({}, props, { children: element.children })
    );
    // if (
    //   isFunctionElement(renderElement) &&
    //   isFunctionElement(element.renderElement) &&
    //   renderElement.type === element.renderElement.type
    // ) {
    //   renderElement.states = element.renderElement.states;
    // }
    element.renderElement = renderElement;
    if (isElement(renderElement)) {
      renderElement.parent = element;
      inflate(renderElement);
    }
  } else {
    if (element.children instanceof Array) {
      element.children.forEach(child => {
        if (isElement(child)) {
          inflate(child);
        }
      });
    } else if (isElement(element.children)) {
      inflate(element.children);
    } // else nothing to do
  }
}
