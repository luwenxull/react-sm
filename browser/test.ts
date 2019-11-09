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
let _setFooter: any
let _showFooter = false

let Time: FunctionComponent = function() {
  const [date, setDate] = useState(new Date().toString())
  _setDate = setDate
  return date
}

let App: FunctionComponent = function (props) {
  const [showFooter, setFooter] = useState(_showFooter)
  _setFooter = setFooter
  return createElement('fragment', {}, [
    // createElement(Header, { text: 'this is header' }),
    // createElement(Header, { text: 'this is header2' }),
    createElement(Time, {}),
    showFooter ? createElement(Footer, { text: 'this is footer' }) : undefined,
  ])
}

const app = createElement(App, {})

mount(app, document.getElementById('app') as any);

(window as any).__react_sm_debugger = {
  setDate() {
    _setDate(new Date().toString())
  },
  toggleFooter() {
    _setFooter(!_showFooter)
  }
}

console.log(app)
