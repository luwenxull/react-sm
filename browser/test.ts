import createElement, { FunctionComponent } from '../src/creatElement';
import mount from '../src/mount';
import { useState } from '../src/useState';

let Header: FunctionComponent<{ text: string }> = function (props) {
  return createElement('div', undefined, props.text)
}

let Footer: FunctionComponent<{ text: string }> = function (props) {
  return createElement('div', undefined, props.text)
}

let setDate: any

let Count: FunctionComponent = function() {
  const [date, _setDate] = useState(new Date().toString())
  setDate = _setDate
  return date
}

let App: FunctionComponent<undefined> = function (props) {
  const [, _setApp] = useState('')
  return createElement('fragment', undefined, [
    createElement(Header, { text: 'this is header' }),
    createElement(Count, undefined),
    undefined,
    createElement(Footer, { text: 'this is footer' }),
  ])
}

const app = createElement(App, undefined)

mount(app, document.getElementById('app') as any);

(window as any).__react_sm_debugger = {
  _setDate() {
    debugger
    setDate(new Date().toString())
  }
}

console.log(app)
