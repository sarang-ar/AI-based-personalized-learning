
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ShieldCheck, UserCircle } from 'lucide-react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [role, setRole] = useState<UserRole>('student');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role);
    navigate(role === 'student' ? '/student/dashboard' : '/teacher/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="w-full max-w-md glass-morphism p-8 rounded-2xl shadow-2xl border border-white/40">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-xl mb-4 text-white shadow-lg">
            <GraduationCap size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">EduAdaptive AI</h1>
          <p className="text-gray-600">Adaptive Education Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                role === 'student' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'
              }`}
            >
              <UserCircle size={32} className={role === 'student' ? 'text-indigo-600' : 'text-gray-400'} />
              <span className={`mt-2 font-medium ${role === 'student' ? 'text-indigo-600' : 'text-gray-400'}`}>Student</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('teacher')}
              className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                role === 'teacher' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'
              }`}
            >
              <ShieldCheck size={32} className={role === 'teacher' ? 'text-indigo-600' : 'text-gray-400'} />
              <span className={`mt-2 font-medium ${role === 'teacher' ? 'text-indigo-600' : 'text-gray-400'}`}>Teacher</span>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-indigo-500/30 transition-all"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account? <a href="#/register" className="text-indigo-600 font-semibold underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
