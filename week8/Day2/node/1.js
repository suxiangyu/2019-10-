// node的模块化是遵循commen.js规范
let qqq = require('./2.js')
console.log(qqq)
qqq.f();
// 每一个JS文件对于node来说都是一个大闭包
// require  __dirname  __filename  module.exports  exports
// 以上五个都是属于当前JS文件的私有变量
// require 是用来导入文件的
// module.exports 和exports 都是用来导出内容的
// __dirname 是当前文件所在文件夹的绝对路径
// __filename 是当前文件的绝对路径
console.log('文件夹路径', __dirname)
console.log('文件路径', __filename)

// npm i less less-loader --save-dev
// npm run 对应的脚本命令(在package.json的script中对应的属性名)

/* 
    装上了less 和 less-loader插件
    修改过package.json文件  改了对应的script属性中的myqqq
    有对应的less文件
*/
console.log(process.env);