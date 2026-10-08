import React, { useContext, useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  BookOpen, CalendarCheck, FileText, 
  Clock, MapPin, User, LogOut, 
  LayoutDashboard, Menu, X, Award, Activity, Bell
} from 'lucide-react';

const StudentLayout = () => {
    const { user, loading, logout } = useContext(AuthContext);
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    if (!user || user.role !== 'Student') {
        return <Navigate to="/login" />;
    }

    const navigation = [
        { name: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
        { name: 'Attendance', href: '/student/attendance', icon: CalendarCheck },
        { name: 'Homework', href: '/student/homework', icon: BookOpen },
        { name: 'Timetable', href: '/student/timetable', icon: Clock },
        { name: 'Result', href: '/student/results', icon: Award },
        { name: 'Transport', href: '/student/transport', icon: MapPin },
        { name: 'My ID Card', href: '/student/id-card', icon: User },
        { name: 'Material', href: '/student/material', icon: FileText },
        { name: 'Notices', href: '/student/notices', icon: FileText },
        { name: 'Activity', href: '/student/activity', icon: Activity },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between h-16 px-6 bg-primary-600 text-white border-b border-primary-700">
                    <span className="text-xl font-bold tracking-wider">Student Portal</span>
                    <button className="lg:hidden text-primary-100 hover:text-white" onClick={() => setSidebarOpen(false)}>
                        <X size={24} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-4">
                    <nav className="space-y-1">
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
                                    <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
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
                            <p className="text-xs font-medium text-gray-500">Student</p>
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
                <header className="flex items-center justify-between h-16 px-6 bg-white shadow-sm">
                    <div className="flex items-center">
                        <button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-gray-700 focus:outline-none lg:hidden mr-4">
                            <Menu size={24} />
                        </button>
                        <span className="text-xl font-semibold text-gray-800 hidden sm:block">Student Panel</span>
                    </div>
                    
                    <div className="relative">
                        <button 
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors focus:outline-none"
                        >
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* Notification Dropdown */}
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-50 animate-in slide-in-from-top-2 duration-200">
                                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                                    <h3 className="font-bold text-gray-900">Notifications</h3>
                                    <span className="text-xs text-primary-600 font-medium cursor-pointer">Mark all read</span>
                                </div>
                                <div className="max-h-80 overflow-y-auto">
                                    <div className="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                                        <p className="text-sm font-bold text-gray-800">Holiday Tomorrow</p>
                                        <p className="text-xs text-gray-500 mt-1">School will remain closed tomorrow due to heavy rain.</p>
                                        <p className="text-[10px] text-gray-400 mt-2">Just now</p>
                                    </div>
                                    <div className="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                                        <p className="text-sm font-bold text-gray-800">Math Homework Uploaded</p>
                                        <p className="text-xs text-gray-500 mt-1">Mr. Sharma has uploaded the Trignometry assignment.</p>
                                        <p className="text-[10px] text-gray-400 mt-2">2 hours ago</p>
                                    </div>
                                    <div className="p-4 hover:bg-gray-50 cursor-pointer">
                                        <p className="text-sm font-bold text-gray-800">Mid-Term Results</p>
                                        <p className="text-xs text-gray-500 mt-1">Your Mid-Term results have been published!</p>
                                        <p className="text-[10px] text-gray-400 mt-2">Yesterday</p>
                                    </div>
                                </div>
                                <div className="p-3 border-t border-gray-100 text-center">
                                    <Link to="/student/notices" onClick={() => setShowNotifications(false)} className="text-sm text-primary-600 font-bold hover:text-primary-700">View All Notices</Link>
                                </div>
                            </div>
                        )}
                    </div>
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

export default StudentLayout;
