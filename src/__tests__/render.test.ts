import render from '../render';
import createElement, {
  Component,
  FunctionElement,
  DOMElement,
  Element,
  TextComponent,
} from '../creatElement';
import { useState } from '../useState';
import { onBatchUpdated } from '../batchUpdate';

test('render: simple', () => {
  let A: Component = function() {
    return undefined;
  };
  const a = createElement(A, {});
  render(a);
  expect(a.renderElement).toBeUndefined();

  let B: Component = function() {
    return 'b';
  };
  const b = createElement(B, {});
  render(b);
  const text = b.renderElement as FunctionElement;
  expect(text.type).toBe(TextComponent);
  expect(text.renderElement).toBe('b');

  const c = createElement('div', undefined, [undefined, '1']);
  render(c);
  expect(c.children.length).toBe(1);
});

test('render: hierachy', () => {
  let A: Component<{ text: string }> = function(props) {
    const [i] = useState(0);
    return `${props.text}-${i}`;
  };
  let B: Component = function() {
    const [reverse] = useState(false);
    let children = [
      createElement(A, { text: 'a1' }),
      createElement(A, { text: 'a2', key: 'a2' }),
      createElement(A, { text: 'a3' }),
    ];
    if (reverse) {
      children = children.reverse();
    }
    return createElement('div', {}, children);
  };
  const b = createElement(B, {});
  render(b);
  expect(b.states).toEqual([false]);
  expect(b.depth).toBe(0);
  expect(b.parent).toBeUndefined();
  const div = b.renderElement as DOMElement;
  expect(div.depth).toBe(1);
  expect(div.parent).toBe(b);
  const children = div.children;
  expect(children.length).toBe(3);
  const [a1, a2, a3] = children as FunctionElement[];
  expect(a1.key).toBeUndefined();
  expect(a2.key).toBe('a2');
  expect(a3.key).toBeUndefined();
  expect((div._childrenMapByKey.get(A) as Map<any, any>).get(0)).toBe(a1);
  expect((div._childrenMapByKey.get(A) as Map<any, any>).get('a2')).toBe(a2);
  expect((div._childrenMapByKey.get(A) as Map<any, any>).get(1)).toBe(a3);
  // const t1 = a1.renderElement as FunctionElement
  const t2 = a2.renderElement as FunctionElement;
  expect(t2.type).toBe(TextComponent);
  expect(t2.renderElement).toBe('a2-0');
  const b2 = Object.assign({}, b);
  a1.states = [1];
  a2.states = [2];
  a3.states = [3];
  b2.states = [true];
  render(b2);
  const [a11, a12, a13] = (b2.renderElement as DOMElement)
    .children as FunctionElement[];
  const t11 = a11.renderElement as FunctionElement;
  const t12 = a12.renderElement as FunctionElement;
  const t13 = a13.renderElement as FunctionElement;
  expect(t11.renderElement).toBe('a3-1');
  expect(t12.renderElement).toBe('a2-2');
  expect(t13.renderElement).toBe('a1-3');
});

// test('set state', done => {
//   let _setName: any;
//   let _setAge: any;
//   let _setB: any;
//   let A: FunctionComponent = jest.fn(function() {
//     const [name, setName] = useState('a');
//     const [age, setAge] = useState(20);
//     _setName = setName;
//     _setAge = setAge;
//     return `${name}:${age}`;
//   });
//   let B: FunctionComponent = jest.fn(function() {
//     const [, setB] = useState('');
//     _setB = setB;
//     return createElement(A, undefined);
//   });
//   const b = createElement(B, undefined);
//   render(b);
//   const a = b.renderElement as any;
//   expect(a.renderElement).toBe('a:20');
//   const updated = jest.fn(() => {
//     console.log('updated');
//     expect(a.renderElement).toBe('aa:21');
//     done();
//   });
//   onBatchUpdated(updated);
//   _setAge(21);
//   _setName('aa');
//   _setB();
//   console.log('....');
//   // expect(a.renderElement).toBe('aa:21');
//   // done()
// });
