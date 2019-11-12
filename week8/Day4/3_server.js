// 实现一个登录的功能
let express = require('express');
let qs = require('qs');
let session = require('express-session');
let { readFile, writeFile } = require('./promiseFs');
let app = express();
app.listen(8000, function () {
    console.log('后端接口服务 起于8000')
})

// 解决跨域的问题 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3000')
    res.header('Access-Control-Allow-Credentials', true)
    next();
})

// 把post请求的参数 转成普通对象 存放到req.body上
app.use((req, res, next) => {
    let str = '';
    req.on('data', (chunk) => {
        str += chunk;
    })
    req.on('end', () => {
        let obj = {};
        try {
            obj = JSON.parse(str)
        } catch (error) {
            obj = qs.parse(str)
        }
        req.body = obj;
        next();
    })
})


// 把读取数据的操作放到中间件上
app.use((req, res, next) => {
    readFile('./user.json').then(data => {
        req.data = JSON.parse(data);
        next();
    }).catch(err => {
        // 读取失败  给前端500
        res.status(500);
        res.send('');
    })
})

// 接口
app.post('/reg', function (req, res) {
    // 实现注册接口
    let { username, password } = req.body;
    let data = req.data;
    let bol = data.some(item => {
        return item.username === username
    })
    // bol是true;  证明之前有这个人
    if (bol) {
        res.send({
            code: 1,
            msg: 'already has this man'
        })
        return;
    }
    // Object.assign(data,req.body); // assign 可以合并对象
    data.push(req.body);
    writeFile('./user.json', JSON.stringify(data)).then(data => {
        // 写入成功
        res.send({
            code: 0,
            data: 'success'
        })
    }).catch(() => {
        res.send({
            code: 1,
            data: 'fail'
        })
    })
})
app.post('/login', function (req, res) {
    let { username, password } = req.body;
    let bol = req.data.some(item => {
        return item.username == username && item.password == password;
    })
    if (bol) {
        // 登录成功  需要后端给前端种植一个cookie
        session({
            name:'hello',
            secret:"myqqq",
            resave:false,
            saveUninitialized:false,
            cookie:{
                maxAge:1000*60*60
            }

        })
        res.send({
            code: 0,
            data: {
                name: username
            }
        })
    } else {
        res.send({
            code: 2,
            mes: '用户名或密码错误'
        })
    }
})

