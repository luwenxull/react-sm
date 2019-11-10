import { Diff, DiffType } from './diff';
import { findClosetParentDom } from './util';
import { Element, ComponentElement } from './creatElement';
import { _mount } from './mount';
export default function applyDiff(diffs: Diff[]) {
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
        // parentDOM.removeChild
        break;
      }
      case DiffType.REPLACE: {
        break;
      }
    }
  });
}
