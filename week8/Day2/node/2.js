var a = 12;

function f() {
    console.log(666)
}
console.log(a)
/* exports.a = a;
exports.f = f; */

/* exports = { // 只有exports不支持导出
    a,f
} */

/* module.exports.a = a;
module.exports.f = f; */

module.exports = { // 最常用的导出方式
    a,f
}
// node不能导出es6的内容  浏览器也不支持node导出的内容