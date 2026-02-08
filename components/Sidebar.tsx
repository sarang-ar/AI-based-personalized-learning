
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageSquare, 
  Terminal, 
  StickyNote, 
  Compass, 
  Briefcase, 
  Users, 
  LogOut,
  GraduationCap,
  PlusCircle,
  RefreshCcw,
  Search,
  ClipboardList,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  User as UserIcon
} from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  user: User;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const studentLinks = [
    { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { name: 'My Learning', path: '/student/my-learning', icon: BookOpen },
    { name: 'Exams', path: '/student/exams', icon: ClipboardList },
    { name: 'Revision Hub', path: '/student/revision', icon: RefreshCcw },
    { name: 'Topic Explorer', path: '/student/topic-explorer', icon: Search },
    { name: 'AI Tutor', path: '/student/tutor', icon: MessageSquare },
    { name: 'Compiler', path: '/student/compiler', icon: Terminal },
    { name: 'Notebook', path: '/student/notebook', icon: StickyNote },
    { name: 'Classrooms', path: '/student/classrooms', icon: Users },
    { name: 'Course Advisor', path: '/student/course-advisor', icon: Compass },
    { name: 'Opportunities', path: '/student/opportunities', icon: Briefcase },
  ];

  const teacherLinks = [
    { name: 'Dashboard', path: '/teacher/dashboard', icon: LayoutDashboard },
    { name: 'My Courses', path: '/teacher/my-courses', icon: BookOpen },
    { name: 'Classrooms', path: '/teacher/classrooms', icon: Users },
    { name: 'Create Course', path: '/teacher/my-courses/create', icon: PlusCircle },
    { name: 'Profile', path: '/teacher/profile', icon: UserIcon },
  ];

  const links = user.role === 'student' ? studentLinks : teacherLinks;

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={toggleMobile}
        className="fixed top-4 left-4 z-[60] p-2 bg-indigo-900 text-white rounded-lg md:hidden shadow-lg"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[50] md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 bg-indigo-900 text-white flex flex-col shadow-xl z-50 transition-all duration-300
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}>
        <div className="p-6 flex items-center justify-between border-b border-indigo-800/50">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <GraduationCap size={32} className="text-indigo-400" />
              <span className="font-bold text-xl tracking-tight">EduAdaptive</span>
            </div>
          )}
          {isCollapsed && <GraduationCap size={32} className="text-indigo-400 mx-auto" />}
          
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1 hover:bg-indigo-800 rounded-md text-indigo-300"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto no-scrollbar">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                title={isCollapsed ? link.name : ""}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-200 hover:bg-indigo-800/50'
                }`}
              >
                <Icon size={20} className="shrink-0" />
                {!isCollapsed && <span className="font-medium whitespace-nowrap">{link.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-indigo-800 space-y-4">
          <Link 
            to={user.role === 'student' ? '/student/profile' : '/teacher/profile'}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-indigo-800 transition-all cursor-pointer ${isCollapsed ? 'justify-center' : ''}`}
          >
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold shrink-0 shadow-inner">
              {user?.name?.[0] || '?'}
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate">{user?.name || 'Anonymous'}</p>
                <p className="text-xs text-indigo-300 capitalize">{user?.role}</p>
              </div>
            )}
          </Link>
          <button
            onClick={onLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-red-900/30 rounded-xl transition-colors ${isCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={20} className="shrink-0" />
            {!isCollapsed && <span className="font-medium">Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
