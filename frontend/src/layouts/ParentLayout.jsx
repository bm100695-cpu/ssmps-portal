import React, { useContext, useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  User, CalendarCheck, BookOpen, CreditCard, 
  MapPin, MessageSquare, Bell, LogOut, 
  LayoutDashboard, Menu, X 
} from 'lucide-react';

const ParentLayout = () => {
    const { user, loading, logout } = useContext(AuthContext);
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    if (!user || user.role !== 'Parent') {
        return <Navigate to="/login" />;
    }

    const navigation = [
        { name: 'Dashboard', href: '/parent/dashboard', icon: LayoutDashboard },
        { name: 'My Child', href: '/parent/child', icon: User },
        { name: 'Attendance', href: '/parent/attendance', icon: CalendarCheck },
        { name: 'Homework', href: '/parent/homework', icon: BookOpen },
        { name: 'Fees/Payment', href: '/parent/fees', icon: CreditCard },
        { name: 'Transport Tracking', href: '/parent/transport', icon: MapPin },
        { name: 'Messages', href: '/parent/messages', icon: MessageSquare },
        { name: 'Notices', href: '/parent/notices', icon: Bell },
        { name: 'My Profile', href: '/parent/profile', icon: User },
    ];

    return (
        <div className="flex h-screen bg-indigo-50">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between h-16 px-6 bg-primary-600 text-white border-b border-primary-700">
                    <span className="text-xl font-bold tracking-wider">Parent Portal</span>
                    <button className="lg:hidden text-primary-100 hover:text-white" onClick={() => setSidebarOpen(false)}>
                        <X size={24} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-6">
                    <nav className="space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                                        isActive 
                                        ? 'bg-primary-50 text-primary-700' 
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                                    }`}
                                >
                                    <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center pb-4">
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-800">{user.fullName}</p>
                            <p className="text-xs font-medium text-gray-500">Parent</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex items-center justify-between h-16 px-6 bg-white shadow-sm lg:hidden border-b border-gray-100">
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-indigo-600 focus:outline-none">
                        <Menu size={24} />
                    </button>
                    <span className="text-xl font-semibold text-indigo-900">Parent Dashboard</span>
                    <div className="w-6"></div>
                </header>
                
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
            
            {/* Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default ParentLayout;
