/*
 * @Author: yxh
 * @Date: 2020-08-02 23:21:15
 * @LastEditors: yxh
 * @LastEditTime: 2020-08-03 00:17:33
 * @Description: 
 */
Function.prototype.myBind = function (target, ...arg) {
    _self = this
    const f = function () {
        //如果以new的方式执行 则判断其this向上找是否能找到temp构造函数
        return _self.apply(this instanceof temp ? this : (target || window), [...arg, ...arguments])
    }
    //继承
    const temp = function () { }
    temp.prototype = this.prototype
    f.prototype = new temp()
    return f
}
const yxh = {
    x: 20
}
var x = 10
function show() {
    console.log(this.x, arguments)
}
const newShow = show.myBind(yxh)
console.log(new newShow().constructor)