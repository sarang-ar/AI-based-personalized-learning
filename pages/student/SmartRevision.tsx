
import React, { useState, useEffect } from 'react';
import { RefreshCcw, AlertCircle, CheckCircle, BookOpen, Clock, Zap, Target } from 'lucide-react';

const SmartRevision: React.FC = () => {
  const [weakTopics, setWeakTopics] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('smart_revision_topics') || '[]');
    setWeakTopics(saved);
  }, []);

  const markResolved = (id: number) => {
    const updated = weakTopics.filter(t => t.id !== id);
    setWeakTopics(updated);
    localStorage.setItem('smart_revision_topics', JSON.stringify(updated));
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-gray-900">Adaptive Revision Hub</h1>
          <p className="text-gray-500 font-medium text-lg">Targeting your weak spots identified via AI assessments.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-8 py-4 bg-indigo-600 text-white rounded-[20px] font-black shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all">
            <Zap size={20}/> Launch Adaptive Drill
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
              <AlertCircle size={24}/>
            </div>
            <h2 className="text-2xl font-black">Identified Gaps ({weakTopics.length})</h2>
          </div>
          
          <div className="space-y-4">
            {weakTopics.map(topic => (
              <div key={topic.id} className="bg-white p-6 md:p-8 rounded-[40px] border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-red-50 text-red-600 rounded-[20px] flex items-center justify-center">
                    <Target size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900">{topic.title}</h3>
                    <div className="flex gap-4 mt-1">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{topic.source}</span>
                      <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-1">
                        <Clock size={12}/> Seen {topic.lastAttempt}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => markResolved(topic.id)}
                  className="px-8 py-3 bg-gray-50 text-gray-500 rounded-2xl font-black text-sm hover:bg-green-600 hover:text-white transition-all shadow-sm"
                >
                  Mastered
                </button>
              </div>
            ))}
            {weakTopics.length === 0 && (
              <div className="py-24 text-center bg-white rounded-[60px] border-2 border-dashed border-gray-100">
                <CheckCircle size={80} className="mx-auto text-green-500/20 mb-6"/>
                <p className="font-black text-2xl text-gray-300 uppercase tracking-tight">System analysis: Perfect Proficiency</p>
                <p className="text-gray-400 mt-2">Take a new AI Quiz to update your profile.</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-indigo-900 rounded-[60px] p-10 text-white shadow-2xl relative overflow-hidden">
              <RefreshCcw className="absolute -bottom-10 -right-10 w-64 h-64 opacity-5" />
              <h3 className="text-2xl font-black mb-4">Neural Spaced Repetition</h3>
              <p className="text-indigo-200 text-sm mb-8 leading-relaxed">
                Our algorithm predicts that in 48 hours your retention for "Paging" will drop. Revise now to solidify connections.
              </p>
              <button className="w-full py-4 bg-indigo-500 text-white rounded-2xl font-black shadow-lg hover:bg-indigo-400 transition-all uppercase tracking-widest text-xs">
                Start Spaced Practice
              </button>
           </div>
           
           <div className="bg-white rounded-[60px] p-10 border border-gray-100 shadow-sm">
              <h4 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-sm">Learning Stability</h4>
              <div className="space-y-6">
                 {[
                   { label: 'Long-Term Mastery', count: 128, color: 'bg-green-500' },
                   { label: 'Learning Stage', count: 45, color: 'bg-orange-500' },
                   { label: 'Critical Gaps', count: weakTopics.length, color: 'bg-red-500' }
                 ].map(item => (
                   <div key={item.label} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                        <span>{item.label}</span>
                        <span>{item.count}</span>
                      </div>
                      <div className="h-2 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                         <div className={`h-full ${item.color}`} style={{ width: `${(item.count/180)*100}%` }}></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SmartRevision;
