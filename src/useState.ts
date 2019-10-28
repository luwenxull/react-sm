let _states: any[] = []
let _index: number = 0

export function setStates(states: any[]) {
  _states = states
  _index = 0
}

export function useState(initialValue: any) {
  if (_states.length <= _index) {
    _states.push(initialValue)
  }
  const value = _states[_index]
  _index++
  return [
    value,
  ]
}
