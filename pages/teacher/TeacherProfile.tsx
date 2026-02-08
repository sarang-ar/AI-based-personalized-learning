
import React, { useState, useEffect } from 'react';
import { User as UserIcon, Mail, Shield, Bell, Lock, Globe, Camera, Zap, GraduationCap, Save, Eye, Palette, Trash2, Code, BookOpen, Brain, Briefcase } from 'lucide-react';

const TeacherProfile: React.FC = () => {
  const [user, setUser] = useState<any>(() => JSON.parse(localStorage.getItem('user') || '{"name": "Dr. Emily Watson", "email": "emily@eduadaptive.com"}'));
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('teacher_settings');
    return saved ? JSON.parse(saved) : {
      notifications: true,
      autoGrading: true,
      publicClassrooms: true,
      emailAlerts: true,
      aiDrafting: true
    };
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    localStorage.setItem('teacher_settings', JSON.stringify(settings));
  }, [settings]);

  const handleToggle = (key: string) => {
    setSettings((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(user));
      setIsSaving(false);
      alert("Institutional identity synced with node server.");
    }, 800);
  };

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-12 pb-20">
      <header className="flex flex-col lg:flex-row items-center gap-12 bg-white p-12 md:p-20 rounded-[80px] shadow-sm border border-gray-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full -mr-64 -mt-64 group-hover:scale-110 transition-transform duration-1000 ease-out"></div>
        
        <div className="relative z-10 shrink-0">
          <div className="w-56 h-56 md:w-72 md:h-72 rounded-[65px] bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-500 flex items-center justify-center text-white text-9xl font-black shadow-3xl transform hover:-rotate-3 transition-transform duration-700">
            {user.name?.[0]}
          </div>
          <button className="absolute -bottom-4 -right-4 p-6 bg-white text-indigo-600 rounded-[35px] shadow-2xl border border-gray-100 hover:scale-110 active:scale-95 transition-all">
            <Camera size={32}/>
          </button>
        </div>
        
        <div className="text-center lg:text-left flex-1 z-10 space-y-8">
          <div className="space-y-2">
            <p className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.4em] ml-1">Academic Authority</p>
            <input 
              type="text" 
              value={user.name} 
              onChange={e => setUser({...user, name: e.target.value})}
              className="text-5xl md:text-7xl font-black text-gray-900 bg-transparent border-none outline-none focus:ring-4 focus:ring-indigo-100 rounded-[30px] w-full p-2 transition-all"
            />
          </div>
          
          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
             <div className="px-6 py-3 bg-indigo-50 text-indigo-600 rounded-[20px] text-xs font-black border border-indigo-100 flex items-center gap-3">
               <Briefcase size={18}/> PROFESSOR
             </div>
             <div className="px-6 py-3 bg-emerald-50 text-emerald-600 rounded-[20px] text-xs font-black border border-emerald-100 flex items-center gap-3">
               <Shield size={18}/> DEPT: COMPUTER SCIENCE
             </div>
             <div className="px-6 py-3 bg-orange-50 text-orange-600 rounded-[20px] text-xs font-black border border-orange-100 flex items-center gap-3">
               <Zap size={18}/> NODE: CLOUD-PRIMARY
             </div>
          </div>

          <div className="space-y-4 pt-4">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Specialization Matrix</p>
             <div className="flex flex-wrap gap-2">
                {['Operating Systems', 'Distributed Computing', 'Cloud Architect', 'Cybersecurity'].map((s: string) => (
                  <span key={s} className="px-5 py-2 bg-gray-50 text-gray-500 rounded-full text-[10px] font-black uppercase tracking-tight border border-gray-100 hover:bg-indigo-600 hover:text-white transition-all cursor-default">{s}</span>
                ))}
             </div>
          </div>
        </div>

        <div className="z-10 flex flex-col gap-4 w-full lg:w-auto">
          <button 
            onClick={handleSaveProfile}
            disabled={isSaving}
            className="w-full lg:px-12 py-6 bg-indigo-600 text-white rounded-[40px] font-black text-lg shadow-3xl shadow-indigo-100 flex items-center justify-center gap-3 hover:bg-indigo-700 hover:-translate-y-1 transition-all"
          >
            {isSaving ? "Syncing..." : <><Save size={24}/> Sync Node</>}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
           <section className="bg-white p-12 md:p-20 rounded-[85px] border border-gray-100 shadow-sm space-y-16">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center shadow-inner">
                  <Shield size={36}/>
                </div>
                <div>
                  <h2 className="text-4xl font-black tracking-tighter">Governance Controls</h2>
                  <p className="text-gray-400 font-bold">Configure how your classrooms and curriculum sync with students.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { id: 'notifications', label: 'Instructional Alerts', icon: Bell, desc: 'Real-time notifications for student submissions and proctoring threats.' },
                  { id: 'autoGrading', label: 'AI Evaluator Assist', icon: Brain, desc: 'Enable Gemini 3.5 to provide preliminary feedback on assignments.' },
                  { id: 'publicClassrooms', label: 'Join-Code Visibility', icon: Globe, desc: 'Allow institutional nodes to discover your active classrooms.' },
                  { id: 'aiDrafting', label: 'Content Co-Pilot', icon: Code, desc: 'Use AI to draft module summaries and quiz questions automatically.' }
                ].map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between p-10 hover:bg-gray-50 rounded-[55px] transition-all border-2 border-transparent hover:border-gray-100 group cursor-pointer" onClick={() => handleToggle(item.id)}>
                    <div className="flex items-center gap-10">
                      <div className="w-20 h-20 bg-white shadow-xl border border-gray-100 text-gray-300 group-hover:text-indigo-600 rounded-[35px] flex items-center justify-center transition-all duration-700 transform group-hover:rotate-6">
                        <item.icon size={40}/>
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-2xl font-black text-gray-900 tracking-tight">{item.label}</p>
                        <p className="text-base text-gray-400 font-medium mt-2 max-w-md leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                    <div 
                      className={`w-20 h-11 rounded-full transition-all relative shrink-0 ${settings[item.id as keyof typeof settings] ? 'bg-indigo-600 shadow-xl' : 'bg-gray-200'}`}
                    >
                      <div className={`absolute top-1.5 w-8 h-8 bg-white rounded-full transition-all shadow-md ${settings[item.id as keyof typeof settings] ? 'left-10.5' : 'left-1.5'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
           </section>
        </div>

        <div className="space-y-12">
           <section className="bg-white p-12 md:p-16 rounded-[80px] border border-gray-100 shadow-sm space-y-10">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.4em] text-center">Institutional Sync</h3>
              <div className="space-y-6">
                 <div className="p-8 bg-indigo-50 rounded-[45px] border border-indigo-100 group hover:bg-indigo-900 transition-all duration-500">
                    <p className="text-[10px] font-black text-indigo-400 group-hover:text-indigo-300 uppercase mb-3 tracking-widest">Main Node</p>
                    <p className="text-xl font-black text-indigo-900 group-hover:text-white">EduAdaptive Global University</p>
                 </div>
                 <div className="p-8 bg-gray-50 rounded-[45px] border border-gray-100 group hover:border-indigo-200 transition-all">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest">Faculty ID</p>
                    <p className="text-xl font-black text-gray-800">FAC-8293-CS</p>
                 </div>
                 <div className="p-8 bg-gray-50 rounded-[45px] border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest">Trust Rating</p>
                    <div className="flex items-center gap-3">
                       <Shield size={24} className="text-blue-500"/>
                       <p className="text-2xl font-black text-blue-600">VERIFIED GOLD</p>
                    </div>
                 </div>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
