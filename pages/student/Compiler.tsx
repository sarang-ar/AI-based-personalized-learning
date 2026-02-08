
import React, { useState } from 'react';
import { Play, Save, Terminal, Code, StickyNote } from 'lucide-react';

const Compiler: React.FC = () => {
  const [code, setCode] = useState('// Write your code here\nconsole.log("Hello, World!");');
  const [lang, setLang] = useState('javascript');
  const [output, setOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);

  const handleRun = () => {
    setIsCompiling(true);
    // Simulate compilation
    setTimeout(() => {
      setOutput(`[${lang.toUpperCase()} Output]:\nHello, World!\n\nProgram finished with exit code 0`);
      setIsCompiling(false);
    }, 1500);
  };

  const saveToNotebook = () => {
    const saved = JSON.parse(localStorage.getItem('notebook_code') || '[]');
    localStorage.setItem('notebook_code', JSON.stringify([...saved, {
      id: Date.now(),
      lang,
      code,
      output,
      date: new Date().toLocaleDateString()
    }]));
    alert("Code snippet saved to Notebook (Saved Code)");
  };

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e]">
      <header className="px-6 py-4 bg-[#252526] border-b border-[#333] flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-white">
            <Code className="text-indigo-400" />
            <span className="font-bold text-lg">Cloud Compiler</span>
          </div>
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
            className="bg-[#333] text-gray-300 px-4 py-1.5 rounded border border-[#444] outline-none text-sm font-medium"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python 3.10</option>
            <option value="java">Java 17</option>
            <option value="cpp">C++ 20</option>
          </select>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={saveToNotebook}
            className="flex items-center gap-2 px-4 py-2 bg-[#333] text-gray-300 rounded hover:bg-[#444] transition-colors text-sm font-bold"
          >
            <Save size={18} /> Save
          </button>
          <button 
            onClick={handleRun}
            disabled={isCompiling}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-900/40 font-bold text-sm"
          >
            <Play size={18} /> {isCompiling ? 'Running...' : 'Run Code'}
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Editor Area */}
        <div className="flex-1 border-r border-[#333]">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full bg-[#1e1e1e] text-[#d4d4d4] p-8 font-mono text-base outline-none resize-none leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* Output Area */}
        <div className="w-full md:w-1/3 flex flex-col bg-[#1e1e1e]">
          <div className="px-6 py-3 bg-[#252526] border-b border-[#333] flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
            <Terminal size={14} /> Output
          </div>
          <div className="flex-1 p-6 font-mono text-sm text-[#cccccc] whitespace-pre-wrap overflow-y-auto">
            {output || 'Click "Run Code" to see output...'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compiler;
