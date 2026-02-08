
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Camera, Mic, Monitor, CheckCircle, ShieldCheck, RefreshCw } from 'lucide-react';

const ExamSetup: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [checks, setChecks] = useState({
    camera: false,
    mic: false,
    focus: false,
    face: false
  });

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (videoRef.current) videoRef.current.srcObject = stream;
        setChecks(prev => ({ ...prev, camera: true, mic: true, face: true }));
      })
      .catch(() => alert("Please allow camera and microphone access."));

    const handleFocus = () => setChecks(prev => ({ ...prev, focus: true }));
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <div className="flex-1 p-8 flex flex-col items-center justify-center">
        <div className="max-w-xl w-full">
          <h1 className="text-3xl font-bold mb-8">Hardware Setup</h1>
          <div className="aspect-video bg-black rounded-[40px] overflow-hidden shadow-2xl relative mb-8 border-4 border-white">
            <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 text-white rounded-full text-xs font-bold backdrop-blur-md">
              PREVIEW ONLY
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'camera', label: 'Camera', icon: Camera, status: checks.camera },
              { id: 'mic', label: 'Microphone', icon: Mic, status: checks.mic },
              { id: 'focus', label: 'Screen Focus', icon: Monitor, status: checks.focus },
              { id: 'face', label: 'Face Detected', icon: ShieldCheck, status: checks.face },
            ].map(check => (
              <div key={check.id} className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${check.status ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 bg-white'}`}>
                <div className="flex items-center gap-3">
                  <check.icon size={20} />
                  <span className="font-bold text-sm">{check.label}</span>
                </div>
                {check.status && <CheckCircle size={18} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full md:w-96 bg-white p-12 border-l border-gray-100 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-4">Environment Verification</h2>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          The AI Proctoring system is analyzing your feed. Please ensure you are alone and the lighting is clear.
        </p>
        <div className="space-y-4 mb-10">
          <div className="p-4 bg-indigo-50 rounded-2xl flex items-center gap-3">
            <RefreshCw size={20} className="text-indigo-600 animate-spin" />
            <span className="text-sm font-bold text-indigo-700">Verifying Identity...</span>
          </div>
        </div>
        <button 
          onClick={() => navigate(`/student/exam/${id}/mode1`)}
          disabled={!Object.values(checks).every(v => v)}
          className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl transition-all ${
            Object.values(checks).every(v => v) 
            ? 'bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700' 
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Begin Exam Now
        </button>
      </div>
    </div>
  );
};

export default ExamSetup;
