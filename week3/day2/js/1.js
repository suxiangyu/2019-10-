// 正则是引用数据类型
var reg = /\d/;   // 字符串中只要有 数字即可
var reg = /^\d/;  // 字符串需要以数字开头
var reg = /\d$/;  // 字符串需要以数字结尾
var reg = /^\d$/; // 只能匹配单个数字
var reg = new RegExp('\\d');

console.log(reg.test('qwer234wer'))

var reg = /^\d?$/  // 只能匹配0-9