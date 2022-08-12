import { vNode } from './vNode'
/**
 * 只考虑这三种情况
 * 1、h('div', {}, '内容')
 * 2、h('div', {}, [h('div', {}, '')])
 * 3、h('div', {}, h('div', {}, ''))
 */
export default function(sel, data, c) {
    // console.log(sel, data, c)
    if (arguments.length !== 3) return console.warn('此h函数只能接受三个参数!')
    if (['string', 'number'].includes(typeof c)) { // 情况1
        return vNode(sel, data, void 0, c, void 0)
    } else if (Array.isArray(c)) { // 情况2
        return vNode(sel, data, c, void 0, void 0)
    } else if (typeof c === 'object' && c.sel) { // 情况3
        return vNode(sel, data, [c], void 0, void 0)
    }
    return console.error('此h函数入参错误!')
}