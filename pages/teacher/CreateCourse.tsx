
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Plus, Save, Trash2, List, Play, FileText, Type, Video, ArrowRight, Hash } from 'lucide-react';

const CreateCourse: React.FC = () => {
  const { id: editId } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    id: editId || `CRS-${Math.floor(Math.random() * 9000) + 1000}`,
    title: '',
    description: '',
    modules: [] as any[]
  });

  useEffect(() => {
    if (editId) {
      const saved = JSON.parse(localStorage.getItem('teacher_courses') || '[]');
      const course = saved.find((c: any) => c.id === editId);
      if (course) setCourseData(course);
    }
  }, [editId]);

  const addModule = (type: 'text' | 'video') => {
    setCourseData({
      ...courseData,
      modules: [
        ...courseData.modules,
        { 
          id: `mod-${Date.now()}`, 
          title: '', 
          type, 
          content: '', 
          videoUrl: '' 
        }
      ]
    });
  };

  const updateModule = (idx: number, field: string, val: any) => {
    const updated = [...courseData.modules];
    updated[idx] = { ...updated[idx], [field]: val };
    setCourseData({ ...courseData, modules: updated });
  };

  const deleteModule = (idx: number) => {
    const updated = courseData.modules.filter((_, i) => i !== idx);
    setCourseData({ ...courseData, modules: updated });
  };

  const handleSave = () => {
    if (!courseData.title) return alert("Course title is mandatory.");
    
    const saved = JSON.parse(localStorage.getItem('teacher_courses') || '[]');
    let updated;
    if (editId) {
      updated = saved.map((c: any) => c.id === editId ? { ...courseData, lastUpdated: 'Just now' } : c);
    } else {
      updated = [{ ...courseData, lastUpdated: 'Just now' }, ...saved];
    }
    
    localStorage.setItem('teacher_courses', JSON.stringify(updated));
    alert(`Course Saved Successfully! Unique ID: ${courseData.id}`);
    navigate('/teacher/my-courses');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 pb-32">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/teacher/my-courses')} className="p-4 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-indigo-600 shadow-sm transition-all">
              <ChevronLeft size={24} />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Hash size={14} className="text-indigo-600"/>
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{courseData.id}</span>
              </div>
              <h1 className="text-3xl font-black text-gray-900">{editId ? 'Module Architect' : 'New Course Builder'}</h1>
            </div>
          </div>
          <button 
            onClick={handleSave}
            className="flex items-center gap-3 px-10 py-5 bg-indigo-600 text-white rounded-[24px] font-black shadow-3xl shadow-indigo-100 hover:bg-indigo-700 transition-all hover:-translate-y-1"
          >
            <Save size={24} /> Finalize Course
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-[45px] p-8 md:p-12 shadow-sm border border-gray-100 space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Course Master Title</label>
                <input 
                  type="text"
                  value={courseData.title}
                  onChange={(e) => setCourseData({...courseData, title: e.target.value})}
                  placeholder="e.g. Distributed Computing Systems"
                  className="w-full px-8 py-5 bg-gray-50 border-none rounded-[28px] outline-none focus:ring-4 focus:ring-indigo-100 transition-all text-2xl font-black text-gray-800"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Pedagogical Description</label>
                <textarea 
                  value={courseData.description}
                  onChange={(e) => setCourseData({...courseData, description: e.target.value})}
                  placeholder="Explain the learning objectives and scope of this course..."
                  className="w-full h-32 px-8 py-5 bg-gray-50 border-none rounded-[32px] outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-medium text-gray-600 resize-none"
                />
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex justify-between items-center px-4">
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Modular Hierarchy ({courseData.modules.length})</h3>
                <div className="flex gap-2">
                   <button onClick={() => addModule('video')} className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-xl font-bold text-xs hover:bg-indigo-50 hover:text-indigo-600 transition-all shadow-sm">
                     <Video size={16}/> + Video
                   </button>
                   <button onClick={() => addModule('text')} className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-xl font-bold text-xs hover:bg-indigo-50 hover:text-indigo-600 transition-all shadow-sm">
                     <Type size={16}/> + Text
                   </button>
                </div>
              </div>

              <div className="space-y-4">
                {courseData.modules.map((m, idx) => (
                  <div key={m.id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col gap-6 group hover:border-indigo-100 transition-all">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 text-gray-400 font-black rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <input 
                            type="text"
                            value={m.title}
                            onChange={(e) => updateModule(idx, 'title', e.target.value)}
                            placeholder="Module Title..."
                            className="bg-transparent border-none outline-none font-black text-xl text-gray-800 w-full placeholder:text-gray-200"
                          />
                        </div>
                      </div>
                      <button onClick={() => deleteModule(idx)} className="p-3 text-gray-200 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="space-y-4">
                      {m.type === 'video' ? (
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">YouTube URL / Video ID</label>
                          <div className="relative">
                             <Play size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-400"/>
                             <input 
                              type="text"
                              value={m.videoUrl}
                              onChange={(e) => updateModule(idx, 'videoUrl', e.target.value)}
                              placeholder="https://youtube.com/watch?v=..."
                              className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none font-mono text-xs text-indigo-600 shadow-inner"
                             />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Academic Content (Markdown Supported)</label>
                          <textarea 
                            value={m.content}
                            onChange={(e) => updateModule(idx, 'content', e.target.value)}
                            placeholder="Draft your module text content here..."
                            className="w-full h-48 p-6 bg-gray-50 border-none rounded-3xl outline-none font-medium text-gray-600 shadow-inner no-scrollbar text-sm leading-relaxed"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {courseData.modules.length === 0 && (
                  <div className="py-20 text-center bg-gray-100 rounded-[50px] border-2 border-dashed border-gray-200">
                    <List className="mx-auto text-gray-300 mb-4" size={48} />
                    <p className="text-gray-400 font-bold">Your curriculum is empty. Add a module to start architecting.</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-indigo-900 rounded-[45px] p-10 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700"></div>
               <h3 className="text-2xl font-black mb-4 relative z-10 uppercase tracking-tight">Institutional Linkage</h3>
               <p className="text-indigo-200 text-sm font-bold mb-8 leading-relaxed relative z-10 opacity-90">
                 Once saved, use the Course ID below to link this curriculum to any of your active classrooms.
               </p>
               <div className="p-6 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-md relative z-10">
                  <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1">Course Assignment ID</p>
                  <p className="text-2xl font-mono font-black text-white">{courseData.id}</p>
               </div>
            </section>

            <section className="bg-white rounded-[45px] p-10 border border-gray-100 shadow-sm space-y-6">
               <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] text-center">Quality Checklist</h4>
               <div className="space-y-4">
                  {[
                    { label: 'Title defined', status: !!courseData.title },
                    { label: 'Description provided', status: !!courseData.description },
                    { label: 'At least 3 modules', status: courseData.modules.length >= 3 },
                    { label: 'Content populated', status: courseData.modules.every(m => m.title && (m.videoUrl || m.content)) && courseData.modules.length > 0 }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                       <span className="text-xs font-black text-gray-500 uppercase">{item.label}</span>
                       <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.status ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-white'}`}>
                          <Save size={12}/>
                       </div>
                    </div>
                  ))}
               </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
