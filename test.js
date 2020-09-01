/*
 * @Author: yxh
 * @Date: 2020-08-23 00:35:10
 * @LastEditors: yxh
 * @LastEditTime: 2020-08-23 00:39:43
 * @Description: 
 */
//这是一个关于promise的题  https://juejin.im/post/6844903972008886279
new Promise((resolve,reject)=>{
    console.log("外部promise")
    resolve()
}).then(()=>{
    console.log("外部第一个then")
    new Promise((resolve,reject)=>{
        console.log("内部promise")
        resolve()
    }).then(()=>{
        console.log("内部第一个then")
    }).then(()=>{
        console.log("内部第二个then")
    })
}).then(()=>{
    console.log("外部第二个then")
})