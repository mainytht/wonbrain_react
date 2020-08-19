import React, { useRef, useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import marked from 'marked';
import style from './index.css';
import { createFromIconfontCN } from '@ant-design/icons';
// import styles from './index.less';

// 引入codemirror核心css,js文件（经试验css必须有，js文件还没发现它的用处）
import 'codemirror/lib/codemirror.css';
import 'codemirror/lib/codemirror.js';

// 自行引入 javascript java c++等 参考官网
// import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';

// 引入 ambiance 主题
import 'codemirror/theme/material.css';
// ambiance ...

export default params => {
  // const[mdtext,setMdtext]=useState("test")
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2016956_f441htrkwf.js',
  });
  let mdtext = '# test  only ';
  const mdsrc = useRef();
  const mdres = useRef();
  function changeBold() {
    console.log(mdsrc.current.editor.getSelection());
    mdsrc.current.editor.replaceSelection(
      '**' + mdsrc.current.editor.getSelection() + '**',
    );
  }
  function rendertohtml(editor, data, value) {
    // console.log(editor)
    // console.log(data)
    // console.log(value)
    mdres.current.innerHTML = marked(value);
  }
  useEffect(() => {
    mdres.current.innerHTML = marked(mdtext);
  }, []);

  return (
    <Row>
      <Col span={12}>
        <div className={style.mdtoolbar}>
          <IconFont
            className={style.iconfont}
            type="icon-biaoti13"
            title="改变标题"
          />
          <IconFont
            className={style.iconfont}
            type="icon-cuti"
            title="文件粗体"
            onMouseDown={changeBold}
          />
          <IconFont className={style.iconfont} type="icon-xieti1" />
          <IconFont
            className={style.iconfont}
            type="icon-liebiao-copy-copy-copy"
          />
          <IconFont className={style.iconfont} type="icon-lianjie" />
          <IconFont className={style.iconfont} type="icon-tupian" />
        </div>
        <CodeMirror
          ref={mdsrc}
          value={mdtext}
          // cursor不设的话有时候看不见
          options={{
            cursor: {
              line: 5,
              ch: 10,
            },
            lineNumbers: true, // 显示行号
            // columnNumbers:true, //没起作用
            theme: 'material', // 设置主题
            // readOnly: true, // 只读
            mode: 'markdown', // 实现代码高亮
            lineWrapping: true,
          }}
          onChange={rendertohtml}
        />
      </Col>
      <Col span={12}>
        <div ref={mdres}>preview</div>
      </Col>
    </Row>
  );
};
