import { findClosetParentDom } from '../util';
import createElement, {
  FunctionComponent,
  FunctionElement,
  DOMElement,
} from '../creatElement';
import mount from '../mount';

test('find closet parent with dom', () => {
  let A: FunctionComponent = function(props) {
    return createElement('p', undefined, 'a');
  };
  let B: FunctionComponent = function(props) {
    return createElement('div', undefined, createElement(A, undefined));
  };
  let C: FunctionComponent = function(props) {
    return createElement(B, undefined);
  };
  let c = createElement(C, undefined);
  mount(c, document.createElement('div'));
  const b = c.renderElement as FunctionElement<FunctionComponent>;
  const div = b.renderElement as DOMElement;
  const a = div.children[0];
  expect(c.parent).toBeUndefined();
  expect(findClosetParentDom(a)).toBe(div);
  expect(findClosetParentDom(b)).toBe(c);
  expect(findClosetParentDom(div)).toBe(c);
});
