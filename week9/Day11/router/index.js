(function (global, factory) {
    global.VueRouter = factory();
})(this, function () {
    class VueRouter {
        constructor(options) {
            let {
                routes
            } = options;
            // routes [{path:'',component:a}]
            // {'/a':a}
            this.routeMap = routes.reduce((obj, cur) => {
                obj[cur.path] = cur.component;
                return obj
            }, {})
            window.addEventListener('load', () => {
                location.hash = location.hash || '/'
            })
            Vue.util.defineReactive(this,'_route','/')  
            // 上面这行是关键的关键
            // vue的原生方法  把route做成了响应式  只要改变立马响应
            this._route = location.hash.slice(1)
            window.addEventListener('hashchange', () => {
                this._route = location.hash.slice(1)
            })
        }
    }
    VueRouter.install = function (_Vue) {
        // 只要Vue.use()执行了  这个install方法就会执行
        console.log(_Vue)
        _Vue.mixin({
            beforeCreate() {
                if (this.$options && this.$options.router) {
                    this._router = this.$options.router;
                } else {
                    this._router = this.$parent._router
                }
            },
        })
        _Vue.component('router-link', {
            props: {
                to: String  // 要接收一个to属性  类型需要是一个字符串
            },
            // template:`<a :href='"#"+to'><slot></slot></a>`,
            render(h) {
                return h('a', {
                    attrs: {
                        href: '#' + this.to
                    }
                }, this.$slots.default)
            },
        })
        _Vue.component('router-view', {
            render(h) {
                // this  router-view这个组件
                return h(this._router.routeMap[this._router._route])
            },
        })
    }
    return VueRouter;
})