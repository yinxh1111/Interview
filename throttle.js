/*
 * @Author: yxh
 * @Date: 2020-08-02 22:28:48
 * @LastEditors: yxh
 * @LastEditTime: 2020-08-02 22:48:59
 * @Description: 
 */
function throttle(fn, delay) {
    let lastTime = 0
    return function () {
        let nowTime = new Date().getTime()
        if (nowTime - lastTime >= delay) {
            fn.apply(this, arguments)
            lastTime = nowTime
        }
    }
}
function test() {
    console.log(1)
}
oBtn = document.getElementById("button")
oBtn.onclick = throttle(test, 1000)