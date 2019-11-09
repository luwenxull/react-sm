import requestsDiffHandler, {
  DiffType,
  resolveChildrenForDOMElement,
  Diff,
} from '../diff';
import createElement, {
  FunctionComponent,
  FunctionElement,
} from '../creatElement';
import render, { INNER_TextComponent } from '../render';

jest.mock('../applyDiff');

test('diff: update text', () => {
  let A: FunctionComponent<{ text: string }> = function(props) {
    return props.text;
  };
  const a1 = createElement(A, { text: 'a1' });
  const a2 = createElement(A, { text: 'a2' });
  render(a1);
  render(a2);
  const inspector = jest.fn();
  requestsDiffHandler(a2, a1, inspector)();
  expect(inspector.mock.calls.length).toBe(3);
  const call2 = inspector.mock.calls[2];
  const diffs: Diff[] = call2[0];
  expect(diffs.length).toBe(1);
  const diff = diffs[0];
  expect(diff.type).toBe(DiffType.UPDATE_TEXT);
  expect(diff.pair.newVal).toBe('a2');
});

test('diff: delete and create', () => {
  let A: FunctionComponent<{ text: any }> = function(props) {
    return props.text;
  };
  const a1 = createElement(A, { text: 'a' });
  const a2 = createElement(A, { text: undefined });
  render(a1);
  render(a2);
  function test_delete() {
    const inspector = jest.fn();
    requestsDiffHandler(a2, a1, inspector)();
    expect(inspector.mock.calls.length).toBe(2);
    const call1 = inspector.mock.calls[1];
    const diffs: Diff[] = call1[0];
    expect(diffs.length).toBe(1);
    const diff = diffs[0];
    expect(diff.type).toBe(DiffType.DELETE);
  }
  function test_create() {
    const inspector = jest.fn();
    requestsDiffHandler(a1, a2, inspector)();
    expect(inspector.mock.calls.length).toBe(2);
    const call1 = inspector.mock.calls[1];
    const diffs: Diff[] = call1[0];
    expect(diffs.length).toBe(1);
    const diff = diffs[0];
    expect(diff.type).toBe(DiffType.CREATE);
  }
  test_delete();
  test_create();
});

// test('diff: reconcile', () => {
//   const a = createElement('div', undefined, ['a']);
//   const a1 = createElement('div', undefined, ['a', 'a1']);
//   const a2 = createElement('div', undefined, ['a1', undefined]);
//   render(a);
//   render(a1);
//   render(a2);
//   const results = resolveChildrenForDOMElement(a1, a);
//   expect(results.length).toBe(1);
//   expect(results[0].type).toBe(DiffType.CREATE);
//   const newChild = results[0].newChild as FunctionElement;
//   expect(newChild).not.toBeUndefined();
//   expect(newChild.type).toBe(INNER_TextComponent);
//   expect(newChild.renderElement).toBe('a1');
//   const results2 = resolveChildrenForDOMElement(a2, a1);
//   expect(results2.length).toBe(2);
//   expect(results2[0].type).toBe(DiffType.UPDATE_TEXT);
//   expect(results2[1].type).toBe(DiffType.DELETE);
//   expect(results2[1].parent).toBe(a1);
// });

// test('diff', () => {
//   let A: FunctionComponent<{ text: string }> = function(props) {
//     return createElement('div', {}, props.text);
//   };
//   let B: FunctionComponent = function(props) {
//     return createElement('div', {}, 'b');
//   };
//   const a = createElement(A, { text: 'a' });
//   const a1 = createElement(A, { text: 'a1' });
//   // const b = createElement(B, undefined)
//   render(a);
//   render(a1);
//   const results = diff(a1, a);
//   expect(results.length).toBe(1);
//   expect(results[0].type).toBe(DiffType.REPLACE);
//   expect(results[0].newChild).toBe('a1');
//   expect(results[0].oldChild).toBe('a');
//   expect(results[0].oldParent).toBe(a);
//   const results2 = diff(undefined, a);
//   expect(results2.length).toBe(1);
//   expect(results2[0].type).toBe(DiffType.DELETE);
// });

// test('move', () => {
//   const arr = [0, 1, 2, 3];
//   move(arr, 1, 1);
//   expect(arr).toEqual([0, 1, 2, 3]);
//   move(arr, 1, 2);
//   expect(arr).toEqual([0, 2, 1, 3]);
//   move(arr, 2, 3);
//   expect(arr).toEqual([0, 1, 3, 2]);
//   move(arr, 2, 1);
//   expect(arr).toEqual([0, 2, 1, 3]);
//   move(arr, 0, 2);
//   expect(arr).toEqual([2, 1, 0, 3]);
//   move(arr, 2, 0);
//   expect(arr).toEqual([2, 1, 0, 3]);
// });
