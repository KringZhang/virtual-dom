import { createElm } from './createElm'
// 新旧节点是否为同一节点
const isTheSameVNode = (oldVNode, newVNode) => oldVNode.key === newVNode.key && oldVNode.sel === newVNode.sel;

export const patchSameVNode = (oldVNode, newVNode) => {
    // 新旧节点是同一个节点时，精细化比较
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
            const oldCh = oldVNode.children
            const newCh = newVNode.children
            // 旧前和旧后
            let oldStartIdx = 0
            let oldEndIdx = oldCh.length - 1
            let oldStartChild = oldCh[0]
            let oldEndChild = oldCh[oldEndIdx]
            // 新前和新后
            let newStartIdx = 0
            let newEndIdx = newCh.length - 1
            let newStartChild = newCh[0]
            let newEndChild = newCh[newEndIdx]
            while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
                if (oldStartChild === void 0) {
                    oldStartChild = oldCh[++oldStartIdx]
                    continue
                }
                if (oldEndChild === void 0) {
                    oldEndChild = oldCh[--oldEndIdx]
                    continue
                }
                if (isTheSameVNode(oldStartChild, newStartChild)) { // 旧前和新前是同一节点
                    console.log("11111")
                    patchSameVNode(oldStartChild, newStartChild)
                    oldStartChild = oldCh[++oldStartIdx]
                    newStartChild = newCh[++newStartIdx]
                } else if (isTheSameVNode(oldEndChild, newEndChild)) { // 旧后和新后是同一节点
                    console.log("22222")
                    patchSameVNode(oldEndChild, newEndChild)
                    oldEndChild = oldCh[--oldEndIdx]
                    newEndChild = newCh[--newEndIdx]
                } else if (isTheSameVNode(oldStartChild, newEndChild)) { // 旧前和新后是同一节点，旧前节点的真实dom向后移动位置
                    console.log("33333")
                    patchSameVNode(oldStartChild, newEndChild)
                    oldVNode.elm.insertBefore(oldStartChild.elm, oldEndChild.elm.nextSibling)
                    oldStartChild = oldCh[++oldStartIdx]
                    newEndChild = newCh[--newEndIdx]
                } else if (isTheSameVNode(oldEndChild, newStartChild)) { // 旧后和新前是同一节点，旧后节点的真实dom向前移动位置
                    console.log("44444")
                    patchSameVNode(oldEndChild, newStartChild)
                    oldVNode.elm.insertBefore(oldEndChild.elm, oldStartChild.elm)
                    oldEndChild = oldCh[--oldEndIdx]
                    newStartChild = newCh[++newStartIdx]
                } else {
                    // 拿新前节点去旧节点列表里面匹配
                    console.log("&&&&&&&&&&&&&&&&&&&&&")
                    let index = 0
                    let sameVNode = oldCh.find((x, idx) => {
                        if (x && x.key === newStartChild.key) {
                            index = idx
                            return true
                        }
                    })
                    if (sameVNode) { // 匹配到了
                        patchSameVNode(sameVNode, newStartChild)
                        oldVNode.elm.insertBefore(sameVNode.elm, oldStartChild.elm)
                        oldCh[index] = void 0
                    } else { // 没匹配到
                        oldVNode.elm.insertBefore(createElm(newStartChild), oldStartChild.elm)
                    }
                    newStartChild = newCh[++newStartIdx]
                }
            }
            if (oldStartIdx > oldEndIdx) { // 新节点有剩余的，剩余的部分插入
                const key = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].key : void 0
                const temp = key ? oldCh.find(x => x.key === key).elm : null
                for(let i = newStartIdx; i <= newEndIdx; i++) {
                    oldVNode.elm.insertBefore(createElm(newCh[i]), temp)
                }
            } else if (newStartIdx > newEndIdx) { // 旧节点有剩余的，剩余的部分删除
                for(let i = oldStartIdx; i <= oldEndIdx; i++) {
                    oldVNode.elm.removeChild(oldCh[i].elm)
                }
            }
        } else { // 旧节点是文本节点
            // 先删除旧节点的text，然后根据新节点的children生成dom插入
            oldVNode.elm.innerText = ''
            newVNode.children.forEach(x => {
                const dom = createElm(x)
                oldVNode.elm.appendChild(dom)
            })
        }
    }
}