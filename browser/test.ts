import createElement, { FunctionComponent } from '../src/creatElement';
import mount from '../src/mount';
import { useState } from '../src/useState';

let Header: FunctionComponent<{ time: number }> = function (props) {
  return createElement('div', undefined, `header: ${props.time}`)
}

let Footer: FunctionComponent<{ text: string }> = function (props) {
  return createElement('div', undefined, props.text)
}

let setDate: any
let setApp: any

let _Date: FunctionComponent = function() {
  const [date, _setDate] = useState(new Date().toString())
  setDate = _setDate
  return createElement('span', undefined, date)
}

let App: FunctionComponent<undefined> = function (props) {
  const [time, _setApp] = useState(Date.now())
  setApp = _setApp
  return createElement('section', undefined, [
    createElement(Header, { time, }),
    createElement(_Date, undefined),
    // createElement(Footer, { text: 'this is footer' }),
  ])
}

const app = createElement(App, undefined)

mount(app, document.getElementById('app') as any)

console.log(app)
window.__debugger = {
  updateDate() {
    setDate(new Date().toString())
  },
  updateAll() {
    setDate(new Date().toString())
    setApp(Date.now())
  }
}

