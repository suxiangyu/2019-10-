import React from 'react';
import ReactDOM from 'react-dom'
class Clock extends React.Component {
    constructor() {
        super();
        this.state = {
            time: new Date().toLocaleString(),
            timer: null
        }
    }
    init = () => {
        // 一秒一更新 time即可
        clearInterval(this.timer);
        this.state.timer = setInterval(() => {
            this.setState({
                time: new Date().toLocaleString()
            })
        }, 500)
    }
    Noinit = () => {
        clearInterval(this.state.timer);
    }
    render() {
        let { time } = this.state;
        return (
            <div>
                <h1>当前时间是{time}</h1>
                <button onClick={this.init}>计时开始</button>
                <button onClick={this.Noinit}>计时停止</button>
            </div>
        )
    }
}
class App extends React.Component {
    constructor() {
        super();

    }
    render() {
        return <div className=''>
            <Clock />
        </div>;
    }
}

// export default App
ReactDOM.render(<App />, document.getElementById('root'))