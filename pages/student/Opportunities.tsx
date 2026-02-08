
import React, { useState, useEffect } from 'react';
import { Search, Briefcase, Sparkles, Filter, MapPin, ExternalLink, Calendar, ChevronDown, ChevronUp, Users, Brain } from 'lucide-react';
import { geminiService } from '../../services/gemini';

const Opportunities: React.FC = () => {
  const currentMonthYear = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date());
  
  const [activeTab, setActiveTab] = useState<'jobs' | 'internships' | 'hackathons'>('jobs');
  const [monthFilter, setMonthFilter] = useState(currentMonthYear);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState<Record<number, any>>({});

  const [oppData, setOppData] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    // Simulate fetching based on the chosen month/year
    setTimeout(() => {
      const data = [
        { 
          id: 1, type: 'jobs', title: 'Associate Software Engineer', company: 'Zomato', location: 'Gurugram', 
          skills: ['React', 'Node.js', 'Python'], salary: '₹12L - ₹18L PA', url: 'https://zomato.com/careers', posted: monthFilter.split(' ')[0],
          desc: "Lead development of high-scale user interfaces for India's largest food delivery platform."
        },
        { 
          id: 2, type: 'jobs', title: 'Data Scientist I', company: 'Reliance Jio', location: 'Navi Mumbai', 
          skills: ['Python', 'SQL', 'PyTorch'], salary: '₹14L - ₹20L PA', url: 'https://jio.com/careers', posted: monthFilter.split(' ')[0],
          desc: "Analyze massive datasets to optimize 5G network performance and user behavior."
        },
        { 
          id: 3, type: 'internships', title: 'Frontend Intern', company: 'Swiggy', location: 'Bengaluru', 
          skills: ['React', 'CSS', 'Figma'], salary: '₹35,000 / mo', url: 'https://swiggy.com/careers', posted: monthFilter.split(' ')[0],
          desc: "Work closely with our product design team to build the future of food-tech in India."
        },
        { 
          id: 4, type: 'hackathons', title: 'Smart India Hackathon', company: 'Govt. of India', location: 'Nationwide', 
          skills: ['Public Policy', 'Social Innovation', 'Full Stack'], salary: '₹1L Grand Prize', url: 'https://sih.gov.in', posted: monthFilter.split(' ')[0],
          desc: "Solving India's biggest problems with technology. Open to all students in recognized institutions."
        }
      ].filter(o => o.type === activeTab);
      setOppData(data);
      setLoading(false);
    }, 600);
  }, [activeTab, monthFilter]);

  const handleExpand = async (opp: any) => {
    if (expanded === opp.id) {
      setExpanded(null);
      return;
    }
    
    setExpanded(opp.id);
    
    if (!aiInsights[opp.id]) {
      const user = JSON.parse(localStorage.getItem('user') || '{"skills": ["React", "Python"]}');
      try {
        const insights = await geminiService.analyzeOpportunity(opp, user.skills || []);
        setAiInsights(prev => ({ ...prev, [opp.id]: insights }));
      } catch (e) {
        console.error("AI Insight failure", e);
      }
    }
  };

  const calculateReadiness = (reqSkills: string[]) => {
    const mySkills = JSON.parse(localStorage.getItem('user') || '{}').skills || ['React', 'Python', 'ML', 'Tailwind', 'Node.js', 'SQL'];
    const matched = reqSkills.filter(s => mySkills.includes(s)).length;
    return Math.round((matched / reqSkills.length) * 100);
  };

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">India Opportunities Hub</h1>
          <p className="text-gray-500 font-medium text-lg">Live placements and internships for {monthFilter}.</p>
        </div>
        <div className="flex bg-white p-2 rounded-[28px] shadow-sm border border-gray-100 items-center">
          <Calendar size={18} className="text-indigo-400 ml-3"/>
          <select 
            value={monthFilter} 
            onChange={e => setMonthFilter(e.target.value)} 
            className="bg-transparent font-black text-gray-700 outline-none px-4 py-2 text-sm cursor-pointer"
          >
            {[0, 1, 2, 3, 4].map(offset => {
              const d = new Date();
              d.setMonth(d.getMonth() + offset);
              const val = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(d);
              return <option key={val} value={val}>{val}</option>;
            })}
          </select>
        </div>
      </header>

      <div className="flex bg-white p-2 rounded-[32px] shadow-sm border border-gray-100 w-full md:w-fit overflow-x-auto no-scrollbar">
        {['jobs', 'internships', 'hackathons'].map(t => (
          <button 
            key={t} 
            onClick={() => setActiveTab(t as any)} 
            className={`px-10 py-4 rounded-[24px] font-black capitalize transition-all whitespace-nowrap ${activeTab === t ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-100' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="py-20 text-center animate-pulse">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <p className="font-black text-gray-400 uppercase tracking-widest">Refreshing Live Feed...</p>
          </div>
        ) : oppData.map(opp => {
          const readiness = calculateReadiness(opp.skills);
          const isExp = expanded === opp.id;
          const insights = aiInsights[opp.id];

          return (
            <div key={opp.id} className="bg-white rounded-[45px] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-2xl hover:border-indigo-100 transition-all duration-500">
              <div className="p-6 md:p-12 flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[35px] flex items-center justify-center shrink-0 shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                  <Briefcase size={36}/>
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors">{opp.title}</h3>
                    <span className="px-4 py-1.5 bg-gray-100 text-gray-500 rounded-full text-[10px] font-black uppercase tracking-widest">{opp.company}</span>
                  </div>
                  <div className="flex flex-wrap gap-6 text-sm font-bold text-gray-400">
                    <span className="flex items-center gap-1.5"><MapPin size={18} className="text-indigo-400"/> {opp.location}</span>
                    <span className="text-green-600 font-black">{opp.salary}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={18}/> {opp.posted} Entry</span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center shrink-0 min-w-[140px] p-6 bg-gray-50 rounded-[35px] border border-gray-100">
                   <p className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Skill Readiness</p>
                   <div className="relative w-20 h-20">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" className="text-gray-200" strokeWidth="3" stroke="currentColor"/>
                        <circle cx="18" cy="18" r="16" fill="none" className={readiness > 70 ? 'text-green-500' : 'text-orange-500'} strokeWidth="3" strokeLinecap="round" stroke="currentColor" strokeDasharray={`${readiness}, 100`}/>
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-lg font-black text-gray-900">{readiness}%</span>
                   </div>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                   <button 
                    onClick={() => handleExpand(opp)}
                    className="flex-1 md:flex-none p-5 bg-white border border-gray-100 text-gray-400 rounded-3xl hover:bg-indigo-50 hover:text-indigo-600 transition-all shadow-sm"
                   >
                     {isExp ? <ChevronUp size={24}/> : <ChevronDown size={24}/>}
                   </button>
                   <a 
                    href={opp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-[3] md:flex-none px-10 py-5 bg-indigo-600 text-white rounded-[30px] font-black shadow-3xl shadow-indigo-100 hover:bg-indigo-700 flex items-center justify-center gap-2 hover:-translate-y-1 transition-all"
                   >
                     Direct Apply <ExternalLink size={20}/>
                   </a>
                </div>
              </div>

              {isExp && (
                <div className="px-12 pb-12 border-t border-gray-50 pt-10 animate-in slide-in-from-top-6 duration-500">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                        <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight">Requirement Breakdown</h4>
                        <p className="text-gray-600 leading-relaxed text-lg">{opp.desc}</p>
                        
                        {insights ? (
                          <div className="p-8 bg-indigo-900 text-white rounded-[40px] shadow-2xl relative overflow-hidden">
                             <Brain size={120} className="absolute -right-10 -bottom-10 opacity-5" />
                             <div className="relative z-10 space-y-4">
                                <h5 className="flex items-center gap-2 text-indigo-300 font-black uppercase text-xs tracking-widest">
                                  <Sparkles size={16}/> Gemini AI Analysis
                                </h5>
                                <p className="text-base font-medium leading-relaxed italic">"{insights.summary}"</p>
                                <div className="pt-4 border-t border-white/10 space-y-4">
                                   <div>
                                      <p className="text-[10px] font-black text-indigo-300 uppercase mb-2">Priority Study Focus</p>
                                      <p className="text-sm font-bold">{insights.studyFocus}</p>
                                   </div>
                                   {insights.missingSkills?.length > 0 && (
                                     <div>
                                        <p className="text-[10px] font-black text-red-400 uppercase mb-2">Missing from Profile</p>
                                        <div className="flex flex-wrap gap-2">
                                          {insights.missingSkills.map((ms: string) => (
                                            <span key={ms} className="px-3 py-1 bg-red-500/20 text-red-200 rounded-lg text-[10px] font-bold">{ms}</span>
                                          ))}
                                        </div>
                                     </div>
                                   )}
                                </div>
                             </div>
                          </div>
                        ) : (
                          <div className="p-8 bg-gray-50 rounded-[40px] flex items-center justify-center animate-pulse">
                             <p className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-3">
                               <Sparkles size={18} className="animate-spin" /> Synthesizing AI Insight...
                             </p>
                          </div>
                        )}
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight">Core Competencies</h4>
                        <div className="flex flex-wrap gap-3">
                          {opp.skills.map(s => (
                            <span key={s} className="px-5 py-2.5 bg-white text-indigo-600 rounded-2xl text-sm font-black border border-indigo-100 shadow-sm">{s}</span>
                          ))}
                        </div>
                      </div>
                   </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Opportunities;
