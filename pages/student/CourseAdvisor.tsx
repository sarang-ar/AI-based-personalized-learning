
import React, { useState } from 'react';
import { Compass, Sparkles, Map, Book, Award, Target, Save } from 'lucide-react';
import { geminiService } from '../../services/gemini';

const CourseAdvisor: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const profile = { level: 'Bachelor 3rd Year', stream: 'Computer Science' };
      const res = await geminiService.getCareerAdvice(profile, query);
      setAdvice(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveRoadmap = () => {
    if (!advice) return;
    const key = 'notebook_roadmaps';
    const saved = JSON.parse(localStorage.getItem(key) || '[]');
    localStorage.setItem(key, JSON.stringify([...saved, {
      id: Date.now(),
      title: `Roadmap: ${query.substring(0, 30)}...`,
      content: advice,
      date: new Date().toLocaleDateString()
    }]));
    alert("Roadmap saved to your Notebook!");
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-10">
      <header className="text-center">
        <div className="inline-flex items-center justify-center p-4 bg-indigo-600 text-white rounded-3xl mb-6 shadow-2xl shadow-indigo-200">
          <Compass size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">AI Career Advisor</h1>
        <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
          Plan your future with personalized roadmaps based on India-specific market trends.
        </p>
      </header>

      <div className="bg-white rounded-[40px] shadow-2xl border border-gray-100 p-6 md:p-10">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. How to become a Senior DevOps Engineer?"
            className="flex-1 px-6 md:px-8 py-4 md:py-5 bg-gray-50 border border-gray-200 rounded-3xl outline-none focus:ring-4 focus:ring-indigo-100 transition-all text-lg"
          />
          <button 
            onClick={handleAsk}
            disabled={loading}
            className="px-8 md:px-10 py-4 md:py-5 bg-indigo-600 text-white rounded-3xl font-bold text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Analyzing...' : <><Sparkles size={20} /> Build Roadmap</>}
          </button>
        </div>

        {advice ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
             <div className="flex justify-end">
                <button onClick={saveRoadmap} className="flex items-center gap-2 text-indigo-600 font-bold hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all">
                   <Save size={18}/> Save to Notebook
                </button>
             </div>
             <div className="prose prose-indigo max-w-none text-gray-700 whitespace-pre-wrap bg-indigo-50/30 p-6 md:p-8 rounded-3xl border border-indigo-100 leading-relaxed">
               {advice}
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Cloud Engineer", "Fullstack AI Dev", "Data Scientist", "Cybersecurity Analyst"].map(topic => (
              <button 
                key={topic}
                onClick={() => setQuery(`Path to become a ${topic}`)}
                className="p-6 text-left border border-gray-100 rounded-3xl hover:bg-indigo-50 hover:border-indigo-200 transition-all group"
              >
                <p className="text-sm font-bold text-gray-400 uppercase mb-1">Career Goal</p>
                <p className="text-xl font-bold text-gray-800 group-hover:text-indigo-600">{topic}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseAdvisor;
