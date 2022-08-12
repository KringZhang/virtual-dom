/**
 * 把虚拟节点转成真实节点
 * @param {*} vNode 
 */
export const createElm = vNode => {
    let dom = document.createElement(vNode.sel)
    if (vNode.children?.length) { // 有子节点时
        vNode.children.forEach(x => {
            const childDom = createElm(x)
            dom.appendChild(childDom)
        })
    } else { // 没有子节点时
        dom.innerText = vNode.text
    }
    vNode.elm = dom
    // console.log(dom)
    return dom
}