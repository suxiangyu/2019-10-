import React from 'react'
import ReactDOM from 'react-dom'

console.log(React.Component)
class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  // 就是 vue的 data属性
            name: "珠峰",
            age: 10,
            sex: "男"
        }
    }
    // fn1() { }
    // static fn = { qqq: 123 }
    render() {
        console.log(this); // 在render中  我们可以直接使用this.props去获取参数
        let { className, data } = this.props;
        let { name, age, sex } = this.state;
        // react 有两个数据源  自己的state 和 传进来的props
        return (
            <div className={className}>
                class 组件
                内容是{JSON.stringify(data)}
                <h2>名字是{this.state.name}</h2>
                <h2>年龄是{age}</h2>
                <h2>性别是{sex}</h2>
            </div>
        )
    }

}

ReactDOM.render(<Child className='box' data={{ name: '珠峰' }} />, document.getElementById('root'));