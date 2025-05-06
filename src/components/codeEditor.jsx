"use client"

import { useCallback, useEffect, useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import axios from "axios"
import useSWR from "swr"
import "../styles/CodeEditor.css"
import { toast } from "react-toastify"

const fetcher = (url) =>{

  const token = localStorage.getItem("token");
  
  if (!token) {
    throw new Error("No authentication token found");
  }

 return axios
  .get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => res?.data)
}

const CodeEditor = () => {
  const [code, setCode] = useState("// Write a function that returns 2 + 2")
  const [result, setResult] = useState("")
  const expectedOutput = 4


  const { data, error, isLoading } = useSWR("http://localhost:3000/api/student/code", fetcher)

  const runCode = () => {
    try {
      const studentFunc = new Function(`${code}; return myFunction();`)
      const output = studentFunc()

      if (output === expectedOutput) {
        setResult("Correct!")
      } else {
        setResult(`Incorrect. Your output: ${output}`)
      }
    } catch (err) {
      setResult(`Error: ${err.message}`)
    }
  }

  const saveCode = async () => {
    const token = localStorage.getItem("token")

    try {
      await axios.post(
        "http://localhost:3000/api/save-code",
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      toast.success('code save to db');
    } catch (err) {
      toast.warning(" Save failed: " + err.response?.data?.message)
    }
  }
  // const onChange = useCallback((val) => {
  //   console.log('val:', val);
  //   setCode(val);
  // }, []);

  useEffect(() => {
    if (data?.code ) {
      setCode(data?.code)
    }
  }, [data])

  return (
    <div className="code-editor-container">
      <h2 className="code-editor-title">Code Challenge</h2>
      <p className="code-editor-instruction">
        Write a function named <code>myFunction</code> that returns 2 + 2
      </p>

      <div className="code-mirror-wrapper">
        <CodeMirror
          value={code}
          height="200px"
          extensions={[javascript({ jsx: true })]}
          onChange={value => setCode(value)}
          theme="dark"
        />
      </div>

      <div className="code-editor-buttons">
        <button className="code-editor-button" onClick={runCode}>
          Run Code
        </button>
        <button className="code-editor-button" onClick={saveCode}>
          Save to DB
        </button>
      </div>

      <div
        className={`code-editor-result ${
          result === "Correct!"
            ? "result-correct"
            : result.startsWith("Incorrect")
              ? "result-incorrect"
              : result.startsWith("Error")
                ? "result-error"
                : ""
        }`}
      >
        {result || "Result will appear here"}
      </div>
    </div>
  )
}

export default CodeEditor
