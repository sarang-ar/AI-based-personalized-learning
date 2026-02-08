
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Users, BookOpen, Clock, Settings, Plus, Award, MessageSquare, 
  Send, Trash2, Edit, Save, Paperclip, Hash, Book, FileText, Globe, Shield 
} from 'lucide-react';

const TeacherClassroomDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'students' | 'courses' | 'workflows' | 'messages' | 'settings'>('students');

  // Courses Linking State
  const [courseInput, setCourseInput] = useState('');
  const [linkedCourses, setLinkedCourses] = useState<any[]>([]);
  
  // Workflows (Notes) State
  const [notes, setNotes] = useState<any[]>([
    { id: 1, title: 'Final Exam Syllabus', date: '2 days ago', priority: 'High' }
  ]);

  // Chat State
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<any[]>([
    { from: 'Student: Alex J.', msg: 'Sir, I am unable to view the diagram in Module 2.', time: '10:00 AM', role: 'student' },
    { from: 'You', msg: 'Please refresh the page, I have updated the asset link.', time: '10:05 AM', role: 'teacher' }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load linked courses for this classroom
    const links = JSON.parse(localStorage.getItem(`class_courses_${id}`) || '[]');
    const allCourses = JSON.parse(localStorage.getItem('teacher_courses') || '[]');
    const matched = allCourses.filter((c: any) => links.includes(c.id));
    setLinkedCourses(matched);

    // Load messages
    const savedMsg = localStorage.getItem(`class_messages_${id}`);
    if (savedMsg) setMessages(JSON.parse(savedMsg));
  }, [id]);

  useEffect(() => {
    if (activeTab === 'messages' && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeTab, messages]);

  const attachCourse = () => {
    if (!courseInput.trim()) return;
    const allCourses = JSON.parse(localStorage.getItem('teacher_courses') || '[]');
    const course = allCourses.find((c: any) => c.id === courseInput.trim());
    
    if (!course) {
      alert("Invalid Course ID. Please ensure the course exists in your repository.");
      return;
    }

    if (linkedCourses.find(c => c.id === course.id)) {
      alert("This course is already attached to this classroom.");
      return;
    }

    const currentLinks = JSON.parse(localStorage.getItem(`class_courses_${id}`) || '[]');
    const newLinks = [...currentLinks, course.id];
    localStorage.setItem(`class_courses_${id}`, JSON.stringify(newLinks));
    setLinkedCourses([...linkedCourses, course]);
    setCourseInput('');
  };

  const detachCourse = (cId: string) => {
    if (confirm("Detach this course? Students will no longer see these materials.")) {
      const currentLinks = JSON.parse(localStorage.getItem(`class_courses_${id}`) || '[]');
      const newLinks = currentLinks.filter((l: string) => l !== cId);
      localStorage.setItem(`class_courses_${id}`, JSON.stringify(newLinks));
      setLinkedCourses(linkedCourses.filter(c => c.id !== cId));
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg = {
      from: 'You',
      msg: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      role: 'teacher'
    };
    const updated = [...messages, newMsg];
    setMessages(updated);
    localStorage.setItem(`class_messages_${id}`, JSON.stringify(updated));
    setChatInput('');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <header className="p-8 bg-white border-b border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-indigo-600 uppercase tracking-widest mb-2">
            <Hash size={14}/>
            <span>Class ID: {id}</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Operating Systems (Institutional)</h1>
        </div>
        <div className="flex bg-gray-50 rounded-2xl p-1.5 border border-gray-100 overflow-x-auto no-scrollbar gap-2">
          {[
            { id: 'students', label: 'Students', icon: Users },
            { id: 'courses', label: 'Curriculum', icon: Book },
            { id: 'workflows', label: 'Workflow', icon: Award },
            { id: 'messages', label: 'Chats', icon: MessageSquare },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-black transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-10 no-scrollbar">
        <div className="max-w-6xl mx-auto pb-20">
          
          {activeTab === 'students' && (
            <div className="bg-white rounded-[50px] border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
               <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
                 <div>
                    <h3 className="text-2xl font-black">Enrolled Talent Pool (42)</h3>
                    <p className="text-sm font-bold text-gray-400 mt-1">Institutional verification: 100% compliant.</p>
                 </div>
                 <button className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2">
                   <Plus size={20} /> Bulk Admit Students
                 </button>
               </div>
               <table className="w-full text-left">
                 <thead className="bg-gray-50/50">
                   <tr>
                     <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Identity</th>
                     <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Integrity Matrix</th>
                     <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Course Progress</th>
                     <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                    {[
                      { name: 'Alice Johnson', score: 98, progress: 85, avatar: 'A' },
                      { name: 'Bob Smith', score: 64, progress: 42, avatar: 'B' },
                      { name: 'Charlie Davis', score: 100, progress: 95, avatar: 'C' }
                    ].map((s, idx) => (
                      <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                        <td className="px-10 py-8">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black shadow-inner">{s.avatar}</div>
                              <span className="font-black text-gray-900 group-hover:text-indigo-600 transition-colors">{s.name}</span>
                           </div>
                        </td>
                        <td className="px-10 py-8">
                           <div className="flex flex-col items-center gap-1">
                              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${s.score < 80 ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'}`}>
                                {s.score}% Reliability
                              </span>
                           </div>
                        </td>
                        <td className="px-10 py-8">
                           <div className="space-y-2">
                              <div className="w-48 h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-50 shadow-inner">
                                <div className="bg-indigo-600 h-full transition-all duration-1000" style={{ width: `${s.progress}%` }}></div>
                              </div>
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.progress}% Syllabus Sync</p>
                           </div>
                        </td>
                        <td className="px-10 py-8 text-right">
                           <button className="text-indigo-600 font-black text-xs uppercase hover:underline">Neural Report</button>
                        </td>
                      </tr>
                    ))}
                 </tbody>
               </table>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-500">
               <div className="bg-white p-10 md:p-14 rounded-[55px] border border-gray-100 shadow-sm space-y-10">
                  <div>
                    <h3 className="text-3xl font-black text-gray-900">Curriculum Linkage</h3>
                    <p className="text-gray-500 font-bold mt-2">Attach official Course IDs from your repository to this classroom.</p>
                  </div>
                  
                  <div className="flex gap-4 p-2 bg-gray-50 rounded-[35px] border border-gray-100 items-center">
                    <Hash size={24} className="ml-6 text-indigo-400"/>
                    <input 
                      type="text" 
                      value={courseInput}
                      onChange={(e) => setCourseInput(e.target.value)}
                      placeholder="Enter Course ID (e.g. CRS-1234)..."
                      className="flex-1 px-4 py-5 bg-transparent border-none outline-none font-black text-xl text-gray-800"
                    />
                    <button 
                      onClick={attachCourse}
                      className="px-10 py-5 bg-indigo-600 text-white rounded-[30px] font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2"
                    >
                      <Plus size={24}/> Link Course
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {linkedCourses.map((c: any) => (
                       <div key={c.id} className="p-8 bg-white border border-gray-100 rounded-[45px] shadow-sm hover:shadow-2xl transition-all group flex flex-col justify-between h-full relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><BookOpen size={100}/></div>
                          <div>
                            <div className="flex justify-between items-start mb-6 relative z-10">
                               <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                  <Book size={28}/>
                               </div>
                               <button onClick={() => detachCourse(c.id)} className="p-3 text-gray-200 hover:text-red-500 transition-colors">
                                  <Trash2 size={20}/>
                               </button>
                            </div>
                            <h4 className="text-2xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors mb-2">{c.title}</h4>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">ID: {c.id} • {c.modules?.length || 0} Modules</p>
                          </div>
                          <button 
                            onClick={() => navigate(`/teacher/my-courses/${c.id}/builder`)}
                            className="w-full py-4 bg-gray-50 text-gray-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                          >
                             Manage Content Hierarchy
                          </button>
                       </div>
                     ))}
                     {linkedCourses.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-gray-50 rounded-[45px] border-2 border-dashed border-gray-200 flex flex-col items-center">
                           <Book size={64} className="text-gray-200 mb-4"/>
                           <p className="font-black text-gray-400 uppercase tracking-widest">No curriculum linked to this node.</p>
                        </div>
                     )}
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'workflows' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in slide-in-from-bottom-6 duration-500">
               <div className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-sm space-y-10">
                  <div className="flex justify-between items-center">
                     <div>
                        <h3 className="text-2xl font-black">Workflow Notes</h3>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Institutional Bulletins</p>
                     </div>
                     <button className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl shadow-inner hover:bg-indigo-600 hover:text-white transition-all">
                        <Plus size={24}/>
                     </button>
                  </div>
                  <div className="space-y-4">
                     {notes.map(n => (
                       <div key={n.id} className="p-8 bg-gray-50 rounded-[35px] border border-gray-100 flex items-center justify-between group hover:shadow-xl transition-all">
                          <div className="flex items-center gap-6">
                             <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm"><FileText size={28}/></div>
                             <div>
                                <p className="font-black text-gray-900 text-lg">{n.title}</p>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Priority: {n.priority} • {n.date}</p>
                             </div>
                          </div>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                             <button className="p-3 text-gray-300 hover:text-indigo-600"><Edit size={18}/></button>
                             <button className="p-3 text-gray-300 hover:text-red-500"><Trash2 size={18}/></button>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-sm space-y-10">
                  <div>
                    <h3 className="text-2xl font-black">Assignment Pipeline</h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Assessment Distribution</p>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="p-10 bg-indigo-50 border border-indigo-100 rounded-[45px] text-center space-y-4 group cursor-pointer hover:bg-indigo-600 hover:text-white transition-all duration-500">
                        <div className="w-20 h-20 bg-white rounded-[30px] flex items-center justify-center mx-auto text-indigo-600 shadow-xl group-hover:scale-110 transition-transform"><Award size={40}/></div>
                        <h4 className="text-xl font-black">Deploy Proctored Exam</h4>
                        <p className="text-sm font-bold opacity-60">Initialize Mode 1, 2 or 3 integrity-shielded tests.</p>
                    </div>
                    <div className="p-10 bg-gray-50 border border-gray-100 rounded-[45px] text-center space-y-4 group cursor-pointer hover:bg-gray-100 transition-all">
                        <div className="w-20 h-20 bg-white rounded-[30px] flex items-center justify-center mx-auto text-gray-400 shadow-sm"><Clock size={40}/></div>
                        <h4 className="text-xl font-black">Release Lab Assignment</h4>
                        <p className="text-sm font-bold opacity-60">Push coding or theoretical lab work to all seats.</p>
                    </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="bg-white rounded-[50px] border border-gray-100 shadow-sm h-[650px] flex flex-col animate-in fade-in duration-500 overflow-hidden">
               <div className="flex-1 p-10 overflow-y-auto space-y-8 no-scrollbar bg-gray-50/30">
                  {messages.map((chat, i) => (
                    <div key={i} className={`flex gap-6 ${chat.role === 'teacher' ? 'flex-row-reverse' : ''}`}>
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-black text-sm shadow-sm ${chat.role === 'teacher' ? 'bg-indigo-900 text-white' : 'bg-white text-indigo-600 border border-indigo-100'}`}>
                          {chat.from[0]}
                       </div>
                       <div className={`max-w-[70%] space-y-2 ${chat.role === 'teacher' ? 'text-right' : ''}`}>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{chat.from} • {chat.time}</p>
                          <div className={`p-6 rounded-[28px] text-base font-medium leading-relaxed ${chat.role === 'teacher' ? 'bg-indigo-600 text-white rounded-tr-none shadow-xl shadow-indigo-100' : 'bg-white text-gray-800 rounded-tl-none border border-gray-200 shadow-sm'}`}>
                             {chat.msg}
                          </div>
                       </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
               </div>
               <div className="p-10 border-t border-gray-50 flex gap-4 bg-white">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Compose institutional reply..." 
                    className="flex-1 px-8 py-5 bg-gray-50 rounded-[28px] border border-gray-100 outline-none focus:ring-4 focus:ring-indigo-100 font-bold transition-all" 
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim()}
                    className="w-20 h-20 bg-indigo-600 text-white rounded-[28px] font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center disabled:opacity-50"
                  >
                    <Send size={32}/>
                  </button>
               </div>
            </div>
          )}

          {activeTab === 'settings' && (
             <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in duration-500">
                <section className="bg-white p-12 rounded-[55px] border border-gray-100 shadow-sm space-y-12">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-red-50 text-red-600 rounded-[25px] flex items-center justify-center shadow-inner"><Settings size={32}/></div>
                      <div>
                        <h3 className="text-3xl font-black">Classroom Governance</h3>
                        <p className="text-gray-400 font-bold">Node configuration and security protocols.</p>
                      </div>
                   </div>

                   <div className="space-y-6">
                      {[
                        { label: 'Public Enrollment', desc: 'Allows any student with Join Code to sync.', icon: Globe, enabled: true },
                        { label: 'AI Proctoring Hard-Lock', desc: 'Enforces strict tab-switching protocols.', icon: Shield, enabled: false },
                        { label: 'Auto-Grading Assist', desc: 'Initialize Gemini for assignment draft grading.', icon: Book, enabled: true }
                      ].map((s, i) => (
                        <div key={i} className="flex items-center justify-between p-10 hover:bg-gray-50 rounded-[45px] transition-all border-2 border-transparent hover:border-gray-100 cursor-pointer group">
                           <div className="flex items-center gap-10">
                              <div className="w-16 h-16 bg-white shadow-lg border border-gray-100 text-gray-300 group-hover:text-indigo-600 rounded-3xl flex items-center justify-center transition-all duration-700 transform group-hover:rotate-6"><s.icon size={32}/></div>
                              <div>
                                <p className="text-xl font-black text-gray-900 tracking-tight">{s.label}</p>
                                <p className="text-sm text-gray-400 font-bold mt-1">{s.desc}</p>
                              </div>
                           </div>
                           <div className={`w-16 h-8 rounded-full relative transition-all ${s.enabled ? 'bg-indigo-600 shadow-lg' : 'bg-gray-200'}`}>
                              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${s.enabled ? 'left-9' : 'left-1'}`}></div>
                           </div>
                        </div>
                      ))}
                   </div>

                   <div className="pt-10 border-t border-gray-50 flex justify-between items-center">
                      <button className="text-red-500 font-black text-xs uppercase tracking-widest hover:underline">Decommission Node</button>
                      <button className="px-10 py-5 bg-indigo-600 text-white rounded-[25px] font-black shadow-3xl shadow-indigo-100">Sync Configurations</button>
                   </div>
                </section>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherClassroomDetail;
