
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Award,
  Zap
} from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Welcome back, Alex!</h1>
          <p className="text-gray-600 text-lg">Ready to continue your learning journey?</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="flex-1 md:flex-none bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold shrink-0">
              <Zap size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Streak</p>
              <p className="text-lg font-bold">12 Days</p>
            </div>
          </div>
          <div className="flex-1 md:flex-none bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold shrink-0">
              <Award size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">XP</p>
              <p className="text-lg font-bold">2,450</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <TrendingUp className="text-indigo-600" />
              Academic Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-bold text-lg text-gray-900">CSE-402: Operating Systems</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[10px] font-black uppercase">Institutional</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full mb-3 overflow-hidden">
                  <div className="bg-blue-600 h-full transition-all duration-700" style={{ width: '65%' }}></div>
                </div>
                <div className="flex justify-between text-xs font-bold text-gray-400">
                  <span>65% Complete</span>
                  <span className="group-hover:text-blue-600 transition-colors">Resume Room →</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-bold text-lg text-gray-900">MAT-201: Calculus III</h3>
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-[10px] font-black uppercase">Institutional</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full mb-3 overflow-hidden">
                  <div className="bg-purple-600 h-full transition-all duration-700" style={{ width: '42%' }}></div>
                </div>
                <div className="flex justify-between text-xs font-bold text-gray-400">
                  <span>42% Complete</span>
                  <span className="group-hover:text-purple-600 transition-colors">Resume Room →</span>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <BookOpen className="text-indigo-600" />
              Personalized Path
            </h2>
            <div className="bg-gradient-to-br from-indigo-900 to-indigo-700 rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl border border-white/10">
              <div className="relative z-10">
                <p className="text-indigo-300 font-black mb-2 uppercase tracking-[0.2em] text-[10px]">AI Architect Recommended</p>
                <h3 className="text-3xl md:text-4xl font-black mb-4 leading-tight">Full-Stack AI<br/>Engineering Specialization</h3>
                <p className="text-indigo-100 mb-8 max-w-sm text-lg opacity-80 font-medium">Learn to build and deploy intelligent applications using LLMs and modern web stacks.</p>
                <button 
                  onClick={() => navigate('/student/my-learning')}
                  className="bg-white text-indigo-900 px-10 py-4 rounded-2xl font-black shadow-2xl hover:scale-105 transition-transform uppercase tracking-widest text-xs"
                >
                  Resume Personal Course
                </button>
              </div>
              <Zap size={250} className="absolute -right-20 -bottom-20 opacity-5 text-white transform -rotate-12" />
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-black mb-8 flex items-center gap-3">
              <Calendar className="text-indigo-600" />
              Critical Deadlines
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Unit Test: OS Kernels', date: 'Tomorrow, 10:00 AM', type: 'Exam', color: 'bg-red-50 text-red-600' },
                { title: 'Project Proposal Due', date: 'Oct 25, 11:59 PM', type: 'Work', color: 'bg-orange-50 text-orange-600' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-5 group cursor-pointer">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold shrink-0 ${item.color} shadow-inner group-hover:scale-110 transition-transform`}>
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight">{item.title}</h4>
                    <p className="text-sm text-gray-400 font-medium mt-1">{item.date}</p>
                    <span className={`inline-block mt-2 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${item.color}`}>
                      {item.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-indigo-900 rounded-[40px] p-10 text-white shadow-3xl text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
            <div className="relative z-10 space-y-4">
              <h2 className="text-2xl font-black">Memory Sync</h2>
              <p className="text-indigo-200 text-sm font-medium leading-relaxed">
                You have 14 topics ready for review today based on neural spaced repetition.
              </p>
              <button 
                onClick={() => navigate('/student/revision')}
                className="w-full py-4 bg-white text-indigo-900 rounded-2xl font-black transition-all hover:bg-indigo-50 shadow-2xl uppercase tracking-widest text-xs"
              >
                Start Revision Session
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
