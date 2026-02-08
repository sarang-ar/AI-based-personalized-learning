
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { User, UserRole } from './types';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/student/Dashboard';
import Onboarding from './pages/student/Onboarding';
import MyLearning from './pages/student/MyLearning';
import PathGenerator from './pages/student/PathGenerator';
import CourseView from './pages/student/CourseView';
import Tutor from './pages/student/Tutor';
import Compiler from './pages/student/Compiler';
import Notebook from './pages/student/Notebook';
import Opportunities from './pages/student/Opportunities';
import CourseAdvisor from './pages/student/CourseAdvisor';
import StudentClassrooms from './pages/student/Classrooms';
import StudentClassroomDetail from './pages/student/ClassroomDetail';
import ClassroomExams from './pages/student/ClassroomExams';
import Exams from './pages/student/Exams';
import ExamDetails from './pages/student/ExamDetails';
import ExamSetup from './pages/student/ExamSetup';
import ExamMode1 from './pages/student/ExamMode1';
import ExamMode2 from './pages/student/ExamMode2';
import ExamMode3 from './pages/student/ExamMode3';
import SmartRevision from './pages/student/SmartRevision';
import TopicExplorer from './pages/student/TopicExplorer';
import Profile from './pages/student/Profile';

import TeacherDashboard from './pages/teacher/Dashboard';
import MyCourses from './pages/teacher/MyCourses';
import TeacherClassrooms from './pages/teacher/TeacherClassrooms';
import CreateCourse from './pages/teacher/CreateCourse';
import TeacherClassroomDetail from './pages/teacher/TeacherClassroomDetail';
import TeacherProfile from './pages/teacher/TeacherProfile';

import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (role: UserRole) => {
    const onboarded = localStorage.getItem('onboarded') === 'true';
    const mockUser: User = {
      id: '1',
      email: `${role}@eduadaptive.com`,
      name: role === 'student' ? 'Alex Student' : 'Dr. Smith',
      role,
      isOnboarded: role === 'teacher' || onboarded,
      skills: ['React', 'Python', 'ML', 'Tailwind']
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.location.hash = '#/';
  };

  if (user?.role === 'student' && !user.isOnboarded) {
    return (
      <HashRouter>
        <Routes>
          <Route path="/student/onboarding" element={<Onboarding onComplete={() => setUser(u => u ? {...u, isOnboarded: true} : null)} />} />
          <Route path="*" element={<Navigate to="/student/onboarding" />} />
        </Routes>
      </HashRouter>
    );
  }

  return (
    <HashRouter>
      <div className="min-h-screen flex bg-gray-50 overflow-x-hidden">
        {user && <Sidebar user={user} onLogout={logout} />}
        <main className={`flex-1 transition-all duration-300 w-full ${user ? 'md:ml-64' : ''}`}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path="/register" element={<Register onRegister={login} />} />

            {user?.role === 'student' && (
              <>
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/my-learning" element={<MyLearning />} />
                <Route path="/student/generate-path" element={<PathGenerator />} />
                <Route path="/student/my-learning/:id" element={<CourseView />} />
                <Route path="/student/tutor" element={<Tutor />} />
                <Route path="/student/compiler" element={<Compiler />} />
                <Route path="/student/notebook" element={<Notebook />} />
                <Route path="/student/opportunities" element={<Opportunities />} />
                <Route path="/student/course-advisor" element={<CourseAdvisor />} />
                <Route path="/student/classrooms" element={<StudentClassrooms />} />
                <Route path="/student/classrooms/:id" element={<StudentClassroomDetail />} />
                <Route path="/student/classrooms/:id/exams" element={<ClassroomExams />} />
                <Route path="/student/exams" element={<Exams />} />
                <Route path="/student/exam/:id/details" element={<ExamDetails />} />
                <Route path="/student/exam/:id/setup" element={<ExamSetup />} />
                <Route path="/student/exam/:id/mode1" element={<ExamMode1 />} />
                <Route path="/student/exam/:id/mode2" element={<ExamMode2 />} />
                <Route path="/student/exam/:id/mode3" element={<ExamMode3 />} />
                <Route path="/student/revision" element={<SmartRevision />} />
                <Route path="/student/topic-explorer" element={<TopicExplorer />} />
                <Route path="/student/profile" element={<Profile />} />
              </>
            )}

            {user?.role === 'teacher' && (
              <>
                <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
                <Route path="/teacher/my-courses" element={<MyCourses />} />
                <Route path="/teacher/my-courses/create" element={<CreateCourse />} />
                <Route path="/teacher/my-courses/:id/builder" element={<CreateCourse />} />
                <Route path="/teacher/classrooms" element={<TeacherClassrooms />} />
                <Route path="/teacher/classrooms/:id" element={<TeacherClassroomDetail />} />
                <Route path="/teacher/profile" element={<TeacherProfile />} />
              </>
            )}

            <Route path="*" element={<Navigate to={user ? (user.role === 'student' ? '/student/dashboard' : '/teacher/dashboard') : '/'} />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
