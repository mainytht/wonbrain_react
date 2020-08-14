import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button, Input, message } from 'antd';
const md = require('markdown-it')();
const { TextArea } = Input;

export default function index() {
  const [mdText, setMdText] = useState('#请输入');
  const [mdHtml, setMdHtml] = useState('#结果输出');
  const refHtml = useRef();
  const handleupdate = tmp => {
    console.log(tmp);
    setMdText(tmp);
    let tmpHtml = md.render(tmp);
    setMdHtml(tmpHtml);
    refHtml.current.innerHTML = tmpHtml;
  };

  return (
    <div>
      <TextArea
        value={mdText}
        onChange={e => {
          handleupdate(e.target.value);
        }}
      ></TextArea>
      <br />
      html源码
      <div>{mdHtml}</div>
      <br />
      html渲染
      <div ref={refHtml}></div>
    </div>
  );
}
