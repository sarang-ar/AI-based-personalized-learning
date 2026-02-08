
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Brain, Shield, Globe, GraduationCap, ChevronRight } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <GraduationCap className="text-indigo-600" size={32} />
          <span className="text-2xl font-bold tracking-tight">EduAdaptive AI</span>
        </div>
        <div className="flex gap-8 items-center">
          <Link to="/login" className="font-bold text-gray-600 hover:text-indigo-600">Sign In</Link>
          <Link to="/register" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">Get Started</Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full font-bold text-sm mb-8 animate-bounce">
          <Sparkles size={16} />
          Now with Gemini 3 Pro Support
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8">
          Education <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Tailored</span> to You.
        </h1>
        
        <p className="text-xl text-gray-500 max-w-3xl mb-12 leading-relaxed">
          The first AI-driven institution-ready platform that adapts to your unique learning style, interests, and academic pace. From proctored exams to personalized micro-projects.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 mb-20">
          <Link 
            to="/register" 
            className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-200 hover:-translate-y-1 transition-all flex items-center gap-2"
          >
            Start Learning Now <ChevronRight size={20} />
          </Link>
          <a href="#features" className="px-10 py-5 bg-white border-2 border-gray-100 text-gray-900 rounded-2xl font-bold text-lg hover:border-gray-300 transition-all">
            See Features
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full" id="features">
          {[
            { 
              title: "AI-Powered Proctoring", 
              desc: "MediaPipe-driven behavioral analysis for 100% integrity during high-stakes exams.",
              icon: Shield,
              color: "bg-blue-50 text-blue-600"
            },
            { 
              title: "Adaptive Learning Paths", 
              desc: "Courses dynamically adjust content difficulty based on your quiz performance.",
              icon: Brain,
              color: "bg-purple-50 text-purple-600"
            },
            { 
              title: "Global Classroom Hub", 
              desc: "Join institutional classrooms with ease and collaborate globally with smart peer groups.",
              icon: Globe,
              color: "bg-orange-50 text-orange-600"
            }
          ].map((feature, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-gray-50 text-left hover:bg-white hover:shadow-2xl transition-all group">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                <feature.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Landing;
