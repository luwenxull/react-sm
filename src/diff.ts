import {
  Element,
  Child,
  FunctionElement,
  DOMElement,
  FunctionComponent,
  ElementType
} from './creatElement';
import { isElement, isFunctionElement, isEmpty } from './util';

export enum DiffType {
  CREATE,
  DELETE,
  REPLACE,
  UPDATE_TEXT
}
export interface Diff {
  type: DiffType;
  oldChild?: Child;
  newChild?: Child;
  oldParent?: Element;
}

export function reconcile(
  newElement: DOMElement<any>,
  oldElement: DOMElement<any>
): Diff[] {
  debugger;
  const results: Diff[] = [];
  const {
    children: newChildren,
    childrenMapByKey: newChildrenMapByKey
  } = newElement;
  const {
    children: oldChildren,
    childrenMapByKey: oldChildrenMapByKey
  } = oldElement;
  const childrenNumKey: Map<ElementType, number> = new Map();
  const childrendNeedKeep: Set<Element> = new Set();
  (newChildren as Element[]).forEach(element => {
    const { key, type } = element;
    !childrenNumKey.has(type) && childrenNumKey.set(type, 0);
    const _key =
      typeof key === 'string' ? key : (childrenNumKey.get(type) as number);
    if (typeof _key === 'number') {
      childrenNumKey.set(type, _key + 1);
    }
    const oldMap = oldChildrenMapByKey.get(type);
    if (oldMap && oldMap.has(_key)) {
      _diff(element, oldMap.get(_key), results);
      childrendNeedKeep.add(oldMap.get(_key) as Element);
    } else {
      results.push({
        type: DiffType.CREATE,
        newChild: element
      });
    }
  });
  (oldChildren as Element[]).forEach(element => {
    if (!childrendNeedKeep.has(element)) {
      results.push({
        type: DiffType.DELETE,
        newChild: element
      });
    }
  });
  return results;
}

function _diff(
  newChild: Child,
  oldChild: Child,
  results: Diff[],
  oldParent?: Element
) {
  if (isEmpty(newChild) && !isEmpty(oldChild)) {
    results.push({
      type: DiffType.DELETE,
      oldChild,
      oldParent
    });
  } else {
    if (isElement(oldChild)) {
      if (isElement(newChild)) {
        if (newChild.type !== oldChild.type) {
          results.push({
            type: DiffType.REPLACE,
            oldChild,
            newChild
          });
        } else {
          // type相等
          if (isFunctionElement(newChild)) {
            // so as oldElement
            _diff(
              newChild.renderElement,
              (oldChild as FunctionElement<any>).renderElement,
              results,
              oldChild.parent
            );
          } else {
            const newChildren = newChild.children;
            const oldChildren = (oldChild as DOMElement<any>).children;
            for (let i = 0; i < oldChildren.length; i++) {
              _diff(newChildren[i], oldChildren[i], results, oldChild.parent);
            }
            if (newChildren.length > oldChildren.length) {
              newChildren.slice(oldChildren.length).forEach(child => {
                results.push({
                  type: DiffType.CREATE,
                  newChild: child
                });
              });
            }
          }
        }
      } else {
        results.push({
          type: DiffType.REPLACE,
          oldChild,
          newChild
        });
      }
    } else if (isEmpty(oldChild)) {
      if (!isEmpty(newChild)) {
        results.push({
          type: DiffType.CREATE,
          newChild
        });
      }
    } else {
      // primitive
      if (isElement(newChild)) {
        results.push({
          type: DiffType.REPLACE,
          oldChild,
          newChild,
          oldParent
        });
      } else {
        if (String(oldChild) !== String(newChild)) {
          results.push({
            type: DiffType.UPDATE_TEXT,
            oldChild,
            newChild,
            oldParent
          });
        }
      }
    }
  }
}

export default function diff(newChild: Child, oldChild: Child): Diff[] {
  const results: Diff[] = [];
  _diff(newChild, oldChild, results);
  return results;
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
