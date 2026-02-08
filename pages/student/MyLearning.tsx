
import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, BookOpen, Clock, Zap, Filter, Search, Sparkles, ArrowRight, Layers } from 'lucide-react';

const MyLearning: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'progress' | 'completed'>('all');

  const [courses] = useState(() => {
    const saved = localStorage.getItem('personal_courses');
    return saved ? JSON.parse(saved) : [
      { id: 'c1', title: 'React & AI Integration', progress: 65, modules: 5, lastActive: '2 hours ago', icon: '⚛️' },
      { id: 'c2', title: 'Cybersecurity Fundamentals', progress: 100, modules: 8, lastActive: 'Yesterday', icon: '🛡️' },
    ];
  });

  const filteredCourses = useMemo(() => {
    return courses.filter((c: any) => {
      const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = 
        statusFilter === 'all' ? true :
        statusFilter === 'progress' ? c.progress < 100 :
        c.progress === 100;
      return matchesSearch && matchesStatus;
    });
  }, [courses, searchQuery, statusFilter]);

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter">My Knowledge Paths</h1>
          <p className="text-gray-500 font-bold text-lg">Your personal AI-driven educational ecosystem.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Link 
            to="/student/generate-path"
            className="flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-[28px] shadow-3xl shadow-indigo-200 transition-all hover:-translate-y-1"
          >
            <Plus size={24} />
            Generate New Path
          </Link>
        </div>
      </header>

      <div className="flex flex-col md:flex-row bg-white p-2 rounded-[32px] shadow-sm border border-gray-100 w-full items-center gap-2">
        <div className="flex w-full md:w-auto p-1 bg-gray-50 rounded-2xl">
          <button 
            onClick={() => setStatusFilter('all')}
            className={`px-8 py-3 rounded-[20px] font-black transition-all ${statusFilter === 'all' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            All
          </button>
          <button 
            onClick={() => setStatusFilter('progress')}
            className={`px-8 py-3 rounded-[20px] font-black transition-all ${statusFilter === 'progress' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            In Progress
          </button>
          <button 
            onClick={() => setStatusFilter('completed')}
            className={`px-8 py-3 rounded-[20px] font-black transition-all ${statusFilter === 'completed' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Completed
          </button>
        </div>
        <div className="w-px h-8 bg-gray-100 mx-4 hidden md:block"></div>
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18}/>
          <input 
            type="text" 
            placeholder="Search your paths..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-[24px] text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredCourses.map((course: any) => (
          <Link 
            key={course.id}
            to={`/student/my-learning/${course.id}`}
            className="group bg-white rounded-[50px] p-8 shadow-sm border border-gray-100 hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-10">
              <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[35px] flex items-center justify-center text-4xl shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                {course.icon}
              </div>
              <div className="px-4 py-1.5 bg-gray-50 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                {course.progress === 100 ? 'View Again' : 'Resume Path'}
              </div>
            </div>
            
            <h3 className="text-3xl font-black text-gray-900 mb-6 leading-tight group-hover:text-indigo-600 transition-colors">{course.title}</h3>
            
            <div className="space-y-6 mt-auto">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-black tracking-widest uppercase">
                  <span className="text-gray-400">Mastery Progress</span>
                  <span className="text-indigo-600">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-50 h-3 rounded-full overflow-hidden border border-gray-100">
                  <div className="bg-indigo-600 h-full transition-all duration-1000 group-hover:bg-indigo-500" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-8 border-t border-gray-50">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Modules</span>
                    <span className="font-black text-gray-800 flex items-center gap-1.5"><Layers size={14} className="text-indigo-400"/> {course.modules}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active</span>
                    <span className="font-black text-gray-800 flex items-center gap-1.5"><Clock size={14} className="text-indigo-400"/> {course.lastActive}</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <ArrowRight size={20}/>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {filteredCourses.length === 0 && (
          <div className="col-span-full py-32 text-center bg-gray-50 rounded-[60px] border-2 border-dashed border-gray-100">
             <BookOpen size={80} className="mx-auto text-gray-200 mb-6"/>
             <p className="text-2xl font-black text-gray-300 uppercase tracking-tighter">No paths found</p>
             <p className="text-gray-400 mt-2 font-bold">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;
