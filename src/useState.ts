let _states: any[] = [];
let _index: number = 0;
let _setState: SetState;

type SetState = (index: number, newVal: unknown) => void;

type SetStateByUser<T> = (newVal: T) => void;

export function setStates(states: unknown[], setState: SetState) {
  _states = states;
  _index = 0;
  _setState = setState;
}

export function useState<T>(initialValue: T): [T, SetStateByUser<T>] {
  const _innerIndex = _index;
  const _innerSetState = _setState;
  if (_states.length <= _index) {
    _states.push(initialValue);
  }
  const value = _states[_index];
  _index++;
  return [
    value,
    (newVal: T) => {
      _innerSetState(_innerIndex, newVal);
    },
  ];
}
