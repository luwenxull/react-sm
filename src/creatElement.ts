import { isEmpty, isElement } from './util';

export type Props = {
  [props: string]: any;
};

// export type Children = Child | Child[];

export type Component<T extends Props = {}> = (
  props: T & {
    children?: unknown;
  }
) => unknown;

export type ElementType = Component<any> | string;

export interface BaseElement<T extends ElementType> {
  type: T;
  parent?: FunctionElement | DOMElement;
  depth?: number;
  key?: string;
  _isElement: true;
}

export interface _FunctionElement<T extends Component<any> = Component<any>>
  extends BaseElement<T> {
  _typeName: string;
  states: any[];
  props?: T extends Component<infer U> ? U : never;
  renderElement?: Element;
  children?: any;
}

export interface FunctionElement<T extends Component<any> = Component<any>>
  extends _FunctionElement<T> {
  $dom?: HTMLElement;
}

export interface TextElement extends _FunctionElement<typeof TextComponent> {
  $dom?: Text;
  renderElement?: any;
}

export interface DOMElement<T extends string = any> extends BaseElement<T> {
  props?: Props;
  children: Element[];
  childrenMapByKey: Map<ElementType, Map<string | number, Element>>;
  $dom?: HTMLElement;
}

export const TextComponent: Component = function(props) {
  return props.children;
};

export type Element = FunctionElement | TextElement | DOMElement;
export type Primitive = string | number | null | undefined;

// export type Child = Exclude<Element | Primitive, TextElement>

export type Events =
  | 'onClick'
  | 'onMousemove'
  | 'onMouseenter'
  | 'onMouseleave'
  | 'onChange';
export type EventListener = {
  [key in Events]?: (e: Event) => void;
};

// export type Mounted<T extends Element> = {
//   [key in keyof T]:
// }

export function createTextElement(children: any): TextElement {
  return {
    type: TextComponent,
    props: {},
    states: [],
    children,
    _typeName: TextComponent.name,
    _isElement: true,
  };
}

export default function createElement<T extends Component<any>>(
  type: T,
  props?: T extends Component<infer U>
    ? U & { key?: string } & EventListener
    : never,
  children?: any
): FunctionElement<T>;
export default function createElement<T extends string>(
  type: T,
  props?: Props & EventListener,
  children?: any
): DOMElement<T>;
export default function createElement<T extends ElementType>(
  type: T,
  props?: any,
  children?: any
): Element {
  let element: any;
  if (typeof type === 'string') {
    element = {
      type,
      props,
      children: []
        .concat(children)
        .filter(child => !isEmpty(child))
        .map(child => {
          return isElement(child) ? child : createTextElement(child);
        }),
      _isElement: true,
      childrenMapByKey: new Map(),
    } as DOMElement<string>;
  } else {
    element = {
      type,
      states: [],
      props,
      children,
      _isElement: true,
      _typeName: (<Function>type).name,
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
