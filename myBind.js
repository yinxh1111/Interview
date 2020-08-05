/*
 * @Author: yxh
 * @Date: 2020-08-02 23:21:15
 * @LastEditors: yxh
 * @LastEditTime: 2020-08-05 21:25:01
 * @Description: 
 */
Function.prototype.myBind = function (target, ...arg) {
    const _self = this
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
Function.prototype.myCall = function (context) {
    //如果调用不是函数,则抛出错误
    if (typeof (this) !== "function") {
        return new Error("Not a function")
    }
    //如果未传参数,则默认为window
    context = context || window
    //获取剩余参数列表
    let _arg = [...arguments].slice(1)
    //将调用函数设为对象的方法
    context.fn = this
    //获取返回结果
    let result = context.fn(..._arg)
    //删除对象方法
    delete context.fn
    //返回结果
    return result
}
Function.prototype.myApply=function(context){
    if(typeof this !=="function"){
        return new Error("Not a function")
    }
    context = context || window
    let result = null 
    context.fn = this
    if(arguments[1]){
        result = context.fn(...arguments[1])
    }else{
        result = context.fn()
    }
    delete context.fn
    return result

}
const yxh = {
    x: 20
}
var x = 10
function show() {
    console.log(this.x, arguments)
}
const newShow = show.myBind(yxh)
// console.log(new newShow().constructor)
show.myApply(yxh)