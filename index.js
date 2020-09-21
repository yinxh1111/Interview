function instance_of(L, R) {//L 表示左表达式，R 表示右表达式
    var O = R.prototype;// 取 R 的显示原型
    L = L.__proto__;// 取 L 的隐式原型
    while (true) {
        if (L === null)
            return false;
        if (O === L)// 这里重点：当 O 严格等于 L 时，返回 true
            return true;
        L = L.__proto__;
    }
}
//比如
Foo instanceof Foo
// 为了方便表述，首先区分左侧表达式和右侧表达式
FooL = Foo, FooR = Foo;
// 下面根据规范逐步推演
O = FooR.prototype = Foo.prototype
L = FooL.__proto__ = Function.prototype
// 第一次判断
O != L
// 循环再次查找 L 是否还有 __proto__
L = Function.prototype.__proto__ = Object.prototype
// 第二次判断
O != L
// 再次循环查找 L 是否还有 __proto__
L = Object.prototype.__proto__ = null
// 第三次判断
L == null