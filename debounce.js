/*
 * @Author: yxh
 * @Date: 2020-08-02 21:54:23
 * @LastEditors: yxh
 * @LastEditTime: 2020-08-02 22:28:13
 * @Description: 
 */

function debounce(fn, delay) {
    let timer = null
    return function () {
        const _arg = arguments, _self = this
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(_self, _arg)
        }, delay);
    }
}
function ajax(e){
    console.log(e,this.value)
}
const oInp = document.getElementById("input")
oInp.oninput = debounce(ajax,1000)