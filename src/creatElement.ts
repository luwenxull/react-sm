export type Props = {
  [props: string]: any
}

export type FunctionComponent<T extends object> = (props: T) => Child

export interface FunctionElement<T extends object> {
  type: FunctionComponent<T>,
  states: any[],
  props?: T,
  child?: Child
  parent?: Element
}

export interface DOMElement {
  type: string,
  props?: Props,
  child?: Child,
  parent?: Element,
}

export type Element = DOMElement | FunctionElement<any>
export type Primitive = string | number | null | undefined
export type Child = Element | Primitive

export default function createElement<T extends object>(type: FunctionComponent<T>, props?: T, child?: Element): FunctionElement<T>
export default function createElement(type: string, props?: Props, child?: Element): DOMElement
export default function createElement<T extends object>(type: string | FunctionComponent<T>, props?: Props | T, child?: Element): Element {
  if (typeof type === 'string') {
    return {
      type,
      props,
      child,
    }
  } else {
    return {
      type,
      states: [],
      props,
      child,
    }
  }
}
