// 导入1
/* import qqq from './2.js';
console.log(qqq)
// f()
qqq(); */

// 导入2
/* import * as qqq from './2.js'
console.log(qqq); */
/* import * as qqq from './2.js';
let {
    ary: arr,
    f
} = qqq; */

// 导入3
import {
    f,
    ary
} from './2.js';
// ary 在2.js中是通过const声明的，这种引入方式不能修改对应的地址
f();
console.log(ary)