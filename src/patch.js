import { vNode } from './vNode'
import { createElm } from './createElm'
import { patchSameVNode } from './patchSameVNode'
export const patch = (oldVNode, newVNode) => {
    // 旧的节点是虚拟节点还是真实节点，如果是真实节点，就需要先转换成虚拟节点
    if (!oldVNode.sel) {
        oldVNode = vNode(oldVNode.tagName.toLowerCase(), {}, [], void 0, oldVNode)
    }
    // console.log(oldVNode)
    // 新旧节点是否是同一节点，如果是同一节点，就精细化比较；如果不是同一节点，就要先插入新节点，再删除旧节点
    if (oldVNode.key === newVNode.key && oldVNode.sel === newVNode.sel) {
        patchSameVNode(oldVNode, newVNode)
    } else {
        // 新旧节点不是同一个节点时，先根据新节点生成真实节点
        const dom = createElm(newVNode)
        console.log(dom)
        if (oldVNode.elm) {
            // 真实节点插入指定的位置
            oldVNode.elm.parentNode.appendChild(dom)
            // 删除旧节点
            oldVNode.elm.parentNode.removeChild(oldVNode.elm)
        }
    }
}