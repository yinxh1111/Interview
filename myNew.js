/*
 * @Author: yxh
 * @Date: 2020-08-10 22:42:04
 * @LastEditors: yxh
 * @LastEditTime: 2020-08-10 23:04:56
 * @Description: 参考 https://github.com/mqyqingfeng/Blog/issues/13
 */
function objectFactory() {
    //由于new是关键字,故在此通过函数来实现
    let constructor = [].shift.call(arguments)
    //创建新对象,并把其原型指向构造函数的原型
    let obj = Object.create(constructor.prototype)
    // 构造函数的返回值
    let res = constructor.apply(obj, arguments)
    // 判断构造函数的返回值,如果是对象,这直接返回对象
    return typeof res === "object" ? res || obj : obj
}

function Person(age,name){
    this.age = age
    this.name = name
    return {
        name,
        age:11,
        sex:"male"
    }
}
Person.prototype.say = function(){
    console.log( "my name is " + this.name)
}
var person1 = objectFactory(Person,18,"yxh")
console.log(person1)
Person.prototype.hobbit = function(){
    console.log("JavaScript")
}
// person1.hobbit()