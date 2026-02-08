
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Sparkles, Brain, Target, Book, Zap, ArrowRight, HelpCircle } from 'lucide-react';
import { geminiService } from '../../services/gemini';

const PathGenerator: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    depth: 'Intermediate',
    goals: '',
    timeCommitment: '2-4 hours/week',
    priorKnowledge: 'None'
  });
  const [assessment, setAssessment] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const startAssessment = async () => {
    if (!formData.subject) return alert("Please specify a subject.");
    setIsGenerating(true);
    try {
      const res = await geminiService.getKnowledgeAssessment(formData.subject);
      setAssessment(res.questions || []);
      setStep(2);
    } catch (e) {
      alert("AI Scan failed. Check API Key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateFinalPath = async () => {
    setIsGenerating(true);
    let score = 0;
    assessment?.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) score++;
    });

    try {
      const userStr = localStorage.getItem('user');
      const userData = userStr ? JSON.parse(userStr) : {};
      const onboardData = { 
        academicLevel: userData.academicLevel || 'Bachelor Degree', 
        stream: userData.stream || 'Technology', 
        learningStyle: userData.learningStyle || 'visual' 
      };

      const courseData = await geminiService.generatePersonalizedCourse(onboardData, formData.subject, score);
      
      const newCourse = {
        id: `course-${Date.now()}`,
        title: courseData.title || formData.subject,
        progress: 0,
        modules: courseData.modules ? courseData.modules.length : 5,
        lastActive: 'Just now',
        icon: '✨',
        data: courseData
      };
      
      const saved = JSON.parse(localStorage.getItem('personal_courses') || '[]');
      localStorage.setItem('personal_courses', JSON.stringify([newCourse, ...saved]));
      navigate('/student/my-learning');
    } catch (e) {
      alert("Course architecting failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-indigo-900 flex flex-col items-center justify-center p-10 text-white">
        <Sparkles size={100} className="text-indigo-300 animate-pulse mb-8" />
        <h2 className="text-4xl font-black text-center mb-4 tracking-tighter uppercase">Initializing Neural Architect</h2>
        <p className="text-indigo-200 text-lg max-w-md text-center font-medium leading-relaxed">
          Gemini 3 is synthesizing your input with industry-standard benchmarks to generate an optimal learning path...
        </p>
        <div className="mt-12 w-64 h-2 bg-white/10 rounded-full overflow-hidden">
           <div className="h-full bg-indigo-400 animate-[loading_3s_ease-in-out_infinite]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 max-w-4xl mx-auto space-y-12 pb-20">
      <header className="flex items-center gap-6">
        <button onClick={() => navigate('/student/my-learning')} className="p-4 bg-white border border-gray-100 rounded-[24px] text-gray-400 hover:text-indigo-600 transition-all shadow-sm">
          <ChevronLeft size={24}/>
        </button>
        <div>
          <h1 className="text-3xl font-black text-gray-900">Path Architect</h1>
          <p className="text-gray-500 font-bold">Step {step}: {step === 1 ? 'Requirement Gathering' : 'Knowledge Verification'}</p>
        </div>
      </header>

      {step === 1 ? (
        <div className="bg-white rounded-[50px] p-10 md:p-16 shadow-sm border border-gray-100 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">What do you want to master?</label>
              <div className="relative">
                <Brain className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-400" size={20}/>
                <input 
                  type="text" 
                  placeholder="e.g. Distributed Systems, UI Design..."
                  className="w-full pl-16 pr-8 py-5 bg-gray-50 border-none rounded-[30px] outline-none focus:ring-4 focus:ring-indigo-100 font-black text-lg transition-all"
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Desired Depth</label>
              <div className="grid grid-cols-3 gap-2">
                {['Beginner', 'Intermediate', 'Advanced'].map(d => (
                  <button 
                    key={d}
                    onClick={() => setFormData({...formData, depth: d})}
                    className={`py-4 rounded-2xl font-black text-xs transition-all ${formData.depth === d ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 md:col-span-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Specific Goals or Topics of Interest</label>
              <textarea 
                placeholder="I want to build a real-time messaging app, understand Kafka, etc."
                className="w-full h-32 p-8 bg-gray-50 border-none rounded-[40px] outline-none focus:ring-4 focus:ring-indigo-100 font-medium leading-relaxed transition-all no-scrollbar"
                value={formData.goals}
                onChange={e => setFormData({...formData, goals: e.target.value})}
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Time Commitment</label>
              <select 
                className="w-full p-5 bg-gray-50 border-none rounded-[30px] outline-none focus:ring-4 focus:ring-indigo-100 font-bold"
                value={formData.timeCommitment}
                onChange={e => setFormData({...formData, timeCommitment: e.target.value})}
              >
                <option>1-2 hours/week</option>
                <option>2-4 hours/week</option>
                <option>5-10 hours/week</option>
                <option>Full Immersion</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Current Knowledge</label>
              <select 
                className="w-full p-5 bg-gray-50 border-none rounded-[30px] outline-none focus:ring-4 focus:ring-indigo-100 font-bold"
                value={formData.priorKnowledge}
                onChange={e => setFormData({...formData, priorKnowledge: e.target.value})}
              >
                <option>Absolute Beginner</option>
                <option>Foundational</option>
                <option>Working Professional</option>
                <option>Expert looking for niche</option>
              </select>
            </div>
          </div>

          <button 
            onClick={startAssessment}
            className="w-full py-6 bg-indigo-600 text-white rounded-[35px] font-black text-xl shadow-3xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
          >
            Start Pre-Course Scan <ArrowRight size={24}/>
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-[50px] p-10 md:p-16 shadow-sm border border-gray-100 space-y-10 animate-in slide-in-from-right-10 duration-500">
          <div className="flex items-center gap-4 p-8 bg-indigo-50 rounded-[40px] border border-indigo-100">
             <HelpCircle className="text-indigo-600" size={40}/>
             <div>
                <h3 className="text-xl font-black text-indigo-900">Knowledge Verification</h3>
                <p className="text-sm text-indigo-600 font-bold">Gemini is verifying your baseline to skip redundant content.</p>
             </div>
          </div>
          
          <div className="space-y-10 max-h-[50vh] overflow-y-auto pr-6 no-scrollbar">
            {assessment?.map((q, i) => (
              <div key={i} className="space-y-6">
                <p className="font-black text-gray-900 text-xl leading-tight">{i+1}. {q.question}</p>
                <div className="grid grid-cols-1 gap-3">
                  {q.options?.map((opt: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setAnswers({...answers, [i]: idx})}
                      className={`p-6 text-left border-2 rounded-[30px] text-base font-bold transition-all ${answers[i] === idx ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xl shadow-indigo-100/50' : 'border-gray-50 bg-gray-50 text-gray-500 hover:border-gray-200'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={generateFinalPath}
            disabled={Object.keys(answers).length < (assessment?.length || 0)}
            className="w-full py-6 bg-indigo-600 text-white rounded-[35px] font-black text-xl shadow-3xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Synthesize My Curriculum
          </button>
        </div>
      )}
    </div>
  );
};

export default PathGenerator;
