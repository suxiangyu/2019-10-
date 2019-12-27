import React from 'react'
import ReactDOM from 'react-dom'
import Hello from './1'
import Clock from './3._计时器'

ReactDOM.render(<div>
    <Hello/>
    <Clock/>
</div>,document.getElementById('root'),function(){
    // 在DOM挂载完成之后触发
})
