
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shield, Book, AlertTriangle, ChevronRight, Info } from 'lucide-react';

const ExamDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-[40px] shadow-xl overflow-hidden">
        <div className="p-8 md:p-12 space-y-8">
          <header className="text-center">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Exam Instructions</h1>
            <p className="text-gray-500">Operating Systems Mid-Term • ID: {id}</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
              <h3 className="font-bold flex items-center gap-2 mb-3"><Book size={18}/> Allowed Resources</h3>
              <ul className="text-sm text-gray-600 space-y-2 list-disc pl-4">
                <li>Plain white paper for diagrams</li>
                <li>Physical pen/pencil</li>
                <li>Single monitor setup</li>
              </ul>
            </div>
            <div className="p-6 bg-red-50 rounded-3xl border border-red-100">
              <h3 className="font-bold text-red-700 flex items-center gap-2 mb-3"><AlertTriangle size={18}/> Prohibited Items</h3>
              <ul className="text-sm text-red-600 space-y-2 list-disc pl-4">
                <li>Smartphones or tablets</li>
                <li>Browser tab switching</li>
                <li>Secondary monitors</li>
              </ul>
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-3xl">
             <div className="flex gap-3">
               <Info className="text-indigo-600 shrink-0" size={20} />
               <div>
                 <p className="font-bold text-indigo-900">Marking Scheme</p>
                 <p className="text-sm text-indigo-700">Total 50 Marks. Partial marks awarded for steps and diagrams. AI evaluation with final teacher review.</p>
               </div>
             </div>
          </div>

          <button 
            onClick={() => navigate(`/student/exam/${id}/setup`)}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
          >
            Agree & Continue to Setup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamDetails;
