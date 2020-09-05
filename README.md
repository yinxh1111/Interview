<!--
 * @Author: yxh
 * @Date: 2020-08-02 23:15:50
 * @LastEditors: yxh
 * @LastEditTime: 2020-09-05 10:48:03
 * @Description: 
-->

## commonjs与ES6中的模块区别

1. commonjs模块输出的是一个值的拷贝,ES6模块输出的是值的引用
2. Commonjs模块是运行时加载,ES6模块是编译时输出接口
3. Commonjs单个值导出,ES6 Module 可以导出多个
4. Commonjs是动态语法可以写在判断里,ES6 Module 是静态语法只能写在顶层
5. Commonjs 的this是当前模块 ES6 Module 的this是undefined

Array. prototype. map 使用时, 只有数组中被初始化过的元素才会被触发, 其余都是undefined

## 浏览器输入url到页面呈现出来发生了什么?

1. 进行地址解析,解析(主机,域名,端口号,参数等) 根据域名进行DNS解析 浏览器--操作系统--本地DNS服务器--RootServer服务商 通过这一顺序查找DNS缓存中是否有对应的IP地址 根据IP地址寻找服务器
2. 与服务器建立连接
3. 进入服务器,寻找对应的请求
4. 浏览器接受到响应码开始处理
5. 浏览器开始渲染dom 下载CSS 图片等资源,直到请求完成

## http 和 https的区别

1. https协议需要申请证书,多半为付费证书
2. http是超文本传输协议 信息是明文传输 https则是具有安全性的SSL加密传输协议
3. 完全不同的连接方式,端口也不一样,http默认80端口,https默认443
4. http的连接很简单,是无状态的 https协议是由SSL+HTTP协议构建的可进行加密传输 身份认证的网络协议 比http协议安全

## 跨域

1. 浏览器出于安全考虑,有同源策略(协议 域名 端口 三者必须相同)
2. 解决方案
* JSONP 原理就是利用`` `<script>` ``标签没有跨域 限制, 通过src属性, 发送带有callback参数的GET请求, 服务端将接口返回数据拼凑到callback函数中, 返回给浏览器, 浏览器解析执行, 从而前端拿到callback函数返回的数据 JSONP使用简单且兼容性也不错, 但仅限于get请求
* CORS(跨域资源共享) CORS是W3C标准, 全CORS 需要浏览器和后端同时支持
* document.domain 该方式只能用于二级域名相同的情况下, 比如a.test.com和b.test.com 只需给页面添加document.domain="test.com"
* webpack 配置proxyTable设置为开发环境跨域
* nginx 代理跨域
* iframe跨域
* postMessage 这种方式通常用于获取嵌入页面中的第三方页面数据, 一个页面发送消息, 另一个页面判断来源并接受消息

## TCP的三次握手和四次挥手

1. 第一次握手:客户端发送一个SYN码给服务器,要求建立数据连接;
2. 第二次握手:服务器发送SYN码和一个ACK(确认包)给客户端,表示可以建立连接
3. 第三次握手:客户端再次发送ACK给服务器,服务器验证ACK没有问题,则建立连接
4. 第一次挥手:客服端发送FIN(结束)报文,通知服务器数据已传输完毕;
5. 第二次挥手:服务端收到FIN报文之后,发送ACK给客服端,数据还没有传输完毕
6. 第三次挥手:服务器已传输完毕,再次发送FIN通知客户端,数据已传输完毕
7. 第四次挥手:客户端再次发送ACK,进入TIME_WAIT状态;服务器和客户端断开连接

## get和post请求的区别以及在缓存方面的区别

1. 缓存一般只适用于那些不会更新服务端数据的请求
2. 一般get请求都是查找请求,不会对服务器资源数据造成修改
3. 而post请求一般会对服务器数据造成修改,所以一般会对get请求进行缓存,很少对post请求进行缓存  
4. get和post请求的区别:由于服务器对get和post进行了差异化的处理  
5. get请求一般没有请求体(从path中读取),而post有
6. get请求由于业务数据放在地址中,安全性较差
7. get请求传递业务数据有限(主要是地址栏受限),post一般来说是无限的,除非服务器限制
8. get请求易于分享页面内容(请求业务数据在地址栏中,而post请求的业务数据在请求体中)
9. 刷新页面,会已之前的请求方式再次请求

## websocket和ajax轮询

1. websocket是HTML5中提出的新协议,可以实现客服端与服务器的通信,实现服务器的推送功能
2. websocket的优点,只需建立一次连接,就可以连续不断的得到服务器的推送消息,节省带宽和服务器的压力
3. ajax轮询模拟常连接 就是每隔一段时间(0.5s)就想服务器发送ajax请求,查询服务器的数据是否有更新
4. ajax的缺点,每次都需要建立http连接,即使需要传输很少的数据,也会浪费带宽  

## ajax是什么? 如何创建一个Ajax

1. ajax是通过JavaScript创建的异步通信,从服务器获取XML文档从中提取数据,再更新网页相应部分,而不用刷新整个网页
2. 创建ajax的步骤
    - 创建XMLHttpRequest对象 var xhr = new XMLHttpRequest()
    - 创建新的请求, 并设置请求方式, 地址, 验证信息 xhr.open("GET", URL, true)
    - 设置监听函数  
```js
    xhr.onreadystatechange = function() {
        if (this.readyState! == 4) return
        //请求成功时
        if (this.status == 200) {
            handle(this.response)
        } else { //请求错误信息
            console.error(this.statusText)
        }
    }
    //请求失败
    xhr.onerror = function() {
        console.log(this.statusText)
    }
    //设置请求头
    xhr.setRequestHeader("Accept", "application/json")
    //设置返回数据类型
    xhr.responseType = "json"
    xhr.send(null) //发送请求
```  
## 浏览器缓存机制   
浏览的缓存分为两种,一种是强缓存,一种的协商缓存
    

- 强缓存的两种方式,分别是http头信息中的expires属性和Cache-Control(private,no-cache,no-store,)
- 协商缓存,会向服务器发送一个请求,也有两种方式,分别是http头信息中的Last-modified(资源最后在服务器的修改时间) 和Etag(唯一标识符)

## 源码,反码,补码及位运算的介绍

正数的反码和其原码一样；负数的反码，符号位为 1，数值部分按原码取反。最高位为符号,1表示为负,0表示为正
如 [+7]原 = 00000111,[+7]反 = 00000111;[-7]原 = 10000111，[-7]反 = 11111000.  
```>>1```表示按二进制右移一位,及除于二向下取正```5>>1==2``` 
```<<1```表示按二进制左移一位,及乘以二```5<<1==10```  
& 与运算: 也会先转为二进制 ```5&4==>101$100==>100==>4```  
| 或运算: 真为真, ```6|5==>110|101==>111==>7```
^ 异或运算:两个值相同为0,不同为1 ```6^5==>110^101==>011==>3```

## 使用setTimeout模拟实现setTimeInterval

原理: 使用递归不断执行setTimeout
    

 ```js
    function mySetTimeInterval(fn, timeout) {
        let timer = {
            flag: true
        }

        function interval() {
            if (timer.flag) {
                fn()
                setTimeout(interval, timeout)
            }
        }
        setTimeout(interval, timeout)
        return timer
    }
 ```  
## 浏览器的渲染过程
浏览器渲染过程因不同内核可能会有差异，现以webkit为例描述浏览器渲染原理，浏览器渲染过程主要分为三个阶段，先详述如下：  

第一阶段：
1. 用户输入URL时，webkit依赖网络模块加载网页或资源数据
2. 网页被交给HTML解释器转变成一系列的词语
3. 解释器根据词语构建节点并形成DOM树
4. 如果节点是CSS、图片、视频等资源，会调用资源加载器加载他们，因该类资源加载是异步的，不会阻塞当前DOM树的继续创建
5. 如果节点是javascript，停止当前DOM树的创建，直到javascript资源加载完成并被javascript引擎执行后才继续进行DOM的创建  

第二阶段：
1. CSS解释器解析CSS文件成内部表示结构，并在DOM树上附加样式信息形成RenderObject树
2. RenderObject节点在创建的同时，webkit会根据网页的层次结构创建RenderLayer树，同时创建一个虚拟的绘图上下文  

第三阶段：
1. 根据生成的绘图上下文和2D或3D图形库生成最终的图像
对于包含动画和用户交互的动态网页，浏览器的渲染过程会重复的执行，可能会触发不同程度的重排和重绘。

重排属性：height、line-height、font-size、border  

重绘属性：height、line-height、font-size 、border、background-color、visibility  
## JS异步的解决方案  
[参考原文](https://www.cnblogs.com/zuobaiquan01/p/8477322.html)
1. 回调模式(callback)  
    
```js
function f1(callback){
　　setTimeout(function () {
　　　　// f1的任务代码
　　　　callback();
　　}, 1000); //异步回调有setTimeout函数,同步回调则没有
}// 执行f1(f2)  
```  
  - 其优缺点,优点:简单、容易理解和部署，缺点是不利于代码的阅读和维护，各个部分之间高度耦合（Coupling），流程会很混乱，而且每个任务只能指定一个回调函数.  
2. 事件监听  
   通过事件来驱动函数  
   首先为f1绑定事件```f1.on("done",f2)```,然后触发事件  
   ```js
    function f1(){
    setTimeout(function(){
       //f1的任务代码
       f1.trigger('done');  
    },1000);
   }
   ```
   - 这种方法的优点：比较容易理解，可以绑定多个事件，每一个事件可以指定多个回调函数，而且可以去耦合，有利于实现模块化。

    - 这种方法的缺点：整个程序都要变成事件驱动型，运行流程会变得不清晰。  
    >注意通过onclick方法绑定事件,只有最后一个事件会被添加,而通过attachEvent和addEventLister方法则可以绑定多个事件(但两者的执行顺序有点区别,第一种是倒叙执行,即后绑定先执行,第二种则需看第三个参数,默认为false,和上面执行顺序一样,为true则相反)  
3. 发布/订阅模式  
   我们假定，存在一个"信号中心"，某个任务执行完成，就向信号中心"发布"（publish）一个信号，其他任务可以向信号中心"订阅"（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做"发布/订阅模式"（publish-subscribe pattern），又称"观察者模式"（observer pattern）。  
   首先向订阅中心订阅信号(采用jQuery)  
   ```jQuery.subscribe("done",f2)```  
   然后f1执行以下代码  
    ```js
    function f1(){
        setTimeout(function () {
    　　　　// f1的任务代码
    　　　　jQuery.publish("done");
    　　}, 1000);
    } //f1代码执行完毕向订阅中心发布done信号,从而执行f2函数
    ```  
    - 这种方法的性质与"事件监听"类似，但是明显优于后者。因为我们可以通过查看"消息中心"，了解存在多少信号、每个信号有多少订阅者，从而监控程序的运行。
4. promise  
5. async/await  
## Vue组件的通信  
[原文链接](https://segmentfault.com/a/1190000019208626)  
1. props/$emit(父子组件之间的通信)
2. $emit/$on(EventBus)
3. Vuex(action(dispatch),mutation(commit))
4. $attrs/$listers($attrs除了props属性)
5. provide/inject(简单提供以及组件,不会是响应式数据,需要响应式数据时,需要在provide时用Vue.observable()包裹一下)
6. $parent/$children与ref