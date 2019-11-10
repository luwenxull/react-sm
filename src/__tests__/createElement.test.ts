import createElement, { TextComponent } from '../creatElement';

test('create dom element', () => {
  const e = createElement(
    'div',
    {
      name: 'test div',
    },
    'child of div'
  );
  expect(e.type).toBe('div');
  expect(e.props).toEqual({ name: 'test div' });
  expect(e.children.length).toBe(1);
  expect(e.children[0].type).toBe(TextComponent);
  expect(e.key).toBeUndefined();
  const e2 = createElement('div', { key: '1' });
  expect(e2.key).toBe('1');
});

test('create function element', () => {
  function A() {
    return 'inner a';
  }
  const e = createElement(
    A,
    {
      name: 'test A',
    },
    'a'
  );
  expect(e.type).toBe(A);
  expect(e.props).toEqual({ name: 'test A' });
  expect(e.children).toEqual('a');
  const e2 = createElement(A, { key: 'a' });
  expect(e2.key).toBe('a');
});
