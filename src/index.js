import h from './h.js'

const vNode = h('ul', {}, [
    h('li', {}, '跑步'),
    h('li', {}, '游泳'),
    h('li', {}, 111),
])
// const vNode = h('div', {}, h('div', {}, 'sa'))
console.log(vNode)