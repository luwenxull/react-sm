import { Diff, DiffType } from './diff';
import { Element } from './creatElement';
import { _mount } from './mount';
import { findDeeperDom } from './util';
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
