import React, { useState, useEffect } from 'react';
import { User as UserIcon, Mail, Shield, Bell, Lock, Globe, Camera, Zap, GraduationCap, Save, Eye, Palette, Trash2, Code, BookOpen, Brain } from 'lucide-react';

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(() => JSON.parse(localStorage.getItem('user') || '{"name": "Alex Student", "email": "alex@eduadaptive.com"}'));
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('user_settings');
    return saved ? JSON.parse(saved) : {
      notifications: true,
      publicProfile: false,
      darkMode: false,
      emailAlerts: true,
      adaptiveSpeed: 'normal'
    };
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    localStorage.setItem('user_settings', JSON.stringify(settings));
  }, [settings]);

  const handleToggle = (key: string) => {
    setSettings((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(user));
      setIsSaving(false);
      alert("Neural profile synced across institutional nodes.");
    }, 800);
  };

  const resetData = () => {
    if(confirm("DANGER: This will purge all neural learning progress, AI-generated courses, and assessment history. Continue?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const skills = user.skills || ['React', 'TypeScript', 'Node.js', 'Python', 'Machine Learning', 'UI/UX'];

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-12 pb-20">
      <header className="flex flex-col lg:flex-row items-center gap-12 bg-white p-12 md:p-20 rounded-[80px] shadow-sm border border-gray-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full -mr-64 -mt-64 group-hover:scale-110 transition-transform duration-1000 ease-out"></div>
        
        <div className="relative z-10 shrink-0">
          <div className="w-56 h-56 md:w-72 md:h-72 rounded-[65px] bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-400 flex items-center justify-center text-white text-9xl font-black shadow-3xl transform hover:rotate-3 transition-transform duration-700">
            {user.name?.[0]}
          </div>
          <button className="absolute -bottom-4 -right-4 p-6 bg-white text-indigo-600 rounded-[35px] shadow-2xl border border-gray-100 hover:scale-110 active:scale-95 transition-all">
            <Camera size={32}/>
          </button>
        </div>
        
        <div className="text-center lg:text-left flex-1 z-10 space-y-8">
          <div className="space-y-2">
            <p className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.4em] ml-1">Verified Identity</p>
            <input 
              type="text" 
              value={user.name} 
              onChange={e => setUser({...user, name: e.target.value})}
              className="text-5xl md:text-7xl font-black text-gray-900 bg-transparent border-none outline-none focus:ring-4 focus:ring-indigo-100 rounded-[30px] w-full p-2 transition-all"
            />
          </div>
          
          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
             <div className="px-6 py-3 bg-indigo-50 text-indigo-600 rounded-[20px] text-xs font-black border border-indigo-100 flex items-center gap-3">
               <GraduationCap size={18}/> B.TECH CSE (3RD YEAR)
             </div>
             <div className="px-6 py-3 bg-emerald-50 text-emerald-600 rounded-[20px] text-xs font-black border border-emerald-100 flex items-center gap-3">
               <Brain size={18}/> ADAPTIVE LEARNER
             </div>
             <div className="px-6 py-3 bg-orange-50 text-orange-600 rounded-[20px] text-xs font-black border border-orange-100 flex items-center gap-3">
               <Zap size={18}/> TIER: ELITE
             </div>
          </div>

          <div className="space-y-4 pt-4">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mastery Spectrum</p>
             <div className="flex flex-wrap gap-2">
                {skills.map((s: string) => (
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
            {isSaving ? "Syncing..." : <><Save size={24}/> Sync Profile</>}
          </button>
          <button onClick={resetData} className="w-full lg:px-12 py-4 bg-white border-2 border-red-50 text-red-400 rounded-[35px] font-black text-xs hover:bg-red-50 transition-all flex items-center justify-center gap-2">
            <Trash2 size={16}/> Wipe Neural History
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
                  <h2 className="text-4xl font-black tracking-tighter">System Governance</h2>
                  <p className="text-gray-400 font-bold">Configure your interaction with the EduAdaptive core.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { id: 'notifications', label: 'Proactive Intelligence', icon: Bell, desc: 'Real-time AI alerts for upcoming exam windows and course revisions.' },
                  { id: 'emailAlerts', label: 'Performance Digest', icon: Mail, desc: 'Receive weekly cognitive breakdown reports in your verified inbox.' },
                  { id: 'publicProfile', label: 'Institutional Visibility', icon: Globe, desc: 'Enable professor and recruiter access to your skill matrix.' },
                  { id: 'darkMode', label: 'Quantum Focus UI', icon: Palette, desc: 'Optimized high-contrast interface for late-night research sessions.' }
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
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.4em] text-center">Cloud Sync Node</h3>
              <div className="space-y-6">
                 <div className="p-8 bg-indigo-50 rounded-[45px] border border-indigo-100 group hover:bg-indigo-600 transition-all duration-500">
                    <p className="text-[10px] font-black text-indigo-400 group-hover:text-indigo-200 uppercase mb-3 tracking-widest">Anchor Institution</p>
                    <p className="text-xl font-black text-indigo-900 group-hover:text-white">EduAdaptive Global</p>
                 </div>
                 <div className="p-8 bg-gray-50 rounded-[45px] border border-gray-100 group hover:border-indigo-200 transition-all">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest">Current Focus</p>
                    <p className="text-xl font-black text-gray-800">Neural Engineering</p>
                 </div>
                 <div className="p-8 bg-gray-50 rounded-[45px] border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest">Behavioral Score</p>
                    <div className="flex items-center gap-3">
                       <Shield size={24} className="text-green-500"/>
                       <p className="text-2xl font-black text-green-600">98.4%</p>
                    </div>
                 </div>
              </div>
           </section>

           <section className="bg-indigo-900 rounded-[80px] p-16 text-white shadow-4xl text-center space-y-10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/30 to-transparent"></div>
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto relative z-10">
                <Brain size={48} className="text-indigo-400 animate-pulse" />
              </div>
              <div className="relative z-10 space-y-4">
                <h3 className="text-3xl font-black tracking-tight uppercase">Architect Plus</h3>
                <p className="text-indigo-200 text-sm font-bold leading-relaxed opacity-80">
                  Institutional license active. Unlimited Gemini 3.0 inference unlocked for real-time course architecting.
                </p>
              </div>
              <button className="w-full py-6 bg-white text-indigo-900 rounded-[40px] font-black shadow-3xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-xs relative z-10">
                 Manage License
              </button>
           </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;