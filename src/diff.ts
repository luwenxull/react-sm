import {
  Element,
  Child,
  FunctionElement,
  DOMElement,
  ElementType,
} from './creatElement';
import {
  isElement,
  isFunctionElement,
  isEmpty,
  findClosetParentDom,
} from './util';
import { INNER_TextComponent } from './render';
import applyDiff from './applyDiff';

export enum DiffType {
  CREATE,
  DELETE,
  REPLACE,
  UPDATE_TEXT,
}
export interface Diff {
  type: DiffType;
  pair: Pair;
}

interface Pair {
  newVal: Child;
  oldVal: Child;
  parentDOM: HTMLElement | Text;
}

export function resolveChildrenForDOMElement(
  newElement: DOMElement,
  oldElement: DOMElement
): {
  diffs: Diff[];
  pendingPairs: Pair[];
} {
  const diffs: Diff[] = [];
  const pendingPairs: Pair[] = [];
  const {
    children: newChildren,
    // childrenMapByKey: newChildrenMapByKey
  } = newElement;
  const {
    children: oldChildren,
    childrenMapByKey: oldChildrenMapByKey,
  } = oldElement;
  const childrenNumKey: Map<ElementType, number> = new Map();
  const childrendNeedKeep: Set<Element> = new Set();
  (<Element[]>newChildren).forEach(element => {
    const { key, type } = element;
    !childrenNumKey.has(type) && childrenNumKey.set(type, 0);
    const _key =
      typeof key === 'string' ? key : (childrenNumKey.get(type) as number);
    if (typeof _key === 'number') {
      childrenNumKey.set(type, _key + 1);
    }
    const oldMap = oldChildrenMapByKey.get(type);
    if (oldMap && oldMap.has(_key)) {
      const oldVal = oldMap.get(_key) as Element;
      pendingPairs.push({
        newVal: element,
        oldVal,
        parentDOM: findClosetParentDom(element),
      });
      childrendNeedKeep.add(oldVal);
    } else {
      diffs.push({
        type: DiffType.CREATE,
        pair: {
          newVal: element,
          oldVal: undefined,
          parentDOM: findClosetParentDom(element),
        },
      });
    }
  });
  (oldChildren as Element[]).forEach(element => {
    if (!childrendNeedKeep.has(element)) {
      diffs.push({
        type: DiffType.DELETE,
        pair: {
          oldVal: element,
          newVal: undefined,
          parentDOM: findClosetParentDom(element),
        },
      });
    }
  });
  return {
    diffs,
    pendingPairs,
  };
}

function diff(
  pair: Pair
): {
  diffs: Diff[];
  pendingPairs: Pair[];
} {
  const { newVal, oldVal, parentDOM } = pair;
  const diffs: Diff[] = [];
  const pendingPairs: Pair[] = [];
  if (isEmpty(newVal)) {
    if (!isEmpty(oldVal)) {
      diffs.push({
        type: DiffType.DELETE,
        pair,
      });
    } /* else oldchild is empty, nothing to do */
  } /* new child not empty */ else {
    if (isElement(oldVal)) {
      if (isElement(newVal)) {
        if (newVal.type !== oldVal.type) {
          diffs.push({
            type: DiffType.REPLACE,
            pair,
          });
        } else {
          // type相等
          if (isFunctionElement(newVal)) {
            // so as oldElement
            const pair: Pair = {
              newVal: newVal.renderElement,
              oldVal: (<FunctionElement>oldVal).renderElement,
              parentDOM: findClosetParentDom(oldVal),
            };
            pendingPairs.push(pair);
          } else {
            const results = resolveChildrenForDOMElement(
              newVal,
              oldVal as DOMElement
            );
            diffs.push(...results.diffs);
            pendingPairs.push(...results.pendingPairs);
            // todo sort
          }
        }
      } else {
        diffs.push({
          type: DiffType.REPLACE,
          pair,
        });
      }
    } else if (isEmpty(oldVal)) {
      diffs.push({
        type: DiffType.CREATE,
        pair,
      });
    } /* primitive */ else {
      if (isElement(newVal)) {
        diffs.push({
          type: DiffType.REPLACE,
          pair,
        });
      } else {
        if (String(oldVal) !== String(newVal)) {
          diffs.push({
            type: DiffType.UPDATE_TEXT,
            pair,
          });
        }
      }
    }
  }
  return {
    diffs,
    pendingPairs,
  };
}

export default function requestDiffHandler(
  newVal: FunctionElement,
  oldVal: FunctionElement,
  inspector?: (diffs: Diff[], pairs: Pair[]) => void
): () => void {
  const entryPair = [
    { newVal, oldVal, parentDOM: findClosetParentDom(oldVal) },
  ];
  function handleDiffPair(pairs: Pair[]) {
    pairs.forEach(pair => {
      let { diffs, pendingPairs } = diff(pair);
      inspector && inspector(diffs, pendingPairs);
      diffs.length && applyDiff(diffs);
      pendingPairs.length && handleDiffPair(pendingPairs);
    });
  }

  return function() {
    entryPair.forEach(pair => {
      handleDiffPair([pair]);
    });
  };
}

// type ElementWithKey = { key: string };

// export function move(arr: unknown[], value: unknown, toIndex: number): void {
//   let fromIndex = arr.indexOf(value);
//   if (fromIndex !== toIndex) {
//     arr.splice(fromIndex, 1);
//     arr.splice(toIndex, 0, value);
//   }
// }

// export function key2Index(arr: ElementWithKey[]) {
//   return arr.reduce((acc: { [prop: string]: number }, item, index) => {
//     acc[item.key] = index;
//     return acc;
//   }, {});
// }

// function diff2(oldArr: ElementWithKey[], newArr: ElementWithKey[]) {
//   const newKey2Index = key2Index(newArr);
//   const current = oldArr.filter(
//     ele => typeof newKey2Index[ele.key] === 'number'
//   );
//   const sorted = current.sort((a, b) => {
//     return newKey2Index[a.key] - newKey2Index[b.key];
//   });
//   let startIndex = 0;
//   let endIndex = current.length - 1;
//   while (startIndex < endIndex) {
//     move(current, sorted[startIndex], 0);
//     move(current, sorted[endIndex], endIndex);
//     startIndex++;

//     endIndex--;
//   }
// }
