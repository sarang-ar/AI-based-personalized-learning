
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Plus, Hash, GraduationCap, ArrowRight, X } from 'lucide-react';

const StudentClassrooms: React.FC = () => {
  const [joinCode, setJoinCode] = useState('');
  const [classrooms, setClassrooms] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('student_classrooms');
    if (saved) {
      setClassrooms(JSON.parse(saved));
    } else {
      const initial = [
        { id: 'os-402', name: 'Operating Systems', subject: 'CSE-402', teacher: 'Dr. Emily Watson', students: 42, color: 'bg-blue-600' },
        { id: 'math-201', name: 'Calculus III', subject: 'MAT-201', teacher: 'Prof. Mark Davis', students: 38, color: 'bg-purple-600' }
      ];
      setClassrooms(initial);
      localStorage.setItem('student_classrooms', JSON.stringify(initial));
    }
  }, []);

  const handleJoin = () => {
    if (!joinCode.trim()) return;
    
    // Check if already joined
    if (classrooms.find(c => c.id.toLowerCase() === joinCode.toLowerCase())) {
      alert("You are already a member of this classroom.");
      return;
    }

    // Mock successful join
    const newRoom = {
      id: joinCode.toLowerCase(),
      name: `Joined: ${joinCode.toUpperCase()}`,
      subject: 'External Institutional Course',
      teacher: 'Assigned Instructor',
      students: Math.floor(Math.random() * 100) + 1,
      color: ['bg-indigo-600', 'bg-emerald-600', 'bg-rose-600', 'bg-amber-600'][Math.floor(Math.random() * 4)]
    };

    const updated = [...classrooms, newRoom];
    setClassrooms(updated);
    localStorage.setItem('student_classrooms', JSON.stringify(updated));
    setJoinCode('');
    alert(`Successfully joined ${joinCode.toUpperCase()}!`);
  };

  const leaveClass = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (confirm("Are you sure you want to leave this classroom?")) {
      const updated = classrooms.filter(c => c.id !== id);
      setClassrooms(updated);
      localStorage.setItem('student_classrooms', JSON.stringify(updated));
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">My Classrooms</h1>
          <p className="text-gray-600 font-bold">Institutional courses and academic groups.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <input 
            type="text" 
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            placeholder="Enter Class Join Code"
            className="flex-1 md:w-64 px-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-mono font-bold"
          />
          <button 
            onClick={handleJoin}
            className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 flex items-center gap-2 hover:bg-indigo-700 transition-all shrink-0"
          >
            <Plus size={20} /> Join
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {classrooms.map(room => (
          <Link 
            key={room.id}
            to={`/student/classrooms/${room.id}`}
            className="group bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col relative"
          >
            <div className={`h-36 ${room.color} p-8 flex justify-between items-start relative`}>
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md relative z-10">
                <GraduationCap className="text-white" size={24} />
              </div>
              <div className="flex flex-col items-end gap-2 relative z-10">
                <span className="text-[10px] font-black text-white/90 bg-black/20 px-3 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-sm">
                  {room.id}
                </span>
                <button 
                  onClick={(e) => leaveClass(e, room.id)}
                  className="p-2 text-white/40 hover:text-white transition-colors"
                  title="Leave Classroom"
                >
                  <X size={16}/>
                </button>
              </div>
            </div>
            <div className="p-8 relative z-10">
              <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors leading-tight">{room.name}</h3>
              <p className="text-gray-400 font-bold text-sm uppercase tracking-tight mb-8">{room.subject}</p>
              
              <div className="flex items-center justify-between pt-8 border-t border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center font-black text-sm text-indigo-600 shadow-inner">
                    {room.teacher?.[0] || '?'}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Instructor</p>
                    <p className="text-sm font-black text-gray-700">{room.teacher}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-300 text-xs font-black">
                  <Users size={16} className="text-indigo-400"/> {room.students}
                </div>
              </div>
            </div>
          </Link>
        ))}

        <div className="bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-10 text-center text-gray-400 h-full min-h-[400px]">
           <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-sm">
              <Hash size={32} className="opacity-30" />
           </div>
           <p className="font-black text-gray-900 text-xl mb-2">New Campus Entry?</p>
           <p className="text-sm font-medium max-w-[220px] mb-8 leading-relaxed">Enter your institutional Join Code at the top to access gated course materials.</p>
           <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex items-center gap-2 text-indigo-600 font-black hover:gap-3 transition-all uppercase tracking-widest text-xs">
             Find Join Code <ArrowRight size={18} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default StudentClassrooms;
