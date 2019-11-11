import { isEmpty, isElement } from './util';

export type Props = {
  [props: string]: any;
};

export type InnerFunctionCompProps = {
  children?: Children;
};

export type Children = Child | Child[];

export type Component<T extends Props = any> = (
  props: T & InnerFunctionCompProps
) => Child;

export type ElementType = Component | string;
// export type DOMType = HTMLElement | Text

export interface BaseElement<T extends ElementType> {
  type: T;
  parent?: ComponentElement | DOMElement;
  depth?: number;
  key?: string;
  // $dom?: HTMLElement | Text;
  _isElement: true;
}

export interface _ComponentElement<T extends Component = Component>
  extends BaseElement<T> {
  _typeName: string;
  states: any[];
  props: T extends Component<infer U> ? U : never;
  renderElement?: Element;
  children?: Children;
}

export interface ComponentElement<T extends Component = Component>
  extends _ComponentElement<T> {
  $dom?: HTMLElement;
}

export interface TextElement extends _ComponentElement<typeof TextComponent> {
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
  return props.children as Child;
};

export type Element = ComponentElement | TextElement | DOMElement;
export type Primitive = string | number | null | undefined;

export type Child = ComponentElement | DOMElement | Primitive;

// export type Mounted<T extends Element> =

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

export default function createElement<T extends Component>(
  type: T,
  props: T extends Component<infer U> ? U & { key?: string } : never,
  children?: Children
): ComponentElement<T>;
export default function createElement<T extends string>(
  type: T,
  props?: Props,
  children?: Children
): DOMElement<T>;
export default function createElement<T extends ElementType>(
  type: T,
  props?: any,
  children?: Child | Child[]
): Element {
  let element: any;
  if (typeof type === 'string') {
    element = {
      type,
      props,
      children: ([] as Child[])
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
    } as ComponentElement;
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
