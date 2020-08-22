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
    scriptUrl: '//at.alicdn.com/t/font_2016956_hj77mmpzwq.js',
  });
  let mdtext = '# test  only ';
  const mdsrc = useRef();
  const mdres = useRef();
  // function changeBold() {
  //   console.log(mdsrc.current.editor.getSelection());
  //   mdsrc.current.editor.replaceSelection(
  //     '**' + mdsrc.current.editor.getSelection() + '**',
  //   );
  // }
  // function changeBold() {
  //   console.log(mdsrc.current.editor.getSelection());
  //   mdsrc.current.editor.replaceSelection(
  //     '**' + mdsrc.current.editor.getSelection() + '**',
  //   );
  // }

  function addHead(headtxt) {
    // console.log(mdsrc.current.editor.getCursor())
    // console.log(headtxt);
    // console.log(mdsrc.current.editor.getCursor());
    let lineno = mdsrc.current.editor.getCursor().line;
    let chno = mdsrc.current.editor.getCursor().ch;
    console.log(lineno + headtxt + chno);

    if (
      mdsrc.current.editor.getRange(
        { line: lineno, ch: 0 },
        { line: lineno, ch: headtxt.length },
      ) !== headtxt
    ) {
      mdsrc.current.editor.setCursor({ line: lineno, ch: 0 });
      mdsrc.current.editor.replaceRange(
        headtxt,
        { line: lineno, ch: 0 },
        { line: lineno, ch: 0 },
      );
    }
  }

  function mdreplace(start, end) {
    mdsrc.current.editor.replaceSelection(
      start + mdsrc.current.editor.getSelection() + end,
    );
  }
  // function changeBold() {
  //   console.log(mdsrc.current.editor.getSelection());
  //   mdreplace('**','**')
  //   // mdsrc.current.editor.replaceSelection(
  //   //   '**' + mdsrc.current.editor.getSelection() + '**',
  //   // );
  // }

  function changeUndo(params) {}
  function changeRedo(params) {}
  function changeList(params) {}
  function changeNumList(params) {}

  function changeCheckList(params) {}
  function changeTable(params) {}
  function changeLink(params) {}
  function changePicture(params) {}

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
            onMouseDown={() => addHead('# ')}
          />
          <IconFont
            className={style.iconfont}
            type="icon-cuti"
            title="粗体文字"
            onMouseDown={() => mdreplace('**', '**')}
          />

          <IconFont
            className={style.iconfont}
            type="icon-xieti1"
            title="斜体文字"
            onMouseDown={() => mdreplace('*', '*')}
          />

          <IconFont
            className={style.iconfont}
            type="icon-under-line1"
            title="下划线"
            onMouseDown={() => mdreplace('<u>', '</u>')}
          />
          <IconFont
            className={style.iconfont}
            type="icon-iconzhonghuaxian"
            title="中划线"
            onMouseDown={() => mdreplace('~~', '~~')}
          />

          <IconFont
            className={style.iconfont}
            type="icon-code"
            title="标记代码段"
            onMouseDown={() => mdreplace('`', '`')}
          />

          <IconFont
            className={style.iconfont}
            type="icon-undo"
            title="取消"
            onMouseDown={() => mdsrc.current.editor.undo()}
          />
          <IconFont
            className={style.iconfont}
            type="icon-redo"
            title="重做"
            onMouseDown={() => mdsrc.current.editor.redo()}
          />

          <IconFont
            className={style.iconfont}
            type="icon-liebiao-copy-copy-copy"
            title="列表"
            onMouseDown={() => addHead('- ')}
          />
          <IconFont
            className={style.iconfont}
            type="icon-number-list"
            title="数字列表"
            onMouseDown={() => addHead('1. ')}
          />
          <IconFont
            className={style.iconfont}
            type="icon-check-list"
            title="选择框"
            onMouseDown={() => addHead('- []输入 ')}
          />
          <IconFont
            className={style.iconfont}
            type="icon-table"
            title="表格"
            onMouseDown={() => addHead('|   |    |\n|   |   |\n|   |   |\n')}
          />
          <IconFont
            className={style.iconfont}
            type="icon-lianjie"
            title="链接"
            onMouseDown={() => mdreplace('[', '](http://)')}
          />
          <IconFont
            className={style.iconfont}
            type="icon-tupian"
            title="图片"
            onMouseDown={() => mdreplace('![](', ')')}
          />
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
