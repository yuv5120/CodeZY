"use client";

import Editor from "@monaco-editor/react";
import { useState } from "react";

const languages = [
  { id: 54, name: "C++", value: "cpp" },
  { id: 71, name: "Python", value: "python" },
  { id: 63, name: "Java", value: "java" },
  { id: 93, name: "JavaScript", value: "javascript" },
  { id: 50, name: "C", value: "C" },
];

export default function CodeEditor() {
  const [language, setLanguage] = useState("cpp");
  const [languageId, setLanguageId] = useState(54);
  const [code, setCode] = useState("// Start coding here...");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    setOutput("Running...");

    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          languageId,
          input,
        }),
      });

      if (!res.ok) throw new Error("Failed to run code");

      const data = await res.json();

      if (data.stdout) {
        setOutput(data.stdout);
      } else if (data.compile_output) {
        setOutput(data.compile_output);
      } else if (data.message) {
        setOutput(data.message);
      } else {
        setOutput("No output");
      }
    } /*catch (error) {
      setOutput("Error running code");
    } */
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Left Panel - Code Editor */}
      <div className="flex flex-col h-[calc(100vh-220px)] space-y-4">
        <div className="flex justify-between items-center">
          <select
            className="p-2 rounded bg-white dark:bg-gray-800 dark:text-white border shadow"
            value={language}
            onChange={(e) => {
              const lang = languages.find((l) => l.value === e.target.value);
              setLanguage(lang!.value);
              setLanguageId(lang!.id);
            }}
          >
            {languages.map((lang) => (
              <option key={lang.id} value={lang.value}>
                {lang.name}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:opacity-80"
              onClick={() => {
                const html = document.querySelector("html");
                html?.classList.toggle("dark");
              }}
            >
              🌗
            </button>

            {/* Run Code */}
            <button
              onClick={handleRun}
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Running..." : "Run Code"}
            </button>
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="flex-1 rounded overflow-hidden shadow border-2 border-blue-300">
          <Editor
            height="100%"
            language={language}
            value={code}
            theme="vs-dark"
            onChange={(value) => setCode(value || "")}
            options={{
              fontSize: 15,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
            }}
          />
        </div>
      </div>

{/* Right Panel - Input and Output */}
<div className="flex flex-col h-[calc(100vh-220px)] space-y-4">
  <div className="mt-10">
    <h2 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">Custom Input</h2>
    <textarea
      rows={8}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Enter input here..."
      className="w-full p-3 bg-white dark:bg-gray-800 border rounded shadow text-gray-900 dark:text-white resize-none"
    />
  </div>

  <div className="flex-1 flex flex-col">
    <h2 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">Output</h2>
    <div className="w-full flex-1 p-3 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-green-400 border rounded shadow whitespace-pre-wrap overflow-y-auto">
      {output}
    </div>
  </div>
</div>

    </div>
  );
}