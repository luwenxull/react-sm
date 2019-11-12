import createElement, { Component, DOMElement } from '../src/creatElement';
import mount from '../src/mount';
import { useState } from '../src/useState';
import render from '../src/render';
import { resolveChildrenForDOMElement } from '../src/diff';
import { findDeeperDom } from '../src/util';
import createContext from '../src/context';

const colorContext = createContext('red')

let Header: Component<{ text: string }> = function (props) {
  return createElement(colorContext.Consumer, undefined, (v: string) => {
    return createElement('div', { onClick: console.log }, props.text + v)
  })
}

let Footer: Component<{ text: string }> = function (props) {
  return createElement('div', undefined, props.text)
}


let Time: Component<{ time: string }> = function (props) {
  debugger
  return props.time
}

let Wrapper: Component<any> = function(props: any) {
  return createElement(Time, props)
}

let IndexLi: Component<{index: string}> = function(props) {
  return createElement('li', {}, props.index)
}


let App: Component = function (props) {
  // const [showFooter, setFooter] = useState(_showFooter)
  const [time, setTime] = useState(new Date().toString())
  // _setFooter = setFooter
  const s = new Array(100).fill(0).map((v, i) => createElement(IndexLi, {index: i + time}))
  return createElement('fragment', undefined, [
    createElement(
      colorContext.Provider,
      {value: 'green'},
      createElement(Header, { text: 'this is header' })
    ),
    // createElement(Header, { text: 'this is header2' }),
    createElement(Wrapper, { time }),
    // ...s,
    createElement('button', {
      onClick: () => {
        setTime(new Date().toString())
      }
    }, '重置时间')
    // showFooter ? createElement(Footer, { text: 'this is footer' }) : undefined,
  ])
}

const app = createElement(App, { onClick: console.log })

mount(app, document.getElementById('app') as any);

console.log(app)
console.log(findDeeperDom(app))
