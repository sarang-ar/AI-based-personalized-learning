
import React, { useState, useRef, useEffect } from 'react';
import { PenTool, Eraser, Trash2, Shield, Clock, Camera } from 'lucide-react';

const ExamMode2: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [timeLeft, setTimeLeft] = useState(1800);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineWidth = 3;
      }
    }
    navigator.mediaDevices.getUserMedia({ video: true }).then(s => { if(videoRef.current) videoRef.current.srcObject = s; });
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.strokeStyle = tool === 'pen' ? '#4f46e5' : '#ffffff';
    ctx.lineWidth = tool === 'pen' ? 3 : 20;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    canvasRef.current?.getContext('2d')?.beginPath();
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      <header className="p-4 bg-white border-b flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-6">
          <span className="font-bold text-lg">Mode 2: Digital Ink</span>
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button onClick={() => setTool('pen')} className={`p-2 rounded-lg transition-all ${tool === 'pen' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500'}`}><PenTool size={20}/></button>
            <button onClick={() => setTool('eraser')} className={`p-2 rounded-lg transition-all ${tool === 'eraser' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500'}`}><Eraser size={20}/></button>
            <button onClick={() => {
              const ctx = canvasRef.current?.getContext('2d');
              if (ctx) ctx.clearRect(0,0, canvasRef.current!.width, canvasRef.current!.height);
            }} className="p-2 text-red-400 hover:text-red-600"><Trash2 size={20}/></button>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
             <div className="text-[10px] font-bold text-gray-400 uppercase">Timer</div>
             <div className="text-xl font-mono font-bold text-indigo-600">
               {Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2,'0')}
             </div>
          </div>
          <button className="px-8 py-2 bg-green-600 text-white font-bold rounded-xl">Submit Ink</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 p-8 overflow-hidden flex flex-col">
           <div className="mb-6">
              <h2 className="text-2xl font-bold">Q1: Draw the layered architecture of an Operating System.</h2>
              <p className="text-gray-500 text-sm">Use the canvas below for your answer (Handwriting + Diagrams).</p>
           </div>
           <canvas 
             ref={canvasRef}
             onMouseDown={startDrawing}
             onMouseMove={draw}
             onMouseUp={stopDrawing}
             onMouseOut={stopDrawing}
             onTouchStart={startDrawing}
             onTouchMove={draw}
             onTouchEnd={stopDrawing}
             className="flex-1 bg-white rounded-[40px] shadow-inner border border-gray-200 cursor-crosshair touch-none"
           />
        </div>

        <div className="w-80 bg-white border-l p-6 space-y-6">
           <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden relative shadow-sm border border-gray-200">
              <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/50 text-[8px] font-bold text-white rounded backdrop-blur-md">PROCTORING</div>
           </div>
           <div className="p-4 bg-indigo-50 rounded-2xl space-y-2">
              <p className="text-[10px] font-bold text-indigo-400 uppercase">Integrity Monitor</p>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-700">
                 <Shield size={14}/> Secure Focus Locked
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ExamMode2;
