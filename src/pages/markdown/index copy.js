import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
// import styles from './index.less';

// 引入codemirror核心css,js文件（经试验css必须有，js文件还没发现它的用处）
import 'codemirror/lib/codemirror.css';
import 'codemirror/lib/codemirror.js';

// 引入 语言模块 yaml 依赖（因为我需要 yaml 语言 大家可以自行引入 javascript java c++等 参考官网）
// import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';

// 引入 ambiance 主题
import 'codemirror/theme/ambiance.css';

export default params => {
  return (
    <CodeMirror
      value="# helo: hihi"
      options={{
        lineNumbers: true, // 显示行号
        theme: 'ambiance', // 设置主题
        // readOnly: true, // 只读
        mode: {
          // 实现代码高亮
          name: 'markdown',
          // name: "javascript", // 没错，需要先引入 javascript
          // json: true
        },
      }}
    />
  );
};
