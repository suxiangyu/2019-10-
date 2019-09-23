var reg = /d/;
var reg = new RegExp('\d')
console.log(reg.test('qwert123456'))  // false
console.log(reg.test('abcdd123456'))  // true
var reg = /\d/;
var reg = new RegExp('\\d')
console.log(reg.test('qwert123456'))  // true
console.log(reg.test('abcdd123456'))  // true

var reg = /\\d/;
console.log(reg.test('qwert123456'))  // false
console.log(reg.test('a\\dd123456'))  // true

var reg = /\w/;
console.log(reg.test('_'))

var reg = /\d?/
console.log(reg.test('q1wwzefzgda'))


var reg = /\d{2}/
console.log(reg.test('q1wwzefzgda'))   // false
console.log(reg.test('q12wwzefzgda'))  // true
console.log(reg.test('q123wwzefzgda')) // true

