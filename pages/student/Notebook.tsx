
import React, { useState, useEffect, useRef } from 'react';
import { StickyNote, HelpCircle, Code, Trash2, Book, Eye, Download, Map, Plus, X, Save, File, Paperclip, ExternalLink, ChevronLeft, Info } from 'lucide-react';

const Notebook: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notes' | 'doubts' | 'code' | 'roadmaps'>('notes');
  const [items, setItems] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewNote, setViewNote] = useState<any>(null);
  const [viewAttachment, setViewAttachment] = useState<string | null>(null);
  const [newNote, setNewNote] = useState({ title: '', content: '', lang: 'text', attachments: [] as string[] });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const key = `notebook_${activeTab}`;
    setItems(JSON.parse(localStorage.getItem(key) || '[]'));
  }, [activeTab]);

  const handleDelete = (id: number) => {
    if(!confirm("Erase this insight permanently?")) return;
    const key = `notebook_${activeTab}`;
    const saved = JSON.parse(localStorage.getItem(key) || '[]');
    const filtered = saved.filter((i: any) => i.id !== id);
    setItems(filtered);
    localStorage.setItem(key, JSON.stringify(filtered));
    if (viewNote?.id === id) setViewNote(null);
  };

  const handleDownload = (item: any) => {
    const content = `Title: ${item.title}\nDate: ${item.date}\nType: ${activeTab}\n\nContent:\n${item.content || item.code}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.title.replace(/\s+/g, '_').toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveNote = () => {
    if (!newNote.title || !newNote.content) return;
    const key = `notebook_${activeTab}`;
    const saved = JSON.parse(localStorage.getItem(key) || '[]');
    const item = {
      id: Date.now(),
      ...newNote,
      date: new Date().toLocaleDateString()
    };
    const updated = [item, ...saved];
    setItems(updated);
    localStorage.setItem(key, JSON.stringify(updated));
    setShowAddModal(false);
    setNewNote({ title: '', content: '', lang: 'text', attachments: [] });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const names = Array.from(files).map((f: File) => f.name);
      setNewNote(prev => ({ ...prev, attachments: [...prev.attachments, ...names] }));
    }
  };

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter">Neural Archive</h1>
          <p className="text-gray-500 font-bold text-lg">Your synchronized repository of multi-modal insights.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="flex bg-white p-2 rounded-[28px] shadow-sm border border-gray-100 overflow-x-auto no-scrollbar items-center">
            {['notes', 'doubts', 'code', 'roadmaps'].map(t => (
              <button 
                key={t} 
                onClick={() => setActiveTab(t as any)} 
                className={`px-8 py-3 rounded-[20px] font-black capitalize transition-all whitespace-nowrap ${activeTab === t ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-100' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-10 py-5 bg-indigo-600 text-white rounded-[28px] font-black flex items-center justify-center gap-3 shadow-3xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all"
          >
            <Plus size={24}/> New Entry
          </button>
        </div>
      </header>

      {/* Attachment View Overlay */}
      {viewAttachment && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-3xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10 text-center space-y-6">
              <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[30px] flex items-center justify-center mx-auto">
                <File size={40} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 truncate px-4">{viewAttachment}</h3>
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-left">
                <p className="text-xs font-black text-gray-400 uppercase mb-3 flex items-center gap-2"><Info size={14}/> Simulated Preview</p>
                <p className="text-sm text-gray-600 font-medium italic">"The EduAdaptive system is currently simulating the local viewer for this file type. In a full production environment, this would initialize the local native reader."</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setViewAttachment(null)} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black">Close</button>
                <button className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100">Download Local Copy</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Note Detail View */}
      {viewNote && (
        <div className="fixed inset-0 z-[150] bg-white overflow-y-auto animate-in slide-in-from-right-10 duration-500 no-scrollbar">
          <div className="max-w-5xl mx-auto p-10 space-y-12">
            <button onClick={() => setViewNote(null)} className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-xs">
              <ChevronLeft size={20}/> Back to Archive
            </button>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                  <h2 className="text-5xl font-black text-gray-900 tracking-tight">{viewNote.title}</h2>
                  <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">Captured on {viewNote.date} • {activeTab.toUpperCase()}</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => handleDelete(viewNote.id)} className="p-4 bg-red-50 text-red-600 rounded-3xl hover:bg-red-600 hover:text-white transition-all">
                    <Trash2 size={24}/>
                  </button>
                  <button onClick={() => handleDownload(viewNote)} className="p-4 bg-indigo-50 text-indigo-600 rounded-3xl hover:bg-indigo-600 hover:text-white transition-all">
                    <Download size={24}/>
                  </button>
                </div>
              </div>

              <div className="p-10 bg-gray-50 rounded-[50px] border border-gray-100 shadow-inner">
                <p className="text-xl text-gray-700 leading-relaxed font-medium whitespace-pre-wrap">{viewNote.content || viewNote.code}</p>
              </div>

              {viewNote.attachments && viewNote.attachments.length > 0 && (
                <div className="space-y-6">
                  <h4 className="text-xl font-black text-gray-900">Encapsulated Assets</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {viewNote.attachments.map((file: string, idx: number) => (
                      <div key={idx} className="p-6 bg-white border border-gray-100 rounded-[30px] flex items-center justify-between shadow-sm hover:shadow-xl transition-all group">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                              <File size={24}/>
                            </div>
                            <span className="font-bold text-gray-800 truncate max-w-[200px]">{file}</span>
                         </div>
                         <button 
                          onClick={() => setViewAttachment(file)}
                          className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-black text-[10px] uppercase group-hover:bg-indigo-600 group-hover:text-white transition-all"
                         >
                            <Eye size={16}/> View Locally
                         </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[50px] shadow-3xl overflow-hidden animate-in zoom-in-95 duration-300">
             <div className="p-10 md:p-14 space-y-10">
               <div className="flex justify-between items-center">
                 <h2 className="text-3xl font-black tracking-tight">Capture Insight</h2>
                 <button onClick={() => setShowAddModal(false)} className="p-3 text-gray-300 hover:text-gray-500"><X size={32}/></button>
               </div>
               <div className="space-y-6">
                 <div className="space-y-1">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Insight Anchor</label>
                   <input 
                    type="text" 
                    placeholder="Brief title..." 
                    className="w-full p-6 bg-gray-50 border-none rounded-[30px] outline-none focus:ring-4 focus:ring-indigo-100 font-black text-lg"
                    value={newNote.title}
                    onChange={e => setNewNote({...newNote, title: e.target.value})}
                   />
                 </div>
                 <div className="space-y-1">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Neural Recording</label>
                   <textarea 
                    placeholder="Record your findings, definitions, or code..." 
                    className="w-full h-48 p-6 bg-gray-50 border-none rounded-[30px] outline-none focus:ring-4 focus:ring-indigo-100 font-medium leading-relaxed no-scrollbar"
                    value={newNote.content}
                    onChange={e => setNewNote({...newNote, content: e.target.value})}
                   />
                 </div>
                 
                 <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-500 rounded-2xl font-black text-xs hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                    >
                      <Paperclip size={16}/> Attach Files
                    </button>
                    <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileUpload} />
                    
                    {newNote.attachments.map((f, i) => (
                      <span key={i} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black flex items-center gap-2">
                        {f} <X size={10} className="cursor-pointer" onClick={() => setNewNote(prev => ({ ...prev, attachments: prev.attachments.filter((_, idx) => idx !== i) }))}/>
                      </span>
                    ))}
                 </div>
               </div>
               <button 
                onClick={handleSaveNote}
                className="w-full py-6 bg-indigo-600 text-white rounded-[35px] font-black text-lg shadow-3xl shadow-indigo-100 flex items-center justify-center gap-3 hover:bg-indigo-700 hover:-translate-y-1 transition-all"
               >
                 <Save size={24}/> Archive to Memory
               </button>
             </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {items.map(item => (
          <div 
            key={item.id} 
            className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-sm hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 flex flex-col group relative overflow-hidden h-full"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-[24px] flex items-center justify-center shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                {activeTab === 'notes' ? <StickyNote size={32}/> : activeTab === 'doubts' ? <HelpCircle size={32}/> : activeTab === 'code' ? <Code size={32}/> : <Map size={32}/>}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setViewNote(item)} 
                  className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Eye size={18}/>
                </button>
                <button 
                  onClick={() => handleDownload(item)} 
                  className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Download size={18}/>
                </button>
                <button 
                  onClick={() => handleDelete(item.id)} 
                  className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18}/>
                </button>
              </div>
            </div>
            
            <h3 className="text-2xl font-black text-gray-900 mb-6 group-hover:text-indigo-600 transition-colors line-clamp-2">{item.title}</h3>
            <p className="text-gray-400 text-sm line-clamp-3 flex-1 mb-10 leading-relaxed font-medium">
              {item.content || item.code}
            </p>

            <div className="pt-8 border-t border-gray-50 flex justify-between items-center relative z-10">
              <div className="flex items-center gap-2">
                 <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{item.date}</span>
              </div>
              {item.attachments && item.attachments.length > 0 && (
                <div className="flex items-center gap-1.5 text-indigo-400">
                  <Paperclip size={14}/>
                  <span className="text-[10px] font-black">{item.attachments.length}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full py-40 text-center bg-white rounded-[70px] border-2 border-dashed border-gray-100">
             <Book size={100} className="mx-auto text-gray-100 mb-8"/>
             <p className="text-3xl font-black text-gray-300 uppercase tracking-tighter">Your Neural Vault is Empty</p>
             <p className="text-gray-400 mt-4 font-bold text-lg">Every great concept starts with a single note.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notebook;
