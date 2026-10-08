import React, { useContext, useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  BookOpen, CalendarCheck, CheckSquare, 
  FileText, Bell, User, LogOut, 
  LayoutDashboard, Menu, X 
} from 'lucide-react';

const TeacherLayout = () => {
    const { user, loading, logout } = useContext(AuthContext);
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    if (!user || user.role !== 'Teacher') {
        return <Navigate to="/login" />;
    }

    const navigation = [
        { name: 'Dashboard', href: '/teacher/dashboard', icon: LayoutDashboard },
        { name: 'My Class', href: '/teacher/my-class', icon: User },
        { name: 'Attendance', href: '/teacher/attendance', icon: CalendarCheck },
        { name: 'Homework', href: '/teacher/homework', icon: BookOpen },
        { name: 'Marks & Result', href: '/teacher/marks', icon: CheckSquare },
        { name: 'Timetable', href: '/teacher/timetable', icon: CalendarCheck },
        { name: 'Notices', href: '/teacher/notices', icon: Bell },
        { name: 'My Profile', href: '/teacher/profile', icon: FileText },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between h-16 px-6 bg-primary-600 text-white">
                    <span className="text-xl font-bold tracking-wider">Teacher Portal</span>
                    <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                        <X size={24} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-4">
                    <nav className="space-y-2">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                        isActive 
                                        ? 'bg-primary-50 text-primary-700' 
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-700' : 'text-gray-400'}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center pb-4">
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700">{user.fullName}</p>
                            <p className="text-xs font-medium text-gray-500">Teacher</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex items-center justify-between h-16 px-6 bg-white shadow-sm lg:hidden">
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <Menu size={24} />
                    </button>
                    <span className="text-xl font-semibold text-gray-800">Teacher Panel</span>
                    <div className="w-6"></div> {/* Spacer */}
                </header>
                
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    <Outlet />
                </main>
            </div>
            
            {/* Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default TeacherLayout;
