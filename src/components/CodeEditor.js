import Editor from '@monaco-editor/react';
import { memo } from 'react';

const CodeEditor = ({ text, onChange }) => (
  <Editor
    width="100%"
    height="100vh"
    defaultLanguage="javascript"
    onChange={onChange}
    value={text}
    theme="vs-dark"
    options={{ minimap: { enabled: false } }}
  />
);

export default memo(CodeEditor);