import { Diff, DiffType, PropDiff } from './diff';
import { Element } from './creatElement';
import { _mount } from './mount';
import { findDeeperDom } from './util';
import { availableEvents } from './handleProps';
import bindEvents, { Events } from './bindEvents';

/**
 * 装配element的diff
 *
 * @export
 * @param {Diff[]} diffs
 */
export function applyDiff(diffs: Diff[]): void {
  diffs.forEach(diff => {
    switch (diff.type) {
      case DiffType.UPDATE_TEXT: {
        const parent = diff.pair.parentDOM as Text;
        parent.nodeValue = String(diff.pair.newVal);
        break;
      }
      case DiffType.CREATE: {
        const {
          pair: { newVal, parentDOM },
        } = diff;
        _mount(newVal as Element, parentDOM as HTMLElement);
        break;
      }
      case DiffType.DELETE: {
        const {
          pair: { oldVal, parentDOM },
        } = diff;
        findDeeperDom(oldVal as Element).forEach(dom => {
          parentDOM.removeChild(dom);
        });
        break;
      }
      case DiffType.REPLACE: {
        break;
      }
    }
  });
}

function handleEventProp(diff: PropDiff): void {
  const { element, type, key } = diff;
  const unbind = element._bindedEventsManager[key as Events] as Function;
  switch (type) {
    case DiffType.DELETE: {
      unbind();
      break;
    }
    case DiffType.REPLACE: {
      unbind();
      bindEvents(element, key as Events);
      break;
    }
    default:
      break;
  }
}

/**
 * 装配prop的diff
 *
 * @export
 * @param {PropDiff[]} propDiffs
 */
export function applyPropDiff(propDiffs: PropDiff[]): void {
  propDiffs.forEach(diff => {
    const { element, type, key, value } = diff;
    switch (type) {
      case DiffType.DELETE: {
        if (availableEvents.has(key as Events)) {
          handleEventProp(diff);
        } else {
          (element.$dom as HTMLElement).removeAttribute(key);
        }
        break;
      }
      case DiffType.REPLACE: {
        if (availableEvents.has(key as Events)) {
          handleEventProp(diff);
        } else {
          (element.$dom as HTMLElement).setAttribute(key, String(value));
        }
        break;
      }
    }
  });
}
