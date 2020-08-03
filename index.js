/*
 * @Author: yxh
 * @Date: 2020-08-03 23:24:49
 * @LastEditors: yxh
 * @LastEditTime: 2020-08-03 23:34:38
 * @Description: 
 */
function inherit(Origin, Target) {
    function F() { }
    F.prototype = Origin.prototype
    Target.prototype = new F()
    Target.prototype.constructor = Target
    //以后可以看此函数具体继承自谁
    Target.prototype.uber = Origin.prototype
}
function Father (){

}
//改变原型链的时候一定要在new之前
Father.prototype.lastName = "yin"
var father = new Father()
function Son(){}
inherit(Father,Son)
var son = new Son()