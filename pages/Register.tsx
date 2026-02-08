
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserRole } from '../types';
import { GraduationCap, ShieldCheck, UserCircle } from 'lucide-react';

interface RegisterProps {
  onRegister: (role: UserRole) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [role, setRole] = useState<UserRole>('student');
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(role);
    // Explicit redirection after "registration"
    if (role === 'student') {
      navigate('/student/onboarding');
    } else {
      navigate('/teacher/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
        <div className="text-center mb-8">
           <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-xl mb-4 text-white shadow-lg">
            <GraduationCap size={40} />
          </div>
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-gray-500">Join the next generation of education.</p>
        </div>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                role === 'student' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'
              }`}
            >
              <UserCircle size={28} className={role === 'student' ? 'text-indigo-600' : 'text-gray-400'} />
              <span className={`mt-2 text-xs font-bold ${role === 'student' ? 'text-indigo-600' : 'text-gray-400'}`}>Student</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('teacher')}
              className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                role === 'teacher' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'
              }`}
            >
              <ShieldCheck size={28} className={role === 'teacher' ? 'text-indigo-600' : 'text-gray-400'} />
              <span className={`mt-2 text-xs font-bold ${role === 'teacher' ? 'text-indigo-600' : 'text-gray-400'}`}>Teacher</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">First Name</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold" 
                placeholder="John" 
                onChange={e => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Last Name</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold" 
                placeholder="Doe" 
                onChange={e => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Email</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold" 
              placeholder="john@example.com" 
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold" 
              placeholder="••••••••" 
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 mt-4 hover:bg-indigo-700 transition-all">
            Join the Network
          </button>
        </form>
        
        <p className="mt-8 text-center text-gray-500 text-sm">
          Already have an account? <Link to="/login" className="text-indigo-600 font-bold underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
