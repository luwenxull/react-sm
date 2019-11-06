import createElement, { FunctionComponent, DOMElement } from '../src/creatElement';
import mount from '../src/mount';
import { useState } from '../src/useState';
import render, { Fragement } from '../src/render';
import { reconcile } from '../src/diff';

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

let App: FunctionComponent = function (props) {
  const [, _setApp] = useState('')
  return createElement(Fragement, {}, [
    createElement(Header, { text: 'this is header' }),
    createElement(Header, { text: 'this is header2' }),
    createElement(Count, {}),
    undefined,
    createElement(Footer, { text: 'this is footer' }),
  ])
}

const app = createElement(App, {})

mount(app, document.getElementById('app') as any);

(window as any).__react_sm_debugger = {
  _setDate() {
    debugger
    setDate(new Date().toString())
  }
}

const a = createElement('div', undefined, [
  'a'
])
const a1 = createElement('div', undefined, [
  'a',
  undefined,
  'a1'
])
const a2 = createElement('div', undefined, [
  'a1',
  'a2',
  // undefined,
])
render(a)
render(a1)
render(a2)
const results2 = reconcile(a2, a1)
console.log(app)
