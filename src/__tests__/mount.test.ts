import mount from '../mount';
import createElement, {
  FunctionComponent,
  FunctionElement
} from '../creatElement';
import { useState } from '../useState';

test('mount dom element', () => {
  function A() {
    return 'a';
  }
  const a = createElement(A);
  const div = createElement('div', {}, a);
  expect(div.children).toBe(a);
  expect(a.renderElement).toBeUndefined();
  mount(div);
  expect(div.children).toBe(a);
  expect(a.renderElement).toBe('a');
});

test('mount funcition element', () => {
  let A: FunctionComponent<{ text: string }> = function(props) {
    const [count] = useState(0);
    return props.text + count;
  };
  let B: FunctionComponent<any> = function() {
    return createElement(
      A,
      {
        text: 'props from b '
      },
      ['child from b']
    );
  };
  const b = createElement(B, undefined, ['b']);
  expect(b.states.length).toBe(0);
  expect(b.children).toEqual(['b']);
  expect(b.renderElement).toBeUndefined();
  mount(b);
  const renderElement = b.renderElement as FunctionElement<any, any>;
  expect(renderElement.type).toBe(A);
  expect(renderElement.renderElement).toBe('props from b 0');
});
