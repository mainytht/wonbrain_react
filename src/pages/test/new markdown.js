import React, { useState, useEffect,useRef } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import styles from './index.css';
import Iframe from 'react-iframe';

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

export default () => {
  const editorref = useRef();
  const [file, setFile] = useState([0]);
  async function getFileHandle() {
    const opts = {
      types: [
        {
          description: 'Text Files',
          accept: {
            'text/plain': ['.txt', '.text'],
            'text/html': ['.html', '.htm'],
          },
        },
      ],
    };
    let test = await window.showOpenFilePicker(opts);
    setFile(test);
    console.log(file[0]);
  }
  async function saveFile(file) {
    setFile(await window.showDirectoryPicker());
    console.log(file.__proto__.getDirectoryHandle());

    // file.
    // fileHandle = await window.showSaveFilePicker();
    // const writable = await fileHandle.createWritable();
    // await writable.write(contents);
    // await writable.close();
  }

  function handleeditortest() {
    editorref.current.getInstance().exec('Bold');
    console.log(editorref.current.getInstance().setMarkdown('# 111'))
  }
  useEffect(() => {
    editorref.current.getInstance().setMarkdown('# 222')
    
    return () => {
    }
  }, [])
  return (
    <div>
      <Editor
        initialValue="hello react editor world!"
        previewStyle="vertical"
        initialEditType="markdown"
        ref={editorref}
        useCommandShortcut={true}
      />
      <Button onClick={handleeditortest}>sss</Button>

      <h1 className={styles.title}>Page mockdemo</h1>
      <Button
        onClick={getFileHandle}
        // type="file"
        type="primary"
      >
        打开文件
      </Button>

      <div>
        <br />
        {/* <ul> 
         { {file.map((item) => (
            <li key={item.name}>{item.name}</li>
          ))}
        </ul>  */}
        {file[0]}
        <br />
        {require('@/assets/logo2.png')}
      </div>

      <Button
        onClick={saveFile}
        // type="file"
        type="primary"
      >
        保存文件
      </Button>
    </div>
  );
};
