import { isEmpty } from './util';

export type Props = {
  [props: string]: any;
};

export type FunctionProps = {
  children?: Child | Child[];
};

export type Children = Child | Child[];

export type UserProps = Props;

export type FunctionComponent<T extends UserProps = any> = (
  props: T & FunctionProps
) => Child;

export type ElementType = FunctionComponent | string;

export interface BaseElement<T extends ElementType> {
  type: T;
  parent?: Element<any>;
  depth?: number;
  key?: string;
  $dom?: HTMLElement | Text;
  _isElement: true;
}

export interface FunctionElement<T extends FunctionComponent = any>
  extends BaseElement<T> {
  states: any[];
  props: T extends FunctionComponent<infer U> ? U : never;
  renderElement?: ReturnType<T>;
  children?: Children;
}

export interface DOMElement<T extends string = any> extends BaseElement<T> {
  props?: Props;
  children: Child[];
  childrenMapByKey: Map<ElementType, Map<string | number, Element>>;
}

export type Element<T extends ElementType = any> = T extends string
  ? DOMElement<T>
  : (T extends FunctionComponent ? FunctionElement<T> : never);
export type Primitive = string | number | null | undefined;
export type Child = Element | Primitive;

export default function createElement<T extends FunctionComponent>(
  type: T,
  props: T extends FunctionComponent<infer U> ? (U & { key?: string }) : never,
  children?: Children
): FunctionElement<T>;
export default function createElement<T extends string>(
  type: T,
  props?: Props,
  children?: Children
): DOMElement<T>;
export default function createElement<T extends ElementType>(
  type: T,
  props?: any,
  children?: Child | Child[]
): Element<T> {
  let element: any;
  if (typeof type === 'string') {
    element = {
      type,
      props,
      children: isEmpty(children) ? [] : ([] as Child[]).concat(children),
      _isElement: true,
      childrenMapByKey: new Map()
    } as DOMElement<string>;
  } else {
    element = {
      type,
      states: [],
      props,
      children,
      _isElement: true
    } as FunctionElement;
  }
  if (
    typeof props === 'object' &&
    props !== null &&
    typeof props.key === 'string'
  ) {
    element.key = props.key;
  }
  return element;
}
