
import React, { useState, useEffect, useRef } from 'react';
import { Shield, AlertTriangle, Camera, Monitor, FileText, Send } from 'lucide-react';

const ExamAttempt: React.FC = () => {
  const [mode, setMode] = useState<'start' | 'exam' | 'report'>('start');
  const [integrityScore, setIntegrityScore] = useState(100);
  const [warnings, setWarnings] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (mode === 'exam' && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        });
    }
  }, [mode]);

  // Simulate proctoring alerts
  useEffect(() => {
    if (mode === 'exam') {
      const interval = setInterval(() => {
        const rand = Math.random();
        if (rand > 0.95) {
          const alertMsg = "Face presence not detected clearly.";
          setWarnings(prev => [alertMsg, ...prev.slice(0, 4)]);
          setIntegrityScore(prev => Math.max(0, prev - 5));
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [mode]);

  if (mode === 'start') {
    return (
      <div className="min-h-screen p-8 bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-10 text-center">
          <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield size={40} />
          </div>
          <h1 className="text-3xl font-bold mb-4">Exam Ready: Operating Systems Unit Test</h1>
          <div className="bg-red-50 text-red-700 p-6 rounded-2xl text-left mb-8 space-y-3">
            <p className="font-bold flex items-center gap-2"><AlertTriangle size={18} /> Proctored Session Requirements:</p>
            <ul className="text-sm list-disc list-inside opacity-90">
              <li>Camera and Microphone must remain ON.</li>
              <li>Do not switch browser tabs (Auto-detection enabled).</li>
              <li>Ensure you are in a quiet, well-lit room.</li>
              <li>No phones or external materials allowed.</li>
            </ul>
          </div>
          <button 
            onClick={() => setMode('exam')}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-indigo-500/30 transition-all"
          >
            Start Proctored Exam
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'exam') {
    return (
      <div className="h-screen flex flex-col bg-gray-900">
        <header className="p-4 bg-black border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-white font-bold">OS Unit Test</span>
            <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded animate-pulse uppercase tracking-widest">Live Proctoring Active</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Integrity Score</p>
              <p className={`text-xl font-mono font-bold ${integrityScore > 80 ? 'text-green-500' : 'text-yellow-500'}`}>{integrityScore}%</p>
            </div>
            <button 
              onClick={() => setMode('report')}
              className="px-6 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition-colors"
            >
              Submit Exam
            </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Main Question Area */}
          <div className="flex-1 p-10 bg-white overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-10">
              <div className="space-y-4">
                <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Question 1 of 5</span>
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                  Explain the difference between a Monolithic Kernel and a Microkernel. List 2 advantages of each.
                </h2>
                <textarea 
                  className="w-full h-64 p-6 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  placeholder="Type your detailed answer here..."
                />
              </div>
            </div>
          </div>

          {/* Proctoring Sidebar */}
          <div className="w-80 bg-black/40 border-l border-white/10 p-6 flex flex-col gap-6">
            <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden relative shadow-2xl border border-white/5">
              <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 rounded text-[8px] font-bold text-white flex items-center gap-1">
                <Camera size={8} /> LIVE FEED
              </div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Proctoring Logs</h3>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {warnings.map((w, idx) => (
                  <div key={idx} className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg flex gap-3">
                    <AlertTriangle size={14} className="text-red-500 shrink-0" />
                    <p className="text-[10px] text-red-200 font-medium">{w}</p>
                  </div>
                ))}
                {warnings.length === 0 && (
                  <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg flex gap-3">
                    <Shield size={14} className="text-green-500 shrink-0" />
                    <p className="text-[10px] text-green-200 font-medium">No suspicious behavior detected.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 p-10 text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={40} />
          </div>
          <h1 className="text-3xl font-bold">Exam Submitted Successfully</h1>
          <p className="opacity-80 mt-2">AI-Powered Evaluation is complete.</p>
        </div>
        <div className="p-10 space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="p-6 bg-gray-50 rounded-2xl">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Final Score</p>
              <p className="text-4xl font-bold text-indigo-600">84/100</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Integrity Score</p>
              <p className={`text-4xl font-bold ${integrityScore > 80 ? 'text-green-600' : 'text-yellow-600'}`}>{integrityScore}%</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Evaluation Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-gray-700">Theoretical Understanding</span>
                <span className="text-green-600 font-bold font-mono">EXCELLENT</span>
              </div>
              <div className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-gray-700">Critical Analysis</span>
                <span className="text-blue-600 font-bold font-mono">GOOD</span>
              </div>
              <div className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-gray-700">Memory Recall</span>
                <span className="text-yellow-600 font-bold font-mono">AVERAGE</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => window.location.hash = '#/student/dashboard'}
            className="w-full py-4 border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamAttempt;
