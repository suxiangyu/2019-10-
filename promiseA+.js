function MyPromise(exector) {
    let self = this;
    self.value = undefined;
    self.reason = undefined;
    self.status = 'pending';
    self.resCallback = [];
    self.rejCallback = [];
    function resolve(value) {
        setTimeout(() => {
            if (self.status === 'pending') {
                self.status = 'resolved'
                self.value = value;
                self.resCallback.forEach(item => {
                    item && item(self.value)
                });
            }
        })
    }
    function reject(reason) {
        setTimeout(() => {
            if (self.status === 'pending') {
                self.status = 'rejected'
                self.reason = reason;
                self.rejCallback.forEach(item => {
                    item && item(self.reason);
                })
            }
        })
    }
    try {
        exector(resolve, reject)
    } catch (error) {
        reject(error)
    }
}
MyPromise.prototype.then = function (res, rej) {
    let self = this;
    return new MyPromise(function (res2, rej2) {
        if (self.status === 'resolved') {
            try {
                let value = res(self.value)
                res2(value)
            } catch (error) {
                rej2(error)
            }
        }
        if (self.status === 'rejected') {
            try {
                let reason = rej(self.reason)
                res2(reason)
            } catch (error) {
                rej2(error)
            }
        }
        if (self.status === 'pending') {
            self.resCallback.push(function (value) {
                try {
                    let val = res(value)
                    res2(val)
                } catch (error) {
                    rej2(error)
                }
            })
            self.rejCallback.push(function (reason) {
                try {
                    let val = rej(reason);
                    res2(val)
                } catch (error) {
                    rej2(error)
                }
            })
        }
    })
}
MyPromise.all = function (ary) {
    return new MyPromise(function (res, rej) {
        let done = gen(ary.length, res);
        ary.forEach((item, index) => {
            item.then((data) => {
                done(index, data)
            }, rej)
        })
    })
}
function gen(length, res) {
    let values = [];
    let count = 0;
    return function (index, value) {
        values[index] = value;
        if (++count == length) {
            res(values)
        }
    }
}