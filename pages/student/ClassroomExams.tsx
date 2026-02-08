
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ClipboardList, Clock, ShieldCheck, AlertCircle, ChevronRight } from 'lucide-react';
import { Exam } from '../../types';

const ClassroomExams: React.FC = () => {
  const { id } = useParams();

  const exams: Exam[] = [
    {
      id: 'ex-101',
      title: 'Operating Systems Mid-Term',
      subject: 'CSE-402',
      date: 'Oct 15, 2024 • 10:00 AM',
      duration: 60,
      mode: 1,
      strictness: 'High',
      status: 'NOT_STARTED'
    },
    {
      id: 'ex-102',
      title: 'Calculus Quiz 2',
      subject: 'MAT-201',
      date: 'Oct 12, 2024 • 02:00 PM',
      duration: 30,
      mode: 2,
      strictness: 'Moderate',
      status: 'SUBMITTED'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUBMITTED': return 'bg-green-100 text-green-700';
      case 'DISQUALIFIED': return 'bg-red-100 text-red-700';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Classroom Exams</h1>
        <p className="text-gray-500">Institutional assessments for {id}</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {exams.map((exam) => (
          <div key={exam.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center group">
            <div className="flex items-center gap-6 w-full">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                <ClipboardList size={28} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-gray-900">{exam.title}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getStatusColor(exam.status)}`}>
                    {exam.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-400">
                  <span className="flex items-center gap-1"><Clock size={14}/> {exam.duration} mins</span>
                  <span className="flex items-center gap-1"><ShieldCheck size={14}/> Mode {exam.mode} ({exam.strictness} Proctoring)</span>
                  <span>{exam.date}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-0 w-full md:w-auto">
              {exam.status === 'NOT_STARTED' ? (
                <Link 
                  to={`/student/exam/${exam.id}/details`}
                  className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                  Enter Exam Room <ChevronRight size={18} />
                </Link>
              ) : (
                <button disabled className="w-full md:w-auto px-8 py-3 bg-gray-100 text-gray-400 rounded-xl font-bold cursor-not-allowed">
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassroomExams;
