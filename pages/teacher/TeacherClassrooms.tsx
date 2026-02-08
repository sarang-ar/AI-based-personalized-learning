
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Plus, Copy, Settings, ArrowUpRight } from 'lucide-react';

const TeacherClassrooms: React.FC = () => {
  const classrooms = [
    { id: 'os-402', name: 'Operating Systems', students: 42, joinCode: 'OS402X', status: 'Active' },
    { id: 'ds-201', name: 'Data Structures', students: 56, joinCode: 'DS201Y', status: 'Active' },
    { id: 'math-101', name: 'Applied Math', students: 0, joinCode: 'MATH101Z', status: 'Planning' }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Classrooms</h1>
          <p className="text-gray-600">Sync with institutions and manage student enrollments.</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
          <Plus size={20} /> Create Classroom
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {classrooms.map(room => (
          <div key={room.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all flex flex-col">
            <div className="p-8 flex-1">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                  <Users size={24} />
                </div>
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${room.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                  {room.status}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{room.name}</h3>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-6">{room.id}</p>
              
              <div className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center mb-6">
                 <div>
                   <p className="text-[10px] text-gray-400 font-bold uppercase">Join Code</p>
                   <p className="font-mono font-bold text-indigo-600">{room.joinCode}</p>
                 </div>
                 <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                   <Copy size={18} />
                 </button>
              </div>
            </div>

            <div className="px-8 py-6 bg-gray-50 flex items-center justify-between border-t border-gray-100">
               <div className="flex items-center gap-2 text-gray-600">
                 <Users size={16} />
                 <span className="font-bold text-sm">{room.students} Students</span>
               </div>
               <Link to={`/teacher/classrooms/${room.id}`} className="flex items-center gap-1.5 text-indigo-600 font-bold text-sm hover:gap-2 transition-all">
                 Manage Room <ArrowUpRight size={16} />
               </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherClassrooms;
