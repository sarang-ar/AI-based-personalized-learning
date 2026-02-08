
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ChevronRight, Brain, Target, Compass, Zap, Monitor, BookOpen, Clock } from 'lucide-react';

const Onboarding: React.FC<{onComplete: () => void}> = ({onComplete}) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    level: '',
    stream: '',
    interest: '',
    style: 'visual',
    attentionScore: 0
  });
  const navigate = useNavigate();

  const handleFinish = () => {
    localStorage.setItem('onboarded', 'true');
    localStorage.setItem('onboarded_data', JSON.stringify(data));
    onComplete();
    navigate('/student/dashboard');
  };

  const AttentionQuiz = () => {
    const [qStep, setQStep] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    
    const questions = [
      { text: "When studying, how often do you check your phone?", icon: Monitor, options: ["Rarely", "Occasionally", "Every 10 mins", "Constantly"] },
      { text: "How long can you focus on a complex problem before needing a break?", icon: Clock, options: ["60+ mins", "30-45 mins", "15-20 mins", "< 10 mins"] },
      { text: "Which environment helps you learn best?", icon: BookOpen, options: ["Complete Silence", "Light Music", "Public Cafe", "Group Study"] }
    ];

    const handleOption = (idx: number) => {
      // Logic: 0 is high focus, 3 is low focus. 
      const weight = 5 - idx; 
      const nextScore = currentScore + weight;
      if (qStep < questions.length - 1) {
        setQStep(qStep + 1);
        setCurrentScore(nextScore);
      } else {
        setData({...data, attentionScore: Math.round((nextScore / 15) * 100)});
        setStep(5);
      }
    };

    const Q = questions[qStep];

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 text-yellow-600 rounded-2xl">
              <Zap size={24} />
            </div>
            <h3 className="text-2xl font-black text-gray-900">Focus Mapping</h3>
          </div>
          <span className="text-sm font-bold text-gray-400">Question {qStep + 1}/3</span>
        </div>

        <div className="p-8 bg-gray-50 rounded-[40px] border border-gray-100">
          <div className="flex flex-col items-center text-center space-y-4">
            <Q.icon size={48} className="text-indigo-600 mb-2" />
            <p className="text-xl font-bold text-gray-800 leading-tight">{Q.text}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {Q.options.map((opt, i) => (
            <button 
              key={i} 
              onClick={() => handleOption(i)} 
              className="w-full p-5 bg-white border-2 border-gray-100 rounded-[24px] font-bold text-gray-700 hover:border-indigo-600 hover:bg-indigo-50 transition-all flex justify-between items-center group"
            >
              {opt}
              <ChevronRight size={18} className="text-gray-300 group-hover:text-indigo-600 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="max-w-2xl w-full bg-white rounded-[50px] shadow-3xl border border-white/40 overflow-hidden">
        {/* Top Progress Bar */}
        <div className="h-2 bg-gray-100">
          <div className="h-full bg-indigo-600 transition-all duration-700" style={{width: `${(step/5)*100}%`}}></div>
        </div>

        <div className="p-8 md:p-14">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-gray-900">Academic Level</h2>
                <p className="text-gray-500 font-medium">Select your current educational standing in India.</p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {['Class 10-12 (Board Prep)', 'Bachelor Degree (B.Tech, B.Sc, B.Com)', 'Post Graduate (M.Tech, MBA)', 'Professional / Competitive Exams'].map(l => (
                  <button key={l} onClick={() => {setData({...data, level: l}); setStep(2);}} className="p-6 text-left border-2 border-gray-50 rounded-3xl hover:border-indigo-600 hover:bg-indigo-50 font-black text-gray-800 transition-all shadow-sm">
                    {l}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-gray-900">Primary Stream</h2>
                <p className="text-gray-500 font-medium">Which department do you belong to?</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {['Computer Science', 'Electronics', 'Management', 'Law', 'Mechanical', 'Pure Sciences'].map(s => (
                  <button key={s} onClick={() => {setData({...data, stream: s}); setStep(3);}} className="p-6 text-center border-2 border-gray-50 rounded-[32px] hover:border-indigo-600 hover:bg-indigo-50 font-black text-gray-800 transition-all flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                      <GraduationCap size={24} />
                    </div>
                    <span className="text-sm">{s}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-gray-900">Interest & Style</h2>
                <p className="text-gray-500 font-medium">How do you prefer to digest new information?</p>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Detailed Interest</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Full Stack, Quantum Computing, Stock Market" 
                    className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 font-bold transition-all" 
                    onChange={e => setData({...data, interest: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {['visual', 'reading', 'kinesthetic'].map(s => (
                    <button 
                      key={s} 
                      onClick={() => setData({...data, style: s as any})} 
                      className={`py-4 border-2 rounded-2xl font-black capitalize transition-all text-xs ${data.style === s ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-100 bg-gray-50 text-gray-400'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <button onClick={() => setStep(4)} className="w-full py-5 bg-indigo-600 text-white rounded-[24px] font-black text-lg shadow-2xl shadow-indigo-100">Next: Focus Quiz</button>
              </div>
            </div>
          )}

          {step === 4 && <AttentionQuiz />}

          {step === 5 && (
            <div className="text-center space-y-10 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-[30px] flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle size={56}/>
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-gray-900">Intelligence Profile Mapped</h2>
                <p className="text-gray-500 font-medium max-w-sm mx-auto">Your personalized curriculum is being architected using Gemini 3.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-[40px] border border-gray-100 flex flex-wrap justify-center gap-6">
                <div className="text-center">
                  <p className="text-[10px] font-black text-gray-400 uppercase">Attention</p>
                  <p className="text-2xl font-black text-indigo-600">{data.attentionScore}%</p>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div className="text-center">
                  <p className="text-[10px] font-black text-gray-400 uppercase">Style</p>
                  <p className="text-2xl font-black text-indigo-600 capitalize">{data.style}</p>
                </div>
              </div>
              <button onClick={handleFinish} className="w-full py-5 bg-indigo-600 text-white rounded-[32px] font-black text-xl shadow-3xl shadow-indigo-200 hover:scale-105 transition-transform">Enter My Campus</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const GraduationCap = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

export default Onboarding;
