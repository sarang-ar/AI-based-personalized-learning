
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, FileText, Bell, MessageSquare, Award, Clock, Upload, CheckCircle, Paperclip, X, ExternalLink, Send, User } from 'lucide-react';

const StudentClassroomDetail: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'materials' | 'assignments' | 'messages'>('materials');
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<Record<string, any>>({});
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  
  // Chat State
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<any[]>([
    { from: 'Dr. Emily Watson', msg: 'Please ensure everyone has installed the Bochs emulator for Lab 3.', time: '9:30 AM', role: 'teacher' },
    { from: 'You', msg: 'Should we submit the documentation in PDF format?', time: '10:15 AM', role: 'student' },
    { from: 'Dr. Emily Watson', msg: 'Yes, PDF only please.', time: '10:20 AM', role: 'teacher' }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`submissions_${id}`);
    if (saved) setSubmissions(JSON.parse(saved));
  }, [id]);

  useEffect(() => {
    if (activeTab === 'messages' && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeTab, messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMessage = {
      from: 'You',
      msg: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      role: 'student'
    };
    setMessages([...messages, newMessage]);
    setChatInput('');
  };

  const submitAssignment = (assId: string) => {
    if (!uploadFile) {
      alert("Please attach a file before submitting.");
      return;
    }
    
    const newSub = {
      status: 'Submitted',
      fileName: uploadFile.name,
      date: new Date().toLocaleString(),
    };
    
    const updated = { ...submissions, [assId]: newSub };
    setSubmissions(updated);
    localStorage.setItem(`submissions_${id}`, JSON.stringify(updated));
    setSubmittingId(null);
    setUploadFile(null);
    alert("Assignment submitted successfully to the institutional portal.");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="p-8 bg-white border-b border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-2">
            <span className="px-2 py-0.5 bg-indigo-50 rounded">{id?.toUpperCase()}</span>
            <span>•</span>
            <span>Autumn Semester 2024</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Operating Systems</h1>
        </div>
        <div className="flex bg-gray-50 rounded-[28px] p-2 border border-gray-100 overflow-x-auto no-scrollbar gap-2">
          {[
            { id: 'materials', label: 'Materials', icon: BookOpen },
            { id: 'assignments', label: 'Work', icon: Award },
            { id: 'messages', label: 'Chat', icon: MessageSquare }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-8 py-3 rounded-[20px] font-black transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-4 md:p-8 gap-8">
        <div className="flex-1 overflow-y-auto space-y-6 no-scrollbar pb-20">
          {activeTab === 'materials' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="bg-white p-6 md:p-10 rounded-[50px] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shadow-inner">
                    <Bell size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black">Institutional Feed</h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Broadcasts from Instructors</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-8 bg-orange-50/50 border border-orange-100 rounded-[35px] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Bell size={64}/></div>
                    <p className="font-black text-orange-900 text-lg">Unit Test Rescheduled</p>
                    <p className="text-sm text-orange-700 mt-2 font-medium leading-relaxed">The Kernel Architecture test has been moved to next Monday, 10:00 AM. Prepare for Mode 1 Proctoring. New study materials uploaded below.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Syllabus 2024", type: "PDF", size: "1.2 MB" },
                  { title: "Lecture 1: Intro", type: "Slides", size: "4.5 MB" },
                  { title: "Lab 1: Shell Scripts", type: "Archive", size: "800 KB" },
                  { title: "Memory Mgmt Notes", type: "PDF", size: "2.1 MB" }
                ].map((doc, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex justify-between items-center hover:shadow-2xl transition-all cursor-pointer group">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[24px] flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                        <FileText size={32} />
                      </div>
                      <div>
                        <p className="font-black text-gray-900 group-hover:text-indigo-600 transition-colors text-lg">{doc.title}</p>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl text-gray-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                       <ExternalLink size={20}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-500">
              {[
                { id: 'ass-1', title: "CPU Scheduling Lab", due: "Tomorrow, 6:00 PM", points: 20 },
                { id: 'ass-2', title: "Concurrency Essay", due: "Oct 15, 2024", points: 50 },
                { id: 'ass-3', title: "Deadlock Analysis", due: "Oct 22, 2024", points: 30 }
              ].map((ass, idx) => {
                const sub = submissions[ass.id];
                const isSubmitting = submittingId === ass.id;

                return (
                  <div key={idx} className="bg-white p-8 md:p-12 rounded-[50px] border border-gray-100 shadow-sm flex flex-col group hover:border-indigo-100 hover:shadow-2xl transition-all gap-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="flex items-center gap-8 w-full">
                        <div className={`w-20 h-20 rounded-[35px] flex items-center justify-center shrink-0 shadow-inner ${sub ? 'bg-green-100 text-green-600' : 'bg-red-50 text-red-500'}`}>
                          {sub ? <CheckCircle size={40}/> : <Clock size={40} />}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-3xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors tracking-tight">{ass.title}</h4>
                          <div className="flex flex-wrap gap-6 mt-2">
                            <span className="text-sm font-bold text-gray-400">Due {ass.due}</span>
                            <span className="text-sm font-black text-indigo-400 uppercase tracking-widest">{ass.points} Points</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${sub ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                          {sub ? 'Grading Pending' : 'Action Required'}
                        </span>
                      </div>
                    </div>

                    {isSubmitting ? (
                      <div className="p-8 bg-gray-50 rounded-[35px] border-2 border-dashed border-indigo-100 space-y-8 animate-in zoom-in-95">
                        <div className="flex flex-col items-center justify-center text-center space-y-4">
                          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                            <Upload size={32}/>
                          </div>
                          <div>
                            <p className="font-black text-gray-900">Upload Final Submission</p>
                            <p className="text-xs font-bold text-gray-400">Accepted formats: .pdf, .zip, .png</p>
                          </div>
                          <input type="file" id={`file-${ass.id}`} className="hidden" onChange={handleFileChange} />
                          <label htmlFor={`file-${ass.id}`} className="px-10 py-4 bg-white border border-gray-200 rounded-2xl font-black text-sm cursor-pointer hover:bg-indigo-50 hover:text-indigo-600 transition-all shadow-sm">
                            {uploadFile ? uploadFile.name : 'Select Lab File'}
                          </label>
                        </div>
                        <div className="flex gap-4">
                          <button onClick={() => setSubmittingId(null)} className="flex-1 py-4 bg-white border border-gray-100 text-gray-400 rounded-2xl font-black">Cancel</button>
                          <button onClick={() => submitAssignment(ass.id)} className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100">Submit to Professor</button>
                        </div>
                      </div>
                    ) : sub ? (
                      <div className="p-6 bg-green-50/50 rounded-3xl border border-green-100 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <Paperclip size={20} className="text-green-600" />
                            <div>
                               <p className="text-sm font-black text-green-900">{sub.fileName}</p>
                               <p className="text-[10px] font-bold text-green-600 uppercase">Received: {sub.date}</p>
                            </div>
                         </div>
                         <button className="text-green-600 font-black text-xs uppercase hover:underline">Revise Submission</button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setSubmittingId(ass.id)}
                        className="w-full py-6 bg-indigo-600 text-white rounded-[32px] font-black text-lg transition-all shadow-3xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 flex items-center justify-center gap-3"
                      >
                        <Upload size={24}/> Upload Lab Work
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          
          {activeTab === 'messages' && (
            <div className="bg-white rounded-[50px] border border-gray-100 shadow-sm h-full flex flex-col animate-in fade-in duration-500 overflow-hidden min-h-[500px]">
               <div className="flex-1 p-10 overflow-y-auto space-y-8 no-scrollbar">
                  {messages.map((chat, i) => (
                    <div key={i} className={`flex gap-6 ${chat.role === 'student' ? 'flex-row-reverse' : ''}`}>
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-black text-sm shadow-sm ${chat.role === 'teacher' ? 'bg-indigo-900 text-white' : 'bg-indigo-100 text-indigo-600'}`}>
                          {chat.from?.[0] || '?'}
                       </div>
                       <div className={`max-w-[70%] space-y-2 ${chat.role === 'student' ? 'text-right' : ''}`}>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{chat.from} • {chat.time}</p>
                          <div className={`p-6 rounded-[28px] text-base font-medium leading-relaxed ${chat.role === 'teacher' ? 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200 shadow-sm' : 'bg-indigo-600 text-white rounded-tr-none shadow-xl shadow-indigo-100'}`}>
                             {chat.msg}
                          </div>
                       </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
               </div>
               <div className="p-8 border-t border-gray-50 flex gap-4 bg-gray-50/50">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message to the class..." 
                    className="flex-1 px-8 py-5 bg-white rounded-[24px] border border-gray-100 outline-none focus:ring-4 focus:ring-indigo-100 font-bold transition-all shadow-sm" 
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim()}
                    className="px-10 py-5 bg-indigo-600 text-white rounded-[24px] font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    <Send size={20}/> Send
                  </button>
               </div>
            </div>
          )}
        </div>

        <div className="w-full lg:w-96 space-y-8">
          <div className="bg-indigo-900 rounded-[50px] p-12 text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700"></div>
             <h3 className="text-2xl font-black mb-6 relative z-10">Institutional Exam Center</h3>
             <p className="text-indigo-200 text-sm font-bold mb-10 leading-relaxed relative z-10 opacity-90">
               Access high-integrity proctored assessments for this classroom. Mode 1 (Typing) and Mode 3 (Paper) protocols enabled.
             </p>
             <Link 
              to="/student/exams" 
              className="block w-full text-center py-6 bg-white text-indigo-900 rounded-[30px] font-black hover:bg-indigo-50 transition-all shadow-3xl hover:-translate-y-1 relative z-10 uppercase tracking-widest text-xs"
             >
               Attempt Test
             </Link>
          </div>
          
          <div className="bg-white rounded-[50px] p-12 border border-gray-100 shadow-sm space-y-10">
             <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] text-center">Academic Standing</h4>
             <div className="space-y-6">
               <div className="flex justify-between items-center p-6 bg-gray-50 rounded-[28px] border border-gray-100 group">
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">Attendance</span>
                 <span className="font-black text-gray-800 text-xl">92%</span>
               </div>
               <div className="flex justify-between items-center p-6 bg-gray-50 rounded-[28px] border border-gray-100 group">
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-green-600 transition-colors">Grade Avg</span>
                 <span className="font-black text-green-600 text-xl">A-</span>
               </div>
               <div className="flex justify-between items-center p-6 bg-gray-50 rounded-[28px] border border-gray-100 group">
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">Class Rank</span>
                 <span className="font-black text-gray-800 text-xl">12 / 42</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentClassroomDetail;
