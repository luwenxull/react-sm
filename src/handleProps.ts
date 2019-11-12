import { DOMElement, Props } from './creatElement';
import bindEvents, { Events } from './bindEvents';

const availableEvents: Set<Events> = new Set([
  'onClick',
  'onMousemove',
  'onMouseenter',
  'onMouseleave',
  'onChange',
]);

export default function handleProps(element: DOMElement) {
  if (element.props) {
    Object.keys(element.props).forEach(key => {
      if (availableEvents.has(key as any)) {
        bindEvents(element, key as any);
      } else {
        (<HTMLElement>element.$dom).setAttribute(
          key,
          String((<Props>element.props)[key])
        );
      }
    });
  }
}
