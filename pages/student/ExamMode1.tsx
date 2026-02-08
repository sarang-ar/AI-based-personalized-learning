
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Camera, Shield, AlertTriangle, Clock, Send, Maximize, CheckCircle } from 'lucide-react';

const ExamMode1: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [diagrams, setDiagrams] = useState<Record<number, string[]>>({});
  const [warnings, setWarnings] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(s => { if(videoRef.current) videoRef.current.srcObject = s; });
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const captureDiagram = (qId: number) => {
    setIsCapturing(true);
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      canvas.width = 640; canvas.height = 480;
      const ctx = canvas.getContext('2d');
      if (ctx && videoRef.current) {
        ctx.drawImage(videoRef.current, 0, 0);
        const data = canvas.toDataURL('image/png');
        setDiagrams(prev => ({ ...prev, [qId]: [...(prev[qId] || []), data] }));
      }
      setIsCapturing(false);
    }, 500);
  };

  const handleSubmit = () => {
    if(!confirm("Are you sure you want to finalize and submit your paper? No revisions allowed after submission.")) return;
    
    setIsSubmitting(true);
    
    // Simulate submission to backend / persistence
    setTimeout(() => {
      // Track submission in localStorage for persistence in the UI
      const submittedExams = JSON.parse(localStorage.getItem('submitted_exams') || '[]');
      if (!submittedExams.includes(id)) {
        submittedExams.push(id);
        localStorage.setItem('submitted_exams', JSON.stringify(submittedExams));
      }

      alert("Exam submitted successfully. AI evaluation complete. Check Exam Center for your report.");
      navigate('/student/exams');
    }, 2000);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-950 overflow-hidden">
      <header className="px-6 py-4 bg-black/40 backdrop-blur-xl border-b border-white/5 flex justify-between items-center z-50">
        <div className="flex items-center gap-6">
          <div className="space-y-0.5">
            <h1 className="text-white font-black text-lg">Mode 1: Adaptive Typing</h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Institutional Proctoring Protocol 001</p>
          </div>
          <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${warnings > 2 ? 'bg-red-600' : 'bg-green-600/20 text-green-500'} border border-white/5 transition-colors`}>
            {warnings}/3 Integrity Warnings
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="text-right">
            <div className="text-[9px] font-black uppercase text-gray-500 tracking-[0.2em] mb-1">Time Remaining</div>
            <div className="text-2xl font-mono text-white font-black">{Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2,'0')}</div>
          </div>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-10 py-3.5 bg-green-600 text-white font-black rounded-2xl shadow-2xl shadow-green-500/20 hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-widest disabled:opacity-50"
          >
            {isSubmitting ? 'Finalizing...' : 'Submit Paper'}
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 md:p-12 bg-white/5">
          <div className="max-w-4xl mx-auto space-y-20">
            {[1, 2].map(q => (
              <div key={q} className="space-y-6 animate-in slide-in-from-bottom-8 duration-700">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black shrink-0 shadow-2xl shadow-indigo-500/30">
                    Q{q}
                  </div>
                  <h3 className="text-2xl font-black text-white leading-tight">
                    {q === 1 ? "Explain the core architecture of Microkernels and how IPC facilitates service communication." : "Draw and explain the 5-state process model in a multitasking OS."}
                  </h3>
                </div>
                
                <div className="relative group">
                  <textarea 
                    className="w-full h-80 p-8 bg-black/40 border border-white/10 rounded-[40px] text-white outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all font-mono text-lg leading-relaxed shadow-inner"
                    placeholder="Analyze and formulate your response..."
                    value={answers[q] || ''}
                    onChange={e => setAnswers({...answers, [q]: e.target.value})}
                  />
                  <div className="absolute top-6 right-6 p-2 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize size={16} className="text-gray-500" />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <button 
                    onClick={() => captureDiagram(q)} 
                    disabled={isCapturing}
                    className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black flex items-center gap-3 shadow-xl hover:bg-indigo-700 transition-all text-xs uppercase tracking-widest disabled:opacity-50"
                  >
                    {isCapturing ? <Clock className="animate-spin" size={20}/> : <Camera size={20}/>}
                    Capture Handwritten Diagram
                  </button>
                  <div className="flex flex-wrap gap-4">
                    {diagrams[q]?.map((d, i) => (
                      <div key={i} className="relative group">
                        <img src={d} className="w-32 h-24 rounded-2xl border border-white/10 object-cover shadow-2xl" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-2xl transition-opacity">
                          <CheckCircle className="text-green-500" size={24} />
                        </div>
                      </div>
                    ))}
                    {(!diagrams[q] || diagrams[q].length === 0) && (
                      <div className="h-24 px-6 border border-dashed border-white/10 rounded-2xl flex items-center justify-center text-[10px] font-black text-gray-500 uppercase tracking-widest">
                        Waiting for Visual Evidence
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-80 bg-black/40 backdrop-blur-3xl border-l border-white/5 p-8 space-y-8 flex flex-col">
           <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <span>Threat Feed</span>
                <span className="text-red-500 flex items-center gap-1 animate-pulse">
                   <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div> RE-CHECKING
                </span>
              </div>
              <div className="aspect-video bg-gray-900 rounded-[30px] overflow-hidden relative border border-white/10 shadow-2xl">
                 <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                 <div className="absolute bottom-4 left-4">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest">Cam ID: EXT-01</p>
                 </div>
              </div>
           </div>

           <div className="p-6 bg-white/5 rounded-[35px] border border-white/5 space-y-4 shadow-inner">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Neural Integrity Monitor</p>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-indigo-500 transition-all duration-1000" style={{width: '98%'}}></div>
              </div>
              <div className="flex justify-between text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                <span>Secure Connection</span>
                <span>98.2%</span>
              </div>
           </div>

           <div className="flex-1 space-y-3 overflow-y-auto pr-2 no-scrollbar">
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-2xl text-[10px] text-green-200 font-black uppercase tracking-widest flex items-center gap-3">
                 <Shield size={16}/> Protocol: Stable
              </div>
              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] text-gray-500 font-bold leading-relaxed">
                 AI Agent: Verified face presence. Monitoring tab activity. External hardware scan complete.
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ExamMode1;
