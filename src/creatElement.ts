export type Props = {
  [props: string]: any;
};

export type FunctionProps = {
  children?: Child | Child[];
};

export type UserProps = Props | undefined;

export type FunctionComponent<T extends UserProps = undefined> = (
  props: T extends undefined ? FunctionProps : (T & FunctionProps)
) => Child;

export interface BaseElement {
  children?: Child | Child[];
  parent?: Element;
}

export interface FunctionElement<T extends FunctionComponent>
  extends BaseElement {
  type: T;
  states: any[];
  props: T extends FunctionComponent<infer U> ? U : never;
  renderElement?: Child;
}

export interface DOMElement extends BaseElement {
  type: string;
  props?: Props;
}

export type Element = DOMElement | FunctionElement<any>;
export type Primitive = string | number | null | undefined;
export type Child = Element | Primitive;

export default function createElement<T extends FunctionComponent<any>>(
  type: T,
  props: T extends FunctionComponent<infer U> ? U : never,
  children?: Child | Child[]
): FunctionElement<T>;
export default function createElement<T extends string>(
  type: T,
  props?: Props,
  children?: Child | Child[]
): DOMElement;
export default function createElement<T extends FunctionComponent>(
  type: T,
  props?: any,
  children?: Child | Child[]
): FunctionElement<T> | DOMElement {
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
