/*
 * @Author: yxh
 * @Date: 2020-08-03 22:02:09
 * @LastEditors: yxh
 * @LastEditTime: 2020-08-03 22:23:40
 * @Description: 
 */
function deepClone(origin, target) {
    var target = target || {}
    for (const prop in origin) {
        //只遍历自身的属性,不会修改原型上自己添加的属性
        if (origin.hasOwnProperty(prop)) {
            //判断是否为原始数据
            if (origin[prop] !== "null" && typeof origin[prop] != "object") {
                target[prop] = origin[prop]
            } else {
                //判断其为数组还是对象,并建立相应的数据
                target[prop] = Object.prototype.toString.call(target[prop]) == "[object Array]" ? [] : {}
                //递归
                deepClone(origin[prop], target[prop])
            }
        }
    }
    return target
}

const obj = {
    name: "yxh",
    age: 23,
    sex: "meal",
    wife: {
        name: "abc",
        son: {
            name: "aaa"
        }
    }
}
let obj1 = {}
deepClone(obj, obj1)
console.log(obj1)