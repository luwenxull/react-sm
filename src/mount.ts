import { FunctionElement, Element, Child } from './creatElement';
import { setStates } from './useState';

function isElement(element: Child): element is Element {
  return typeof element === 'object' && element !== null;
}

function isFunctionElement(
  element?: Child
): element is FunctionElement<any, any> {
  return (
    typeof element === 'object' &&
    element !== null &&
    typeof element.type === 'function'
  );
}

export default function mount(element: Element) {
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
      mount(renderElement);
    }
  } else {
    if (element.children instanceof Array) {
      element.children.forEach(child => {
        if (isElement(child)) {
          mount(child);
        }
      });
    } else if (isElement(element.children)) {
      mount(element.children);
    } // else nothing to do
  }
}
