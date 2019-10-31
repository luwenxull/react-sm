import inflate from '../inflate';
import createElement, {
  FunctionComponent,
  FunctionElement
} from '../creatElement';
import { useState } from '../useState';

test('mount dom element', () => {
  function A() {
    return 'a';
  }
  const a = createElement(A, undefined);
  const div = createElement('div', {}, a);
  expect(div.children).toBe(a);
  expect(a.renderElement).toBeUndefined();
  inflate(div);
  expect(div.children).toBe(a);
  expect(a.renderElement).toBe('a');
});

test('mount funcition element', () => {
  let A: FunctionComponent<{ text: string }> = function(props) {
    const [name] = useState('a');
    return props.text + name;
  };
  let B: FunctionComponent<any> = function() {
    const [name] = useState('b');
    return createElement(
      A,
      {
        text: `props from ${name}`
      },
      ['child from b']
    );
  };
  const b = createElement(B, undefined, ['b']);
  expect(b.states.length).toBe(0);
  expect(b.children).toEqual(['b']);
  expect(b.renderElement).toBeUndefined();
  inflate(b);
  const renderElement = b.renderElement as FunctionElement<any>;
  expect(renderElement.type).toBe(A);
  expect(renderElement.renderElement).toBe('props from ba');
});

test('set state', () => {
  let _setName: any;
  let _setAge: any;
  let _setB: any;
  let A: FunctionComponent = function() {
    const [name, setName] = useState('a');
    const [age, setAge] = useState(20);
    _setName = setName;
    _setAge = setAge;
    return `${name}:${age}`;
  };
  let B: FunctionComponent = function() {
    const [, setB] = useState('');
    _setB = setB;
    return createElement(A, undefined);
  };
  const b = createElement(B, undefined);
  inflate(b);
  const a = b.renderElement as any;
  expect(a.renderElement).toBe('a:20');
  _setAge(21);
  expect(a.renderElement).toBe('a:21');
  _setName('aa');
  expect(a.renderElement).toBe('aa:21');
  _setB();
  expect(a.renderElement).toBe('aa:21');
});
