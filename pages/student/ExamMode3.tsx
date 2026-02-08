
import React, { useState, useEffect, useRef } from 'react';
import { Upload, Camera, FileCheck, Clock, ShieldAlert, CheckCircle } from 'lucide-react';

const ExamMode3: React.FC = () => {
  const [step, setStep] = useState<'writing' | 'upload' | 'confirmation' | 'finished'>('writing');
  const [timeLeft, setTimeLeft] = useState(3600);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (step !== 'finished') {
       navigator.mediaDevices.getUserMedia({ video: true }).then(s => { if(videoRef.current) videoRef.current.srcObject = s; });
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [step]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="p-4 bg-white border-b flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <span className="font-bold text-lg">Mode 3: Paper Upload</span>
          <span className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded text-[10px] font-bold uppercase tracking-widest">Live Proctoring</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
             <p className="text-[10px] font-bold text-gray-400 uppercase">Time Left</p>
             <p className="text-xl font-mono font-bold text-red-600">
               {Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2,'0')}
             </p>
          </div>
          {step === 'writing' && (
            <button onClick={() => setStep('upload')} className="px-8 py-2 bg-indigo-600 text-white font-bold rounded-xl shadow-lg">Submit Writing</button>
          )}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 p-8 overflow-y-auto">
          {step === 'writing' && (
            <div className="max-w-3xl mx-auto space-y-12">
               <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6">Exam Question Paper</h2>
                  <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
                     <p>1. Discuss the deadlock prevention vs avoidance mechanisms. (10 Marks)</p>
                     <p>2. Solve the following Bankers Algorithm problem on your paper... (15 Marks)</p>
                  </div>
                  <div className="mt-12 p-6 bg-orange-50 rounded-3xl flex gap-4">
                     <ShieldAlert className="text-orange-600 shrink-0" size={24}/>
                     <p className="text-sm text-orange-800">Please write your answers clearly on A4 sheets. Number each page. Do not leave your seat.</p>
                  </div>
               </div>
            </div>
          )}

          {step === 'upload' && (
            <div className="max-w-2xl mx-auto text-center space-y-8 pt-12">
               <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Upload size={40} />
               </div>
               <h2 className="text-3xl font-bold">Upload Answer Sheets</h2>
               <p className="text-gray-500">You have 10 minutes to upload all pages as PDF or high-quality images.</p>
               <input type="file" multiple className="hidden" id="paper-upload" />
               <label htmlFor="paper-upload" className="w-full h-48 border-4 border-dashed border-gray-200 rounded-[40px] flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all">
                  <span className="font-bold text-gray-400">Click to Select Files or Drag & Drop</span>
                  <span className="text-xs text-gray-300 mt-2">Max 20MB per file</span>
               </label>
               <button onClick={() => setStep('confirmation')} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg">Next: AI Confirmation</button>
            </div>
          )}

          {step === 'confirmation' && (
            <div className="max-w-2xl mx-auto text-center space-y-8 pt-12">
               <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Camera size={40} />
               </div>
               <h2 className="text-3xl font-bold">Camera Confirmation</h2>
               <p className="text-gray-500 mb-8">Please hold your physical answer sheets up to the camera. The AI will verify them against your uploaded files.</p>
               <div className="aspect-video bg-black rounded-[40px] overflow-hidden shadow-2xl relative mb-8">
                  <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                  <div className="absolute inset-0 border-4 border-indigo-500/50 flex items-center justify-center pointer-events-none">
                     <div className="w-64 h-80 border-2 border-dashed border-white/50 rounded-xl"></div>
                  </div>
               </div>
               <button onClick={() => setStep('finished')} className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold text-lg">Verify & Final Submit</button>
            </div>
          )}

          {step === 'finished' && (
            <div className="max-w-2xl mx-auto text-center space-y-8 pt-20">
               <CheckCircle size={80} className="text-green-500 mx-auto" />
               <h2 className="text-4xl font-bold text-gray-900">Submission Successful</h2>
               <p className="text-gray-500 text-lg">Your papers have been verified and stored securely. Results will be published soon.</p>
               <button onClick={() => window.location.hash = '#/student/dashboard'} className="px-10 py-4 border-2 border-indigo-600 text-indigo-600 rounded-2xl font-bold">Back to Dashboard</button>
            </div>
          )}
        </div>

        {step !== 'finished' && (
          <div className="w-80 bg-white border-l p-6 space-y-6">
            <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden relative shadow-sm">
               <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
            </div>
            <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
               <h4 className="text-xs font-bold text-red-600 uppercase mb-2">Integrity Score</h4>
               <p className="text-2xl font-black text-red-700">92%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamMode3;
