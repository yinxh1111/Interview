/*
 * @Author: yxh
 * @Date: 2020-08-03 23:24:49
 * @LastEditors: yxh
 * @LastEditTime: 2020-09-24 10:27:35
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

//原型链继承:继承原型链上的东西,一改变都改变

function Parent(){
    this.name = 'yin'
}
function children(){
    this.type = 'son'
}
children.prototype = new Parent()
// console.log()

//构造函数继承:无法继承原型链上的属性,方向

function Parent1(){
    this.name = 'yin'
}
function children1(){
    Parent1.call(this)
    this.type = 'son'
}

//组合继承: 虽能继承原型链上以及本身的属性,但constructor指向错误,且相当于执行了两次new Parent()

function Parent2(){
    this.name = 'yin'
}
function children2(){
    Parent2.call(this)
    this.type = 'son'
}
Parent2.prototype.say = function (){
    console.log(this.name)
}
children2.prototype = new Parent2()

//完整继承
 
function Parent3(){
    this.name = 'yin'
}
function children3(){
    Parent3.call(this)
    this.type = 'son'
}
Parent3.prototype.say = function (){
    console.log(this.name)
}
children3.prototype = Parent3.prototype
children3.prototype.constructor  = children3