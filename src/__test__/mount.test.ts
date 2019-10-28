import mount from '../mount'
import createElement from '../creatElement'
// import { useState } from '../useState'

test('mount', () => {
  function A(props: { text: string }) {
    return props.text
  }
  function B() {
    return createElement(A, {
      text: 'from b'
    })
  }
  const ele = createElement(B)
  mount(ele)
})
