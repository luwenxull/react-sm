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
    return createElement('div', { onClick: (e, stop) => {
      console.log('不要点啦！！！')
      stop()
    } }, props.text + v)
  })
}

let Footer: Component<{ text: string }> = function (props) {
  return createElement('div', undefined, props.text)
}


let Time: Component<{ time: string }> = function (props) {
  return props.time
}

let Wrapper: Component<any> = function(props: any) {
  return createElement(Time, props)
}

let IndexLi: Component<{index: string}> = function(props) {
  return createElement('li', {}, props.index)
}


let App: Component = function (props) {
  const [time, setTime] = useState(new Date().toString())
  const [color, setColor] = useState('green')
  const [showFooter, setFooter] = useState(true)
  let _s = showFooter
  console.log(_s)
  return createElement('fragment', undefined, [
    createElement(
      colorContext.Provider,
      {value: color},
      createElement(Header, { text: 'this is header' })
    ),
    createElement(Wrapper, { time }),
    createElement('div', {
      'data-name': 'actions'
    } , [
      createElement('button', {
        onClick: () => {
          setTime(new Date().toString())
        }
      }, '重置时间'),
      createElement('button', {
        onClick: () => {
          setColor('purple')
        }
      }, '重置颜色'),
      createElement('button', {
        onClick: () => {
          setFooter(!_s)
        }
      }, '切换页脚'),
    ]),
    _s ? createElement(Footer, { text: 'this is footer' }) : undefined,
  ])
}

const app = createElement(App, {onClick: console.log})

mount(app, document.getElementById('app') as any);

console.log(app)
console.log(findDeeperDom(app))
