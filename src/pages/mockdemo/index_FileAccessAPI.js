import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import styles from './index.css';
import Iframe from 'react-iframe';

export default () => {
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
    console.log(test[0]);
    setFile(test);
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
  return (
    <div>
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
        <ul>
          {file.map((item) => (
            <li key={item.name}>{item.name}</li>
          ))}
        </ul>
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
