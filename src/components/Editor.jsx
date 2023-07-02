import React, { useEffect, useRef } from 'react';

import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

export function Editor({ value = [], setValue }) {
  const editorRef = useRef(null);
  useEffect(() => {
    const jsonEditor = new JSONEditor(editorRef.current, {
      mode: 'code',
      mainMenuBar: false,
      statusBar: false,
      onChange: () => {
        try {
          setValue(JSON.parse(jsonEditor.getText()));
        } catch (e) {}
      },
    });
    jsonEditor.set(value);
    return () => jsonEditor.destroy();
  }, [value]);
  return <div ref={editorRef} />;
}
