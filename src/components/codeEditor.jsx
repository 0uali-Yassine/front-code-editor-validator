import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import axios from 'axios';

const CodeEditor = () => {
  const [code, setCode] = useState('// Write a function that returns 2 + 2');
  const [result, setResult] = useState('');
  const expectedOutput = 4;

  const runCode = () => {
    try {
      const studentFunc = new Function(`${code}; return myFunction();`);
      const output = studentFunc();

      if (output === expectedOutput) {
        setResult("Correct!");
      } else {
        setResult(`Incorrect. Your output: ${output}`);
      }
    } catch (err) {
      setResult(`Error: ${err.message}`);
    }
  };

  const saveCode = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://localhost:3000/api/save-code',
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Code saved to DB');
    } catch (err) {
      alert(' Save failed: ' + err.response?.data?.message);
    }
  };

  useEffect(()=>{
    const fetchStudentCode = async()=>{
        try {
            const res = await axios.get('http://localhost:3000/api/student/code');
            console.log(res?.data?.code);
        
              
            } catch (error) {
              console.log(error);
            }
    }
    fetchStudentCode();

  },[code])

  return (
    <div>
      <h2>Code Challenge</h2>
      <p>Write a function named <code>myFunction</code> that returns 2 + 2</p>

      <CodeMirror
        value={code}
        height="200px"
        extensions={[javascript({ jsx: true })]}
        onChange={(value) => setCode(value)}
        theme="dark"
      />

      <button onClick={runCode} style={{ marginTop: '10px' }}>Run Code</button>
      <button onClick={saveCode} style={{ marginLeft: '10px' }}>Save to DB</button>

      <p style={{ marginTop: '10px' }}>{result}</p>
    </div>
  );
};

export default CodeEditor;
