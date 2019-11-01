import { move } from '../diff';

test('insert', () => {
  const arr = [0, 1, 2, 3];
  move(arr, 1, 1);
  expect(arr).toEqual([0, 1, 2, 3]);
  move(arr, 1, 2);
  expect(arr).toEqual([0, 2, 1, 3]);
  move(arr, 2, 3);
  expect(arr).toEqual([0, 1, 3, 2]);
  move(arr, 2, 1);
  expect(arr).toEqual([0, 2, 1, 3]);
  move(arr, 0, 2);
  expect(arr).toEqual([2, 1, 0, 3]);
  move(arr, 2, 0);
  expect(arr).toEqual([2, 1, 0, 3]);
});
