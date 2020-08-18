/*
 * @Author: yxh
 * @Date: 2020-08-17 21:59:18
 * @LastEditors: yxh
 * @LastEditTime: 2020-08-18 22:02:17
 * @Description: 
 */
//立即执行函数,防止变量污染
const myPromise = (function () {
    const PENDING = "pending",
        RESOLVED = "resolved",
        REJECTED = "rejected",
        PromiseValue = Symbol("PromiseValue"), //Symbol 类型防止外面访问
        PromiseStatus = Symbol("PromiseStatus"),
        ChangeStatus = Symbol("ChangeStatus"),
        thenAbles = Symbol("thenAbles"),
        catchAbles = Symbol("catchAbles"),
        settleHandle = Symbol("settleHandle")

    return class myPromise {
        //resolve和reject函数基本相同,可以抽取为公共函数,改变状态
        [ChangeStatus](newStatus, newValue, queue) {
            if (this[PromiseStatus] !== PENDING) {
                return
            }
            this[PromiseStatus] = newStatus
            this[PromiseValue] = newValue
            queue.forEach(handler => { handler(newValue) })
        }
        constructor(executor) {
            this[PromiseStatus] = PENDING
            this[PromiseValue] = undefined
            this[thenAbles] = []
            this[catchAbles] = []
            let resolve = (data) => {
                //只有当当前状态是pending时才能改变其状态
                // if (this[PromiseStatus] !== PENDING) {
                //     return
                // }
                // this[PromiseStatus] = RESOLVED
                // this[PromiseValue]  = data
                this[ChangeStatus](RESOLVED, data, this[thenAbles])
                // this[thenAbles].forEach(item=>{
                //     item(this[PromiseValue])
                // })
            }

            let reject = (reason) => {
                // if(this[PromiseStatus] !==PENDING){
                //     return
                // }
                // this[PromiseStatus] = REJECTED
                // this[PromiseValue] = reason
                this[ChangeStatus](REJECTED, reason, this[catchAbles])
            }
            //当外面程序遇错误时,不介绍promise,而是进入reject状态
            try {
                executor(resolve, reject)
            } catch (err) {
                this[ChangeStatus](REJECTED, err)
            }
        }
        //抽离then和catch函数
        [settleHandle](handler, immediatelyStatus, queue) {
            //如果传入的不是函数,则什么也不做,then的第二个参数未传入的时候
            if(typeof handler !=="function"){
                return
            }
            //如果状态已经改变了则直接运行
            if (this[PromiseStatus] === immediatelyStatus) {
                setTimeout(() => {
                    handler(this[PromiseValue])
                }, 0);
            } else {
                queue.push(handler)
            }
        }
        then(thenAble, catchAble) {
            //如果已经是resolve状态则直接运行函数
            // if(this[PromiseStatus]===RESOLVED){
            //     //此处本应该放入微队列中,但无话模拟微队列,故用setTimeout来替代
            //     setTimeout(() => {
            //         thenAble(this[PromiseValue])
            //     }, 0);
            // //否则添加到thenables数组中
            // }else{
            //     this[thenAbles].push(thenAble)
            // }
            // if(catchAble){
            //     this.catch(catchAble)
            // }
            this[settleHandle](thenAble, RESOLVED, this[thenAbles])
            this.catch(catchAble)
        }
        catch(catchAble) {
            // if(this[PromiseStatus]===REJECTED){
            //     setTimeout(() => {
            //         catchAble(this[PromiseValue])
            //     }, 0);
            // }else{
            //     this[catchAbles].push(catchAble)
            // }
            this[settleHandle](catchAble, REJECTED, this[catchAbles])
        }
    }
})()