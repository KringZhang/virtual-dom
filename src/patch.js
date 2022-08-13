import { vNode } from './vNode'
import { createElm } from './createElm'
export const patch = (oldVNode, newVNode) => {
    // 旧的节点是虚拟节点还是真实节点，如果是真实节点，就需要先转换成虚拟节点
    if (!oldVNode.sel) {
        oldVNode = vNode(oldVNode.tagName.toLowerCase(), {}, [], void 0, oldVNode)
    }
    // console.log(oldVNode)
    // 新旧节点是否是同一节点，如果是同一节点，就精细化比较；如果不是同一节点，就要先插入新节点，再删除旧节点
    if (oldVNode.key === newVNode.key && oldVNode.sel === newVNode.sel) {
        // 新旧节点是同一个节点，精细化比较
        // 1、新节点有text属性时(没children)
        if (newVNode.text) {
            if (oldVNode.text && oldVNode.text === newVNode.text) { // 老节点如果也有text属性并且和新节点的相同，什么都不做
                return
            } else { // 直接给老节点的innerText赋值为新节点的text
                oldVNode.elm.innerText = newVNode.text
            }
        }
        // 2、新节点有子节点时(没text)
        if (newVNode.children?.length) {
            if (oldVNode.children?.length) { // 旧节点也有子节点

            } else { // 旧节点是文本节点
                // 先删除旧节点的text，然后根据新节点的children生成dom插入
                oldVNode.elm.innerText = ''
                newVNode.children.forEach(x => {
                    const dom = createElm(x)
                    oldVNode.elm.appendChild(dom)
                })
            }
        }
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