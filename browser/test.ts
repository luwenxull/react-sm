import createElement, { FunctionComponent } from '../src/creatElement';
import mount from '../src/mount';

let Header: FunctionComponent<{ text: string }> = function (props) {
  return createElement('div', undefined, props.text)
}

let Footer: FunctionComponent<{ text: string }> = function (props) {
  return createElement('div', undefined, props.text)
}

let App: FunctionComponent<undefined> = function (props) {
  return createElement('section', undefined, [
    createElement(Header, { text: 'this is header' }),
    createElement(Footer, { text: 'this is footer' }),
  ])
}

const app = createElement(App, undefined)

mount(app, document.getElementById('app') as any)

console.log(app)
