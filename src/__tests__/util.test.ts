import { findClosetParentDom } from '../util';
import createElement, {
  Component,
  ComponentElement,
  DOMElement,
} from '../creatElement';
import mount from '../mount';

test('find closet parent with dom', () => {
  let A: Component = function(props) {
    return createElement('p', undefined, 'a');
  };
  let B: Component = function(props) {
    return createElement('div', undefined, createElement(A, undefined));
  };
  let C: Component = function(props) {
    return createElement(B, undefined);
  };
  let c = createElement(C, undefined);
  mount(c, document.createElement('div'));
  const b = c.renderElement as ComponentElement;
  const div = b.renderElement as DOMElement;
  const a = div.children[0] as ComponentElement;
  expect(c.parent).toBeUndefined();
  expect(findClosetParentDom(a)).toBe(div.$dom);
  expect(findClosetParentDom(b)).toBe(c.$dom);
  expect(findClosetParentDom(div)).toBe(c.$dom);
});
