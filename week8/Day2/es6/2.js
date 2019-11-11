/* var a = {
    q: 123
};

function f() {
    console.log(a)
}
// 导出
export default {
    a,
    f
} */
export var a = {
    q: 123
};
export function f() {
    console.log(a)
};
export let b = 12;
export const ary = [1, 2, 3, 4]; // 解构只能通过这种方式
b = 13; // 导出之后还可以修改值 将改完的值导出。