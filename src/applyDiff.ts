import { Diff, DiffType } from './diff';
import { findClosetParentDom } from './util';
import { Element, FunctionElement } from './creatElement';
export default function applyDiff(diffs: Diff[]) {
  diffs.forEach(diff => {
    switch (diff.type) {
      case DiffType.UPDATE_TEXT: {
        const parent = diff.pair.parentDOM as FunctionElement;
        (parent.$dom as Text).nodeValue = String(diff.pair.newVal);
      }
      case DiffType.CREATE: {
        const {
          pair: { newVal },
        } = diff;
        break;
      }
      case DiffType.DELETE: {
        // const parent = findClosetParentWithDom(diff.oldChild as Element);
        // const dom = parent.$dom as HTMLElement;
        // dom.removeChild
        break;
      }
      case DiffType.REPLACE: {
        break;
      }
    }
  });
}
