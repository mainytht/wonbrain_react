import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/ambiance.css';
// import 'codemirror/addon/selection/active-line'
// import 'codemirror/addon/hint/javascript-hint'
// import 'codemirror/addon/hint/show-hint'
// import 'codemirror/addon/hint/show-hint.css'

export default params => {
  const [code, setCode] = useState('var a = 0;');
  return (
    <div>
      <CodeMirror
        value={code}
        options={{
          theme: 'ambiance',
          mode: 'javascript',
          extraKeys: { Ctrl: 'autocomplete' }, //ctrl可以弹出提示
          styleActiveLine: true,
        }}
      />
    </div>
  );
};
