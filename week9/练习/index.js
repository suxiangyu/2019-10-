Vue.filter('money', function (val) {
    return "￥" + (val / 100).toFixed(2)
})
let vm = new Vue({
    el: '#app',
    data: {
        name: "珠峰",
        datalist: [],
        show: false,
        delIndex: null
    },
    computed: {
        checkAll: {
            get() {
                if (!this.datalist.length) return false
                return this.datalist.every(item => item.isSelect)
            },
            set(val) {
                this.datalist.forEach(item => item.isSelect = val);
            }
        },
        total() {
            return this.datalist.filter(item => item.isSelect).reduce((prev, next) => prev + next.count * next.price, 0)
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            fetch('http://127.0.0.1:8080/jd/list').then((res) => {
                return res.json()
            }).then(data => {
                this.datalist = data.data
            }).catch((err) => {

            })
        },
        del(n) {
            this.delIndex = n;
            this.datalist.splice(n, 1)
        },
        clear() {
            this.datalist = [];
            this.checkAll = false;
        }
    },
})