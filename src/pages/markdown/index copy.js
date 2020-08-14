import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button, Input, message } from 'antd';
const md = require('markdown-it')();
const { TextArea } = Input;

export default function index() {
  const mdsrc = useRef();
  const mdres = useRef();
  const mdtmp = useRef();
  function rendertohtml() {
    console.log(mdsrc.current.state.value);
    mdtmp.current = md.render(mdsrc.current.state.value);

    console.log(mdtmp.current);
    mdres.current.innerHTML = md.render(mdsrc.current.state.value);
    // mdres.current.innerHTML=md.render("# 1 \n ## 2 \n ### 3")
  }
  useEffect(() => {
    mdsrc.current.state.value = '# 文档源码 \n ## 标题2';
  }, []);

  return (
    <div>
      <TextArea ref={mdsrc}> </TextArea>
      <Button onClick={rendertohtml}>渲染</Button>
      <div ref={mdres}></div>
    </div>
  );
}
