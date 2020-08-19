import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button, Input, message } from 'antd';
import ReactMarkdown from 'react-markdown';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';
const md = require('markdown-it')({
  html: true, // Enable HTML tags in source
  xhtmlOut: false, // Use '/' to close single tags (<br />).
  // This is only for full CommonMark compatibility.
  breaks: true, // Convert '\n' in paragraphs into <br>
  langPrefix: 'language-', // CSS language prefix for fenced blocks. Can be
  // useful for external highlighters.
  linkify: false, // Autoconvert URL-like text to links

  // Enable some language-neutral replacement + quotes beautification
  typographer: false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externally.
  // If result starts with <pre... internal wrapper is skipped.
  highlight: function(/*str, lang*/) {
    return '';
  },
});
const { TextArea } = Input;

export default function index() {
  const [mdText, setMdText] = useState('#请输入');
  const [mdHtml, setMdHtml] = useState('#结果输出');
  const refHtml = useRef();
  const msText = useRef();
  var monacoInstance;
  const handleChange = e => {
    let tmp = e.target.value;
    console.log(tmp);
    setMdText(tmp);
    let tmpHtml = md.render(tmp);
    setMdHtml(tmpHtml);
    refHtml.current.innerHTML = tmpHtml;
  };
  useEffect(() => {
    monacoInstance = monaco.editor.create(msText.current, {
      value: `console.log("hello,world")`,
      language: 'markdown',
    });
  }, []);

  return (
    <div>
      <TextArea
        style={{ width: '800px', height: '200px', border: '11px' }}
        value={mdText}
        onChange={handleChange}
      ></TextArea>
      <br />
      html源码
      <div style={{ width: '800px', height: '200px', border: '11px' }}>
        {mdHtml}
      </div>
      <br />
      html渲染
      <div
        ref={refHtml}
        style={{ width: '800px', height: '200px', border: '11px' }}
      ></div>
      ReactMarkdown
      <br />
      <ReactMarkdown
        // sytle not work for this
        // style={{ width: '800px', height: '200px', border: '11px' }}
        className="preview"
        source={mdText}
      />
      Microsoftnaco-editor
      <div
        ref={msText}
        style={{ width: '800px', height: '200px', border: '11px' }}
      ></div>
    </div>
  );
}
