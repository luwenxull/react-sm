import { Element } from './creatElement';

export default function diff(newElement: Element, oldElement: Element) {
  // console.log(newElement, oldElement);
}

type ElementWithKey = { key: string };

export function move(arr: unknown[], value: unknown, toIndex: number): void {
  let fromIndex = arr.indexOf(value);
  if (fromIndex !== toIndex) {
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, value);
  }
}

export function key2Index(arr: ElementWithKey[]) {
  return arr.reduce((acc: { [prop: string]: number }, item, index) => {
    acc[item.key] = index;
    return acc;
  }, {});
}

function diff2(oldArr: ElementWithKey[], newArr: ElementWithKey[]) {
  const newKey2Index = key2Index(newArr);
  const current = oldArr.filter(
    ele => typeof newKey2Index[ele.key] === 'number'
  );
  const sorted = current.sort((a, b) => {
    return newKey2Index[a.key] - newKey2Index[b.key];
  });
  let startIndex = 0;
  let endIndex = current.length - 1;
  while (startIndex < endIndex) {
    move(current, sorted[startIndex], 0);
    move(current, sorted[endIndex], endIndex);
    startIndex++;
    endIndex--;
  }
}
