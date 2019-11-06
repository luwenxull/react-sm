import { Diff, DiffType } from './diff';
import { findClosetParentWithDom } from './util';
import { Element, FunctionElement } from './creatElement';
export default function applyDiff(diffs: Diff[]) {
  diffs.forEach(diff => {
    switch (diff.type) {
      case DiffType.UPDATE_TEXT: {
        const parent = diff.parent as FunctionElement<any>;
        (parent.$dom as Text).nodeValue = String(diff.newChild);
      }
      case DiffType.CREATE: {
        break;
      }
      case DiffType.DELETE: {
        const parent = findClosetParentWithDom(diff.oldChild as Element);
        const dom = parent.$dom as HTMLElement;
        // dom.removeChild
        break;
      }
      case DiffType.REPLACE: {
        break;
      }
    }
  });
}
