/*
 * @Author: yxh
 * @Date: 2020-08-17 21:59:18
 * @LastEditors: yxh
 * @LastEditTime: 2020-08-17 23:28:50
 * @Description: 
 */
//立即执行函数,防止变量污染
const myPromise = (function () {
    const PENDING = "pending",
        RESOLVED = "resolved",
        REJECTED = "rejected",
        PromiseValue = Symbol("PromiseValue"), //Symbol 类型防止外面访问
        PromiseStatus = Symbol("PromiseStatus"),
        ChangeStatus = Symbol("ChangeStatus")
    return class myPromise {
        //resolve和reject函数基本相同,可以抽取为公共函数
        [ChangeStatus](newStatus,newValue){
            if(this[PromiseStatus] !== PENDING){
                return
            }
            this[PromiseStatus] = newStatus
            this[PromiseValue] = newValue
        }
        constructor(executor) {
            this[PromiseStatus] = PENDING
            this[PromiseValue] = undefined
            let resolve = (data) => {
                //只有当当前状态是pending时才能改变其状态
                // if (this[PromiseStatus] !== PENDING) {
                //     return
                // }
                // this[PromiseStatus] = RESOLVED
                // this[PromiseValue]  = data
                this[ChangeStatus](RESOLVED,data)
            }
            
            let reject = (reason) => {
                // if(this[PromiseStatus] !==PENDING){
                //     return
                // }
                // this[PromiseStatus] = REJECTED
                // this[PromiseValue] = reason
                this[ChangeStatus](REJECTED,reason)
            }
            //当外面程序遇错误时,不介绍promise,而是进入reject状态
            try{
                executor(resolve, reject)
            }catch(err){
                this[ChangeStatus](REJECTED,err)
            }
        }
    }
})()