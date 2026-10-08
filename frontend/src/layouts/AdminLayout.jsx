import React, { useContext, useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  Users, UserPlus, BookOpen, Truck, 
  DollarSign, FileText, Settings, LogOut, 
  LayoutDashboard, Menu, X, UserCircle, GraduationCap
} from 'lucide-react';

const AdminLayout = () => {
    const { user, loading, logout } = useContext(AuthContext);
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    if (!user || user.role !== 'Admin') {
        return <Navigate to="/login" />;
    }

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'All Users', href: '/admin/users', icon: Users },
        { name: 'Roles & Permissions', href: '/admin/roles', icon: Settings },
        { name: 'Students', href: '/admin/students', icon: GraduationCap },
        { name: 'Teachers/Staff', href: '/admin/staff', icon: UserCircle },
        { name: 'Parents', href: '/admin/parents', icon: Users },
        { name: 'Transport & Drivers', href: '/admin/transport', icon: Truck },
        { name: 'Academic Management', href: '/admin/academic', icon: BookOpen },
        { name: 'Fees & Finance', href: '/admin/finance', icon: DollarSign },
        { name: 'Notices & Communications', href: '/admin/notices', icon: FileText },
        { name: 'Reports & Analytics', href: '/admin/reports', icon: LayoutDashboard },
        { name: 'Website Management', href: '/admin/website', icon: Settings },
        { name: 'System Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between h-16 px-6 bg-primary-600 text-white">
                    <span className="text-2xl font-bold tracking-wider">Smart School</span>
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
                    <Link to="/admin/profile" className="flex items-center pb-4 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors">
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700 hover:text-primary-600">{user.fullName} (Edit Profile)</p>
                            <p className="text-xs font-medium text-gray-500">Administrator</p>
                        </div>
                    </Link>
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
                    <span className="text-xl font-semibold text-gray-800">Admin Panel</span>
                    <div className="w-6"></div> {/* Spacer for centering */}
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

export default AdminLayout;
