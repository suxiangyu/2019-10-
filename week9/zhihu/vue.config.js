// module.exports = {
//     publicPath:'/',
//     devServer:{
//         proxy:{
//             // 本地访问 都被转移到了 知乎的后台
//             target:'https://www.zhihu.com/api/v4/'
//         }
//     }
// }
module.exports = {
    publicPath:'/',
    lintOnSave:false,
    devServer:{
        // 本地访问localhost:8080的时候 由node把请求转接到代理地址
        proxy:'https://www.zhihu.com/api/'
    }
}
// 这种方法官方的  稍微安全  上面重启服务器可能会挂
