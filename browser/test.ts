import createElement, { FunctionComponent, DOMElement } from '../src/creatElement';
import mount from '../src/mount';
import { useState } from '../src/useState';
import render from '../src/render';
import { resolveChildrenForDOMElement } from '../src/diff';

let Header: FunctionComponent<{ text: string }> = function (props) {
  return createElement('div', undefined, props.text)
}

let Footer: FunctionComponent<{ text: string }> = function (props) {
  return createElement('div', undefined, props.text)
}

let _setDate: any

let Time: FunctionComponent = function() {
  const [date, setDate] = useState(new Date().toString())
  _setDate = setDate
  return date
}

let App: FunctionComponent = function (props) {
  const [, _setApp] = useState('')
  return createElement('fragment', {}, [
    // createElement(Header, { text: 'this is header' }),
    // createElement(Header, { text: 'this is header2' }),
    createElement(Time, {}),
    // createElement(Footer, { text: 'this is footer' }),
  ])
}

const app = createElement(App, {})

mount(app, document.getElementById('app') as any);

(window as any).__react_sm_debugger = {
  setDate() {
    debugger
    _setDate(new Date().toString())
  }
}

console.log(app)

const a = createElement('div', undefined, ['a']);
const a1 = createElement('div', undefined, ['a', 'a1']);
const a2 = createElement('div', undefined, ['a1', undefined]);
render(a);
render(a1);
render(a2);

resolveChildrenForDOMElement(a2, a1)
