import { isEmpty } from './util';

export type Props = {
  [props: string]: any;
};

export type FunctionProps = {
  children?: Child | Child[];
};

export type Children = Child | Child[];

export type UserProps = Props;

export type FunctionComponent<T extends UserProps = {}> = (
  props: T & FunctionProps
) => Child;

export interface BaseElement {
  parent?: Element;
  depth?: number;
  key?: string;
  $dom?: HTMLElement | Text;
  _isElement: true;
}

export interface FunctionElement<T extends FunctionComponent<any>>
  extends BaseElement {
  type: T;
  states: any[];
  props: T extends FunctionComponent<infer U> ? U : never;
  renderElement?: ReturnType<T>;
  children?: Children;
}

export interface DOMElement<T extends string = any> extends BaseElement {
  type: T;
  props?: Props;
  children: Child[];
  keyedChildren: Map<
    string | FunctionComponent<any>,
    Map<string | number, Element>
  >;
}

export type Element = DOMElement | FunctionElement<FunctionComponent<any>>;
export type Primitive = string | number | null | undefined;
export type Child = Element | Primitive;

export default function createElement<T extends FunctionComponent<any>>(
  type: T,
  props: T extends FunctionComponent<infer U> ? (U & { key?: string }) : never,
  children?: Children
): FunctionElement<T>;
export default function createElement<T extends string>(
  type: T,
  props?: Props,
  children?: Children
): DOMElement<T>;
export default function createElement<
  T extends string | FunctionComponent<any>
>(
  type: T,
  props?: any,
  children?: Child | Child[]
): FunctionElement<FunctionComponent<any>> | DOMElement {
  let element: Element;
  if (typeof type === 'string') {
    element = {
      type,
      props,
      children: isEmpty(children) ? [] : ([] as Child[]).concat(children),
      _isElement: true,
      keyedChildren: new Map()
    };
  } else {
    element = {
      type: type as FunctionComponent<any>,
      states: [],
      props,
      children,
      _isElement: true
    };
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
