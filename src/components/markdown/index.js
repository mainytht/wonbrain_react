import { useRef, useEffect, useState, useContext } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import style from './index.css';
import { Tabs } from 'antd';
import { request } from 'umi';
const { TabPane } = Tabs;
import { createFromIconfontCN } from '@ant-design/icons';
import Mdcontext from '../../store/context/mdcontext.js';

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
// ambiance ...material

function Markdown() {
  const { mdstore, dispatch } = useContext(Mdcontext);

  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2016956_nwzo0eu00d.js',
  });
  const mdsrc = useRef();

  function uploadtocloud() {
    console.log(mdsrc.current.editor.getValue());

    request('/api/addmarkdown', {
      method: 'post',
      data: {
        userid: 'test', //wait for fulfil
        content: mdsrc.current.editor.getValue(),
      },
    }).then((res) => {
      console.log(res.data);
      if (!mdstore.mdid) dispatch({ type: 'setMd', action: res.data });
    });
  }

  function handleBeforeChange(instance, changeObj) {
    //自定义图片粘贴，这里更新后未能取得更新后的值，所以在update中渲染html
    let text = changeObj.text;
    let from = changeObj.from;
    let to = changeObj.to;
    if (text[0].match('^http(s)?\\:\\/\\/(\\S)*\\.(jpg|gif|png)$')) {
      changeObj.update(from, to, ['![图片](' + text[0] + ')']);
    }
  }
  function addHead(headtxt) {
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

  function handleUpdate(instance) {
    dispatch({ type: 'setMdtext', mdtext: instance.doc.getValue() });
  }

  return (
    <>
      <div className={style.mdtoolbar}>
        <IconFont
          className={style.iconfont}
          type="icon-shangchuanyunduan1"
          title="上传到云"
          onMouseDown={uploadtocloud}
        />
        <IconFont
          className={style.iconfont}
          type="icon-heading"
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
          type="icon-underline"
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
          type="icon-liebiaoshuzi"
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
          onMouseDown={() => addHead('|   |   |\n|   |   |\n|   |   |\n')}
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

        <IconFont
          className={style.right}
          type="icon-qiehuan"
          title="切换文档预览/项目管理"
          onMouseDown={(e) => {
            // setBpreview(bpreview === 'hidden' ? 'visible' : 'hidden');
          }}
        />
      </div>
      <CodeMirror
        onBeforeChange={handleBeforeChange}
        ref={mdsrc}
        value={mdstore.mdtext}
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
        onUpdate={handleUpdate}
      />
    </>
  );
}

export default Markdown;
