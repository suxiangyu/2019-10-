// promise有几个特点
// 它有三个状态 fulfilled rejected pending
// 一旦执行了成功的回调，就会在then的第一个参数函数中拿到成功返回值
// 一旦执行了失败的回调或执行过程失败，机会在then的第二个参数函数中拿到失败的返回值
// 可以连续.then 第二个.then要执行哪一个函数参数，要看第一个.then的函数执行情况
function Promise(executor) {
    let self = this; //保证this的指向
    self.status = "pending"; //status 是为了存储promise 的状态，promise有三种状态 pending fuilfilled rejected

    self.value = ""; //用来存储成功的回调函数执行传进来的参数
    self.reason = ""; // 用来存储失败的回调函数传进来的参数

    self.onResolvedCallbacks = []; // 成功函数的事件池
    self.onRejectedCallbacks = []; // 失败回调的事件池
    function resolve(value) {
        if (self.status === "pending") {
            self.value = value;
            self.status = "fulfilled";
            // 如果用户异步执行的是 resolve的话，就会 发布 onResolvedCallbacks事件池中的函数，并将用户传进来的self.value传递进去
            // 交给成功的回调执行其他的逻辑
            self.onResolvedCallbacks.forEach(fn =>
                fn && fn(self.value)
            );
        }
    }
    function reject(reason) {
        if (self.status === 'pending') {
            self.reason = reason;
            self.status = "rejected";
            // 如果用户异步执行的是reject的话，就会发布 onRejectedCallbacks事件池中的函数，并将用户传进来的的self.reason传递进去
            // 交给失败的回调执行其他的逻辑
            self.onRejectedCallbacks.forEach(fn =>
                fn && fn(self.reason)
            );
        }
    }
    try {
        // 用try catch 捕获 executor 执行过程中出的错误
        executor(resolve, reject);
    } catch (error) {
        // 如果执行错误的话，直接执行reject函数，并将错误原因传进去，交给用户
        reject(error);
    }
}
// then函数是promise中的原型方法，提供给每一个promise实例
Promise.prototype.then = function (onFulfilled, onRejected) {
    let self = this;
    // onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
    // onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
    let p = new Promise(function (resolve2, reject2) {
        // 如果是两个点then的话就将，就是看上一个then中的两个回调函数，执行成功了还是失败了，
        // 如果执行成功了就执行第二个promise的resolve2，并自动进行接下来的流程
        // 如果执行失败了的话就执行第二个promise的reject2，并继续进行接下来的流程
        // 其中必须通过javascript的try catch语句捕获

        // 一个then执行的时候，直接把交给用户使用的onRejected，或者onFulfilled装进事件池中，
        // 等异步执行完毕的时候，如果用户订阅的是resolve的话，就发布事件池中onRejectedCallbacks中的东西
        // 如果用户订阅的是rejected的话，就发布事件池中onRejectedCallbacks中的东西，并将用户传进来的value或者reason再传进去

        // 如何判断是res执行还是rej执行  根据promise 的三种状态执行
        if (self.status === 'fulfilled') {
            try {
                let x = onFulfilled(self.value);
                resolve2(x);
            } catch (error) {
                reject2(error);
            }
        }
        if (self.status === 'onRejected') {
            try {  //try catch 是为了捕捉 如果上一个then 中成功或失败回调的执行情况，如果上一个then中成功的回调执行成功，
                // 那么返回值就会传递给下一个then中回调的成功，
                // 如果失败的话，就会被try catch 语句捕获，执行reject2，交给失败的回调处理
                let x = onRejected(self.reason);
                resolve2(x);
            } catch (error) {
                reject2(error);
            }
        }
        //多个then的pending的时候（异步的时候）
        if (self.status === 'pending') {
            // self.onResolvedCallbacks.push(onFulfilled);
            // self.onRejectedCallbacks.push(onRejected); 

            // 在这里为什么要向成功的事件池和失败的事件池中都订阅事件？
            // 因为异步的时候我们并不知道用户是执行的成功还是失败，
            // （同步的时候，按照同步逻辑一套执行下去，分辨用户执行的resolve还是reject很容易）
            // 但是如果是异步任务的话，它会等待同步的任务执行成功之后，才会执行异步的，而此时，已经执行到then了，
            // 用户的resolve或者reject还没有执行，没有执行也就没有状态，程序也就不知道到该执行什么，程序就会一直处于pending状态
            // 此时，使用发布订阅模式，将执行成功的回调和执行失败的回调都分别推到事件池中(订阅),
            // 等到成功的执行或失败的执行，就发布相应事件池中的函数，执行函数中的逻辑

            self.onResolvedCallbacks.push(function (val) {
                // 异步多个then的时候，基本思路和同步执行resolve和reject一样，不一样的是
                // 为了处理多个then 值传递给下一个then中执行的情况（即try catch的情况）
                // 将原本直接push onFulfilled 或者 onRejected 改成
                // 在最外层包一层函数(类似于高阶函数),推进事件池中，事件池中包含有处理错误try catch 
                try {
                    let x = onFulfilled(val);
                    resolve2(x);
                } catch (error) {
                    reject2(error);
                }
            })
            // 此function执行的时候，会接受执行的value或者reason
            self.onRejectedCallbacks.push(function (reason) {
                try {
                    let x = onRejected(reason);
                    resolve2(x);
                } catch (error) {
                    reject2(error);
                }
            })
        }

    })

}

let p = new Promise(function (res, rej) {
    // res(123);
    // rej(345);
    setTimeout(() => {
        rej(111);
    }, 1000)
});

p.then(data => {
    console.log(qqq);
    return data
}, (err) => {
    console.log(err);
    return 'hello'
}).then(data2 => {
    console.log(data2);
}, err => {
    console.log(err);
})