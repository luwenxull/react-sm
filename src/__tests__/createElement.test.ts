import createElement from '../creatElement';

test('create dom element', () => {
  const e = createElement(
    'div',
    {
      name: 'test div'
    },
    'child of div'
  );
  expect(e.type).toBe('div');
  expect(e.props).toEqual({ name: 'test div' });
  expect(e.children).toEqual('child of div');
});

test('create function element', () => {
  function A() {
    return 'inner a';
  }
  const e = createElement(
    A,
    {
      name: 'test A'
    },
    ['a']
  );
  expect(e.type).toBe(A);
  expect(e.props).toEqual({ name: 'test A' });
  expect(e.children).toEqual(['a']);
});
