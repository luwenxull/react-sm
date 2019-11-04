import render, { _TextComponent } from '../render';
import createElement, {
  FunctionComponent,
  FunctionElement,
  DOMElement
} from '../creatElement';
import { useState } from '../useState';
import { onBatchUpdated } from '../batchUpdate';

test('render: hierachy', () => {
  let A: FunctionComponent<{ text: string }> = function(props) {
    return `${props.text}`;
  };
  let B: FunctionComponent = function() {
    return createElement('div', {}, [
      createElement(A, { text: 'a1' }),
      createElement(A, { text: 'a2', key: 'a2' })
    ]);
  };
  const b = createElement(B, {});
  render(b);
  expect(b.depth).toBe(0);
  expect(b.parent).toBeUndefined();
  const div = b.renderElement as DOMElement;
  expect(div.depth).toBe(1);
  expect(div.parent).toBe(b);
  const children = div.children;
  expect(children.length).toBe(2);
  const a2 = children[1] as FunctionElement<any>
  expect(a2.key).toBe('a2')
  expect(div.keyedChildren['a2']).toBe(a2)
  const text = a2.renderElement as FunctionElement<any>
  expect(text.type).toBe(_TextComponent)
  expect(text.renderElement).toBe('a2')
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
