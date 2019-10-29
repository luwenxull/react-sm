import createElement, { FunctionComponent } from '../src/creatElement';
import mount from '../src/mount';

let Header: FunctionComponent<{text: string}> = function() {
  return createElement('div',undefined, 'header')
}

let App: FunctionComponent<any> = function() {
  return createElement
}