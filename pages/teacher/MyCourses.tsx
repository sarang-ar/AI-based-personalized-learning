
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, BookOpen, Edit, Trash2, Eye, Search } from 'lucide-react';

const MyCourses: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('teacher_courses') || '[]');
    // Seed data if empty for demo
    if (saved.length === 0) {
      const initial = [
        { id: 'CRS-101', title: 'Advanced Operating Systems', description: 'Core principles of OS design.', modules: Array(12).fill({}), classCount: 3, lastUpdated: '3d ago' },
        { id: 'CRS-202', title: 'Calculus for Engineers', description: 'Differential and integral calculus.', modules: Array(8).fill({}), classCount: 2, lastUpdated: '1w ago' },
      ];
      localStorage.setItem('teacher_courses', JSON.stringify(initial));
      setCourses(initial);
    } else {
      setCourses(saved);
    }
  }, []);

  const deleteCourse = (id: string) => {
    if (confirm("Delete this course permanentely? Students in linked classrooms will lose access.")) {
      const updated = courses.filter(c => c.id !== id);
      setCourses(updated);
      localStorage.setItem('teacher_courses', JSON.stringify(updated));
    }
  };

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Course Repository</h1>
          <p className="text-gray-600 font-bold">Build and manage your modular educational content.</p>
        </div>
        <Link 
          to="/teacher/my-courses/create"
          className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
        >
          <Plus size={20} /> Create New Course
        </Link>
      </header>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
        <input 
          type="text" 
          placeholder="Search by ID or Title..." 
          className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 font-bold shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center group hover:shadow-xl transition-all">
            <div className="flex items-center gap-8 mb-6 md:mb-0">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <BookOpen size={32} />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                  <span className="px-3 py-1 bg-gray-50 text-gray-400 rounded-lg text-[10px] font-black uppercase tracking-widest">{course.id}</span>
                </div>
                <div className="flex gap-4 mt-1 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <span>{course.modules?.length || 0} Modules</span>
                  <span>•</span>
                  <span>Updated {course.lastUpdated || 'Recently'}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => navigate(`/teacher/my-courses/${course.id}/builder`)}
                className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition-all shadow-sm"
                title="Edit Course"
              >
                <Edit size={20} />
              </button>
              <button 
                onClick={() => deleteCourse(course.id)}
                className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"
                title="Delete Course"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}

        {filteredCourses.length === 0 && (
          <div className="py-24 text-center bg-gray-50 rounded-[50px] border-2 border-dashed border-gray-200">
            <BookOpen className="mx-auto text-gray-300 mb-6" size={64} />
            <p className="text-gray-400 font-black text-xl uppercase tracking-widest">No matching courses</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
