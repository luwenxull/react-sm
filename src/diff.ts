import {
  Element,
  FunctionElement,
  DOMElement,
  ElementType,
  TextComponent,
  Primitive,
  TextElement,
  Props,
} from './creatElement';
import {
  isElement,
  is_FunctionElement,
  isEmpty,
  findClosetParentDom,
} from './util';
import { applyDiff, applyPropDiff } from './applyDiff';
import { availableEvents } from './handleProps';
import { Events } from './bindEvents';

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

export interface PropDiff {
  type: DiffType;
  key: string;
  value?: unknown;
  element: DOMElement;
}

interface Pair {
  newVal: Element | Primitive;
  oldVal: Element | Primitive;
  parentDOM: HTMLElement | Text;
}

/**
 * 对prop进行diff
 *
 * @param {DOMElement} newElement
 * @param {DOMElement} oldElement
 * @returns {PropDiff[]}
 */
function diffDomProps(
  newElement: DOMElement,
  oldElement: DOMElement
): PropDiff[] {
  debugger;
  const newProps = newElement.props || {};
  const oldProps = oldElement.props || {};
  const diffs: PropDiff[] = [];
  Object.keys(oldProps).forEach(key => {
    if (!newProps.hasOwnProperty(key)) {
      newProps[key] = undefined;
    }
  });
  Object.keys(newProps).forEach(key => {
    if (newProps[key] !== oldProps[key]) {
      if (isEmpty(newProps[key])) {
        if (!isEmpty(oldProps[key])) {
          diffs.push({
            type: DiffType.DELETE,
            key,
            element: newElement,
          });
        }
      } else {
        diffs.push({
          type: DiffType.REPLACE,
          key,
          value: newProps[key],
          element: newElement,
        });
      }
    }
  });
  return diffs;
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
    _childrenMapByKey: oldChildrenMapByKey,
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
  propDiffs: PropDiff[];
} {
  const { newVal, oldVal, parentDOM } = pair;
  const diffs: Diff[] = [];
  const pendingPairs: Pair[] = [];
  const propDiffs: PropDiff[] = [];
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
          if (is_FunctionElement(newVal)) {
            // so as oldElement
            const pair: Pair = {
              newVal: newVal.renderElement,
              oldVal: (<FunctionElement>oldVal).renderElement,
              parentDOM:
                newVal.type === TextComponent
                  ? ((<TextElement>newVal).$dom as Text)
                  : parentDOM,
            };
            pendingPairs.push(pair);
          } else {
            const _propDiffs = diffDomProps(newVal, <DOMElement>oldVal);
            const results = resolveChildrenForDOMElement(newVal, <DOMElement>(
              oldVal
            ));
            diffs.push(...results.diffs);
            pendingPairs.push(...results.pendingPairs);
            propDiffs.push(..._propDiffs);
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
    propDiffs,
  };
}

export default function requestDiffHandler(
  newVal: FunctionElement,
  oldVal: FunctionElement,
  inspector?: (
    pendingPairs: Pair[],
    diffs: Diff[],
    propDiffs: PropDiff[]
  ) => void
): () => void {
  const entryPair = [
    { newVal, oldVal, parentDOM: findClosetParentDom(oldVal) },
  ];
  function handleDiffPair(pairs: Pair[]) {
    pairs.forEach(pair => {
      let { diffs, propDiffs, pendingPairs } = diff(pair);
      inspector && inspector(pendingPairs, diffs, propDiffs);
      diffs.length && applyDiff(diffs);
      propDiffs.length && applyPropDiff(propDiffs);
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
