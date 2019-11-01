import { FunctionElement } from './creatElement';
import render from './render';
import diff from './diff';

type BatchUpdateCallback = (entries: FunctionElement<any>[]) => void;

let _updateId: number | undefined;
const _pendings: FunctionElement<any>[] = [];
const _batchUpdatedListeners: Array<BatchUpdateCallback> = [];
const _isRequestAnimationFrameAvailable =
  typeof requestAnimationFrame === 'function';

const _tiker = {
  request: _isRequestAnimationFrameAvailable
    ? (fn: any) => requestAnimationFrame(fn)
    : (fn: any) => setTimeout(fn, 16),
  cancel: _isRequestAnimationFrameAvailable
    ? (id: number) => cancelAnimationFrame(id)
    : (id: number) => clearTimeout(id)
};

/**
 * simple for test
 */
export function onBatchUpdated(fn: BatchUpdateCallback) {
  _batchUpdatedListeners.push(fn);
}

export function offBatchUpdated(fn: BatchUpdateCallback) {
  const index = _batchUpdatedListeners.indexOf(fn);
  if (index !== -1) {
    _batchUpdatedListeners.splice(index, 1);
  }
}
/**
 * simple for test
 * end
 */

function _batchUpdate() {
  if (_pendings.length) {
    const sorted = _pendings.sort((a, b) => {
      return (b.depth as number) - (a.depth as number);
    });
    const batchUpdateEntries = [sorted[0]];
    const minDepth = sorted[0].depth;
    for (let element of sorted.slice(1)) {
      if (element.depth === minDepth) {
        if (batchUpdateEntries.indexOf(element) === -1) {
          batchUpdateEntries.push(element);
        }
      } else {
        break;
      }
    }
    batchUpdateEntries.forEach(element => {
      diff(render(Object.assign({}, element)), element);
    });
    _batchUpdatedListeners.forEach(fn => {
      fn(batchUpdateEntries);
    });
    _pendings.length = 0;
    _updateId = undefined;
  }
}

export default function batchUpdate(element: FunctionElement<any>) {
  _pendings.push(element);
  if (typeof _updateId === 'number') {
    _tiker.cancel(_updateId);
  }
  _updateId = _tiker.request(_batchUpdate);
}
