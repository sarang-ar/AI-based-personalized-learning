
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, CheckCircle, Lock, Star, Terminal, HelpCircle, AlertTriangle } from 'lucide-react';

const CourseView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'content' | 'quiz' | 'project'>('content');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [score, setScore] = useState(0);

  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('personal_courses') || '[]');
    const current = saved.find((c: any) => c.id === id);
    if (current && current.data) {
      setCourse(current.data);
    } else {
      // Fallback/Mock
      setCourse({
        title: "Adaptive Topic Course",
        modules: [
          { id: '1', title: 'Module 1: Foundations', content: 'Base content...', quiz: { questions: [] } }
        ]
      });
    }
  }, [id]);

  if (!course) return <div className="p-20 text-center">Loading Course Architecture...</div>;

  const currentModule = course.modules?.[activeModuleIdx];
  const isLastModule = activeModuleIdx === (course.modules?.length || 1) - 1;

  const handleQuizSubmit = () => {
    if (!currentModule?.quiz?.questions) return;
    let s = 0;
    currentModule.quiz.questions.forEach((q: any, i: number) => {
      if (quizAnswers[i] === q.correctAnswer) s++;
    });
    setScore(s);
    setShowQuizResult(true);

    // If score is low, push to revision
    if (s < currentModule.quiz.questions.length) {
      const weakTopics = JSON.parse(localStorage.getItem('smart_revision_topics') || '[]');
      const newTopic = {
        id: Date.now(),
        title: `${course.title}: ${currentModule.title}`,
        source: 'Module Quiz',
        status: 'pending',
        lastAttempt: 'Just now'
      };
      localStorage.setItem('smart_revision_topics', JSON.stringify([...weakTopics, newTopic]));
    }
  };

  const nextModule = () => {
    if (activeModuleIdx < (course.modules?.length || 1) - 1) {
      setActiveModuleIdx(prev => prev + 1);
      setActiveTab('content');
      setQuizAnswers({});
      setShowQuizResult(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/student/my-learning')} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{course.title}</h1>
            <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest">Personal Learning Path</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-2 w-48 bg-gray-100 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-full" style={{ width: `${((activeModuleIdx + 1) / (course.modules?.length || 1)) * 100}%` }}></div>
          </div>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">Module {activeModuleIdx + 1} / {course.modules?.length || 1}</span>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Tabs for Module */}
            <div className="flex bg-gray-100 p-1 rounded-2xl w-fit">
              <button onClick={() => setActiveTab('content')} className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'content' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:bg-gray-200'}`}>Content</button>
              {!isLastModule && (
                <button onClick={() => setActiveTab('quiz')} className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'quiz' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:bg-gray-200'}`}>Check Knowledge</button>
              )}
              {isLastModule && (
                <button onClick={() => setActiveTab('project')} className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'project' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:bg-gray-200'}`}>Capstone Project</button>
              )}
            </div>

            {activeTab === 'content' && currentModule && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="aspect-video bg-black rounded-[40px] overflow-hidden shadow-2xl">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(currentModule.videoKeyword || currentModule.title)}`} 
                    title="Course Video" 
                    frameBorder="0" 
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="prose prose-indigo max-w-none">
                  <h2 className="text-3xl font-black text-gray-900">{currentModule.title}</h2>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                    {currentModule.content}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && currentModule && (
              <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                {!showQuizResult ? (
                  <>
                    <h2 className="text-2xl font-bold">Module Quiz: {currentModule.title}</h2>
                    <div className="space-y-6">
                      {currentModule.quiz?.questions?.map((q: any, i: number) => (
                        <div key={i} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 space-y-4">
                          <p className="font-bold text-gray-900">{i + 1}. {q.question}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {q.options?.map((opt: string, idx: number) => (
                              <button
                                key={idx}
                                onClick={() => setQuizAnswers({ ...quizAnswers, [i]: idx })}
                                className={`p-4 text-left border-2 rounded-2xl text-sm font-bold transition-all ${quizAnswers[i] === idx ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 hover:border-gray-300'}`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button onClick={handleQuizSubmit} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl">Complete Assessment</button>
                  </>
                ) : (
                  <div className="text-center p-12 bg-indigo-50 rounded-[60px] border border-indigo-100 space-y-6">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto text-indigo-600 shadow-xl">
                      <Star size={48} />
                    </div>
                    <h2 className="text-4xl font-black">Score: {score} / {currentModule.quiz?.questions?.length || 0}</h2>
                    <p className="text-gray-600 font-medium">
                      {score === (currentModule.quiz?.questions?.length || 0)
                        ? "Perfect! You've mastered this module. Future content will remain advanced." 
                        : "Good effort! Some topics have been added to your Revision Hub for further practice."}
                    </p>
                    <button onClick={nextModule} className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold">Continue to Next Module</button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'project' && currentModule && (
              <div className="bg-indigo-900 rounded-[60px] p-12 text-white relative overflow-hidden shadow-2xl">
                <Terminal className="absolute -bottom-10 -right-10 w-80 h-80 opacity-10" />
                <div className="relative z-10 space-y-6">
                  <span className="px-4 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest">Module 5: Capstone</span>
                  <h2 className="text-4xl font-black leading-tight">{currentModule.title}</h2>
                  <div className="text-indigo-100 text-lg leading-relaxed whitespace-pre-wrap">
                    {currentModule.content}
                  </div>
                  <button className="px-10 py-4 bg-white text-indigo-900 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform">
                    Start Coding in Sandbox
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Nav */}
        <div className="w-96 bg-gray-50 border-l border-gray-100 flex flex-col hidden lg:flex">
          <div className="p-8 border-b border-gray-200 bg-white">
            <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm">Course Map</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {course.modules?.map((m: any, idx: number) => (
              <button 
                key={m.id}
                onClick={() => {
                  setActiveModuleIdx(idx);
                  setActiveTab('content');
                }}
                className={`w-full flex items-center gap-4 p-5 rounded-[24px] transition-all ${
                  activeModuleIdx === idx ? 'bg-white shadow-xl border border-gray-100 scale-[1.02]' : 'hover:bg-gray-100 grayscale opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-black ${
                  activeModuleIdx === idx ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {idx + 1}
                </div>
                <div className="text-left overflow-hidden">
                  <p className={`text-sm font-bold truncate ${activeModuleIdx === idx ? 'text-gray-900' : 'text-gray-500'}`}>{m.title}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{idx === (course.modules?.length || 0) - 1 ? 'Project' : 'Lesson'}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="p-8 bg-white border-t border-gray-100">
             <div className="p-4 bg-orange-50 rounded-2xl flex gap-3 border border-orange-100">
                <AlertTriangle className="text-orange-600 shrink-0" size={18}/>
                <p className="text-[10px] font-bold text-orange-800 uppercase leading-relaxed">System identifies quiz failures and pushes them to Smart Revision Hub automatically.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseView;
