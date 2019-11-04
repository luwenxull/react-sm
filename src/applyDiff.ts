import { Diff, DiffType } from './diff';
import { findClosetParentWithDom } from './util';
import { Element } from './creatElement';
export default function applyDiff(diffs: Diff[]) {
  diffs.forEach(diff => {
    switch (diff.type) {
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
