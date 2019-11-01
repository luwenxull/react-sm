import render from '../render';
import createElement, {
  FunctionComponent,
  FunctionElement,
  DOMElement
} from '../creatElement';
import { useState } from '../useState';
import { onBatchUpdated } from '../batchUpdate';

test('render element', () => {
  let A: FunctionComponent<{ text: string }> = function(props) {
    return createElement('p', {}, `${props.text}`);
  };
  let B: FunctionComponent = function() {
    return createElement('div', {}, [
      createElement(A, { text: 'b1' }),
      createElement(A, { text: 'b2' })
    ]);
  };
  let C: FunctionComponent<any> = function() {
    return createElement(B, undefined);
  };
  const c = createElement(C, undefined);
  expect(c.states.length).toBe(0);
  expect(c.renderElement).toBeUndefined();
  expect(c.depth).toBeUndefined();
  render(c);
  expect(c.depth).toBe(0);
  const b = c.renderElement as FunctionElement<any>;
  expect(b.depth).toBe(1);
  expect(b.type).toBe(B);
  const div = b.renderElement as DOMElement;
  expect(div.type).toBe('div');
  expect(div.depth).toBe(2);
  const [a1, a2] = div.children as Array<FunctionElement<typeof A>>;
  expect((div.children as any).length).toBe(2);
  expect(a1.depth).toBe(3);
  expect(a2.depth).toBe(3);
  const p = a1.renderElement as DOMElement;
  expect(p.children).toBe('b1');
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
