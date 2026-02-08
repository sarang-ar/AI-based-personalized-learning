
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, Clock, BarChart3, Plus, Bell, ChevronDown } from 'lucide-react';

const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Command Center</h1>
          <p className="text-gray-600 font-bold">Manage your institutional curriculum and classroom nodes.</p>
        </div>
        <div className="flex gap-4 relative">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-black text-gray-500 hover:bg-gray-50 transition-all">
            <BarChart3 size={20} /> Analytics
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowCreateMenu(!showCreateMenu)}
              className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
            >
              <Plus size={20} /> Create New <ChevronDown size={16} />
            </button>
            
            {showCreateMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-3xl border border-gray-100 py-3 z-50 animate-in fade-in zoom-in-95">
                <button 
                  onClick={() => navigate('/teacher/my-courses/create')}
                  className="w-full text-left px-6 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-3 transition-colors"
                >
                  <BookOpen size={18}/> New Course
                </button>
                <button 
                  onClick={() => navigate('/teacher/classrooms')}
                  className="w-full text-left px-6 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-3 transition-colors"
                >
                  <Users size={18}/> New Classroom
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Classrooms', val: '6', icon: Users, color: 'bg-blue-50 text-blue-600' },
          { label: 'Total Students', val: '248', icon: Users, color: 'bg-green-50 text-green-600' },
          { label: 'Courses Created', val: '12', icon: BookOpen, color: 'bg-purple-50 text-purple-600' },
          { label: 'Pending Corrections', val: '18', icon: Clock, color: 'bg-orange-50 text-orange-600' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm flex items-center gap-6 hover:shadow-xl transition-all group">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${stat.color}`}>
              <stat.icon size={32} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-gray-900">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <section>
             <h2 className="text-2xl font-black mb-6">Recent Submissions</h2>
             <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50 border-b border-gray-100">
                    <tr>
                      <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                      <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Assignment</th>
                      <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { name: 'Alice Johnson', task: 'OS Lab 2', status: 'Review Needed' },
                      { name: 'Bob Smith', task: 'Kernel Project', status: 'Review Needed' },
                      { name: 'Charlie Lee', task: 'CPU Scheduling', status: 'Graded' }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-8 py-6 font-black text-gray-900">{row.name}</td>
                        <td className="px-8 py-6 text-sm font-bold text-gray-500">{row.task}</td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${row.status === 'Graded' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <button className="text-indigo-600 font-black text-xs uppercase hover:underline">Launch Evaluator</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
           </section>
        </div>

        <div className="space-y-8">
           <section className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-black">Institutional Feed</h3>
               <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-100 transition-colors">
                 <Bell size={20} />
               </button>
             </div>
             <div className="space-y-6">
                {[
                  { title: 'Calculus Final', date: 'Tomorrow, 9 AM', proctor: 'Strict' },
                  { title: 'OS Unit Test', date: 'Oct 12, 10 AM', proctor: 'Moderate' }
                ].map((exam, idx) => (
                  <div key={idx} className="p-6 bg-gray-50 rounded-[28px] border border-transparent hover:border-indigo-100 transition-all group">
                    <p className="font-black text-gray-900 group-hover:text-indigo-600 transition-colors">{exam.title}</p>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">{exam.date} • {exam.proctor} Proctoring</p>
                  </div>
                ))}
             </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
