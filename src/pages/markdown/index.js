import React, {useState,useRef} from 'react'
import { Button, Input, message } from 'antd';
var md = require("markdown-it")();


export default function index() {
    const mdsrc=useRef()
    const mdres=useRef()
    function rendertohtml(){
        mdres.current.innerHTML=md.render(mdsrc.current.value)
    }
    return (

        <div>
            <textarea ref={mdsrc} >ddd</textarea>
            <Button onClick={rendertohtml}>渲染</Button>
            <div ref={mdres} ></div>
        </div>
    )
}
