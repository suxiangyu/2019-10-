(function (global, factory) {
    global.Vuex = factory()
})(this, function () {
    let Vue;
    class Store {
        constructor(options) {
            // Vue 代表的就是全局的Vue
            let vm = new Vue({
                data: {
                    state: options.state || {}
                }
            })
            // 这里用实例  是因为响应式
            // this.state = options.state || [];
            this.state = vm.state   // 这样vm数据一更新  视图就会更新 

            this.mutations = {};
            let mutations = options.mutations || {};
            Object.keys(mutations).forEach(key => {
                this.mutations[key] = (option) => { // mutation中的this是store 为了保持this指向  所以用箭头
                    mutations[key].call(this, this.state, option) // 为了保持this指向  只能用call
                }
            })


            this.actions = {};
            let actions = options.actions || {};
            Object.keys(actions).forEach(key => {
                this.actions[key] = (option) => {
                    // this 就是 store
                    // 第一个this是把函数中的this改成store
                    // 第二个this是传给函数的实参 store
                    actions[key].call(this, this, option)
                }
            })

            this.getters = {};
            let getters = options.getters || {};
            Object.keys(getters).forEach(key => {
                Object.defineProperty(this.getters, key, {
                    get: () => {
                        return getters[key].call(this, this.state)
                    }
                })
            })
            let commit = this.commit;
            this.commit = (type, option) => {
                commit.call(this, type, option)
            }
            let dispatch = this.dispatch;
            this.dispatch = (type, option) => {
                dispatch.call(this, type, option)
            }
        }
        commit(type, option) {
            console.log(this.mutations, type)
            this.mutations[type](option)
        }
        dispatch(type, option) {
            this.actions[type](option)
        }
    }
    function install(_Vue) {
        Vue = _Vue;
        // console.log(666, _Vue)
        // 给当前项目的每一个组件  都混入了一个beforecreate的钩子函数
        // 若某个组件存在对应的钩子函数, 那么先执行混入的钩子函数
        _Vue.mixin({
            beforeCreate() {
                // this 指的就是当前那个组件
                // console.log('beforeCreate',this)
                if (this.$options && this.$options.store) {
                    // 证明该组件是 根组件
                    // 把对应的store放到了自身的$store上
                    this.$store = this.$options.store
                    console.log(1111)
                } else {
                    // 走到这里的this都是 其他后代组件
                    // 因为beforeCreate的执行顺序是从上往下  这里假如还有孙子组件的话  上面根组件完成  这里走的是儿子组件 // 儿子组件会先执行  然后才往下走  而这时  孙子组件的父亲  儿子组件有了$store 所以无论套几个都可以实现
                    this.$store = (this.$parent && this.$parent.$store)
                }
            }
        })
    }
    function mapState(ary) {
        let obj = {};
        ary.forEach(key => {
            obj[key] = function () {
                // this 是当前的实例
                return this.$store.state[key]
            }
        })
        return obj;
    }
    function mapGetters(ary) {
        let obj = {};
        ary.forEach(key => {
            obj[key] = function () {
                // this 是当前的实例
                return this.$store.getters[key]
            }
        })
        return obj;
    }
    function mapActions(ary) {
        let obj = {};
        ary.forEach(key => {
            obj[key] = function (option) {
                this.$store.dispatch(key, option)
            }
        })
        return obj;
    }
    function mapMutations(ary) {
        let obj = {};
        ary.forEach(key => {
            obj[key] = function (option) {
                this.$store.commit(key, option)
            }
        })
        return obj;
    }
    return {
        Store,
        install,
        mapState,
        mapActions,
        mapMutations,
        mapGetters
    }
})