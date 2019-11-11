// fs  
// url.parse获取url参数   
// path.resolve 获取绝对路径
// http 是起服务的模块

// __dirname当前文件夹的绝对路径    __filename当前文件的绝对路径
let http = require('http'); // process.env   node全局下的一个属性   可以告诉你状态
let url = require('url');
let { readFile } = require('./promiseFs');

http.createServer((req, res) => {
    // req  存放的是请求信息
    // res  存放的是响应信息
    // 只要前端发送了请求 都会执行该函数
    // console.log(req.url) // 前端请求路径
    // console.log(req.method) // 前端请求方法
    console.log(url.parse(req.url, true)); // 解析前端路径
    // pathname 是前端给的纯路径
    // query 是前端在路径上给的参数
    let { pathname, query } = url.parse(req.url, true);
    if (pathname == '/favicon.ico') {
        // 前端请求的是小图标
        readFile('./1.jpg').then(data => {
            console.log(data)
            res.end(data);
        }).catch(() => {
            // 读取失败
            res.statusCode = 404; // 给前端的状态码
            res.statusMessage = 'hello hihihi~'  // 给前端的状态文本
        })
        // res.end('./1.jpg')
    } else {
        res.end(JSON.stringify(query))
    }
    // res.end('888') // 给前端响应的
    // res.statusCode = 404; // 给前端的状态码
    // res.statusMessage = 'hello hihihi~'  // 给前端的状态文本
}).listen(8000, () => {
    // 服务启动成功之后会执行该函数
    console.log("服务启动成功 端口是8000")
})