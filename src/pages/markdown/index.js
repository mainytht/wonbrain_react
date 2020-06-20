import React, {useState,useRef,useEffect} from 'react'
import { Button, Input, message } from 'antd';
const md = require("markdown-it")();
const { TextArea } = Input;

export default function index() {
    const mdsrc=useRef()
    const mdres=useRef()
    function rendertohtml(){
        console.log(mdsrc)
        mdres.current.innerHTML=md.render(mdsrc.current.state.value)
    }
    useEffect(()=>{
        mdsrc.current.state.value="# 文档源码"
    },[])
        
   
    return (

        <div>
            <TextArea ref={mdsrc} ></TextArea>
            <Button onClick={rendertohtml}>渲染</Button>
            <div ref={mdres} ></div>
        </div>
    )
}
