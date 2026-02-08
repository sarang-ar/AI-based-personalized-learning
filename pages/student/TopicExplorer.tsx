
import React, { useState } from 'react';
import { Search, Sparkles, Award, Briefcase, List, ArrowRight } from 'lucide-react';
import { geminiService } from '../../services/gemini';

const TopicExplorer: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const res = await geminiService.exploreTopic(query);
      setData(res);
    } catch (e) {
      alert("Search failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-10">
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Industry Topic Explorer</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">Discover industry-grade sub-topics, certifications, and matching job roles for any subject.</p>
        <div className="max-w-2xl mx-auto flex gap-4">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search a topic (e.g. DSA, Cloud Native, Cybersecurity)"
            className="flex-1 px-8 py-4 bg-white border border-gray-200 rounded-3xl outline-none focus:ring-4 focus:ring-indigo-100 transition-all text-lg font-medium shadow-sm"
          />
          <button 
            onClick={handleSearch}
            disabled={isLoading}
            className="w-16 h-16 bg-indigo-600 text-white rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            {isLoading ? <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : <Search size={24}/>}
          </button>
        </div>
      </header>

      {data ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8">
           <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 text-indigo-600">
                <List size={24}/>
                <h3 className="text-xl font-bold">Core Sub-Topics</h3>
              </div>
              <ul className="space-y-3">
                 {data.subTopics?.map((item: string, i: number) => (
                   <li key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl text-sm font-semibold text-gray-700">
                     <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center text-[10px] text-indigo-600 font-bold border border-gray-100">{i+1}</div>
                     {item}
                   </li>
                 ))}
              </ul>
           </section>

           <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 text-green-600">
                <Award size={24}/>
                <h3 className="text-xl font-bold">Top Certifications</h3>
              </div>
              <ul className="space-y-3">
                 {data.certifications?.map((item: string, i: number) => (
                   <li key={i} className="p-4 bg-green-50/50 border border-green-100 rounded-2xl text-sm font-bold text-green-800 flex justify-between items-center group cursor-pointer hover:bg-green-100 transition-colors">
                     {item}
                     <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                   </li>
                 ))}
              </ul>
           </section>

           <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 text-orange-600">
                <Briefcase size={24}/>
                <h3 className="text-xl font-bold">Target Job Roles</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                 {data.jobRoles?.map((item: string, i: number) => (
                   <div key={i} className="p-4 bg-orange-50/50 border border-orange-100 rounded-2xl">
                      <p className="text-sm font-black text-orange-900">{item}</p>
                      <button className="text-[10px] font-bold text-orange-600 uppercase mt-2 flex items-center gap-1 hover:gap-2 transition-all">
                        View Requirements <ArrowRight size={10}/>
                      </button>
                   </div>
                 ))}
              </div>
           </section>
        </div>
      ) : (
        <div className="py-32 text-center bg-white rounded-[60px] border border-dashed border-gray-200">
           <Sparkles size={64} className="mx-auto text-indigo-200 mb-6"/>
           <p className="text-gray-400 font-bold text-xl">Search a subject to see the industry map.</p>
        </div>
      )}
    </div>
  );
};

export default TopicExplorer;
