export type DOMProps = {
  [props: string]: any;
};

export type FunctionProps = {
  children?: Child | Child[];
};

export type FunctionComponent<T extends object> = (
  props: T & FunctionProps
) => Child;

export interface BaseElement {
  children?: Child | Child[];
  parent?: Element;
}

export interface FunctionElement<
  T extends FunctionComponent<U>,
  U extends object
> extends BaseElement {
  type: T;
  states: any[];
  props?: U;
  renderElement?: Child;
}

export interface DOMElement extends BaseElement {
  type: string;
  props?: DOMProps;
}

export type Element = DOMElement | FunctionElement<any, any>;
export type Primitive = string | number | null | undefined;
export type Child = Element | Primitive;

export default function createElement<
  T extends FunctionComponent<U>,
  U extends object
>(type: T, props?: U, children?: Child | Child[]): FunctionElement<T, U>;
export default function createElement(
  type: string,
  props?: DOMProps,
  children?: Child | Child[]
): DOMElement;
export default function createElement<
  T extends FunctionComponent<U>,
  U extends object
>(
  type: string | T,
  props?: DOMProps | U,
  children?: Child | Child[]
): FunctionElement<T, U> | DOMElement {
  if (typeof type === 'string') {
    return {
      type,
      props,
      children: children
    };
  } else {
    return {
      type,
      states: [],
      props: props as any,
      children: children
    };
  }
}
