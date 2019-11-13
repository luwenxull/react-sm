import { FunctionElement, DOMElement } from './creatElement';
import { is_FunctionElement } from './util';

/**
 * 支持的事件类型
 */
export type Events =
  | 'onClick'
  | 'onMousemove'
  | 'onMouseenter'
  | 'onMouseleave'
  | 'onChange';

/**
 * 事件冒泡
 * 基于element的层级关系，而不是dom的层级关系
 *
 * @param {(FunctionElement | DOMElement)} element
 * @param {string} type
 * @param {Event} e
 */
function bubble(
  element: FunctionElement | DOMElement,
  type: string,
  e: Event
): void {
  // 是否终止冒泡
  let stop = false;
  if (element.props && typeof element.props[type] === 'function') {
    element.props[type](e, () => {
      stop = true;
    });
  }
  if (element.parent && !stop) {
    bubble(element.parent, type, e);
  }
}

/**
 * 获取事件类型
 * onClick => click
 *
 * @param {string} type
 * @returns {string}
 */
function getEventType(type: string): string {
  return type[2].toLowerCase() + type.slice(3);
}

/**
 * 给domelement绑定事件
 *
 * @export
 * @param {DOMElement} element
 * @param {Events} type
 */
export default function bindEvents(element: DOMElement, type: Events): void {
  const fn = function(e: Event) {
    e.stopPropagation();
    bubble(element, type, e);
  };
  const eType = getEventType(type);
  (<HTMLElement>element.$dom).addEventListener(eType, fn);
  element._bindedEventsManager[type] = () => {
    (<HTMLElement>element.$dom).removeEventListener(eType, fn);
  };
}
