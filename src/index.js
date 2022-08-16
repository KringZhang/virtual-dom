import h from './h.js'
import { patch } from './patch.js'

const vNode1 = h('ul', {}, [
    h('li', {}, '跑步'),
    h('li', {}, '游泳'),
    h('li', {}, 111),
    h('li', {}, [
        h('div', {}, 'A'),
        h('div', {}, 'B'),
    ]),
])
const vNode2 = h('ol', {}, h('li', {}, 'sa'))
const vNode3 = h('span', {}, '内容')
const vNode4 = h('span', {}, 'dhajdhajk')
const vNode5 = h('ul', {}, 'zkszks')
const vNode6 = h('ul', {}, [
    h('li', {key: 'A'}, 'A'),
    h('li', {key: 'B'}, 'B'),
    h('li', {key: 'C'}, 'C'),
    // h('li', {key: 'D'}, 'D')
])
const vNode7 = h('ul', {}, [
    h('li', {key: 'B'}, 'B111'),
    h('li', {key: 'QQ'}, 'QQ'),
    h('li', {key: 'C'}, 'C'),
    h('li', {key: 'A'}, 'A'),
    h('li', {key: 'D'}, 'D'),
])
// console.log(vNode)
const box = document.getElementById('box')
// patch(box, vNode1)
patch(box, vNode6)
const btn = document.getElementById("btn")
btn.addEventListener("click", updateDom)
function updateDom() {
    patch(vNode6, vNode7)
}