import { DOMElement, FunctionElement, Element, Child } from "./creatElement";
import { setStates } from './useState'

function isElement(element: any): element is Element {
  return typeof element === 'object'
    && element !== null
}

function isFunctionElement(element: any): element is FunctionElement<any> {
  return typeof element === 'object'
    && element !== null
    && typeof element.type === 'function'
}

export default function mount(element: Element) {
  if (isFunctionElement(element)) {
    const { states, props, type } = element
    setStates(states)
    const child = type(props)
    if (
      isFunctionElement(child)
      && isFunctionElement(element.child)
      && child.type === element.child.type
    ) {
      child.states = element.child.states
    }
    element.child = child
    // mount(child)
    if (isElement(child)) {
      child.parent = element
      mount(child)
    } else {
      // TODO
    }
  } else {
    // TODO
  }
}
