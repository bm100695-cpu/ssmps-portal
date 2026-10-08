import React, { useContext, useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  Bus, Map, Navigation, 
  Users, AlertTriangle, History, LogOut, 
  LayoutDashboard, Menu, X 
} from 'lucide-react';

const DriverLayout = () => {
    const { user, loading, logout } = useContext(AuthContext);
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    if (!user || user.role !== 'Driver') {
        return <Navigate to="/login" />;
    }

    const navigation = [
        { name: 'Dashboard', href: '/driver/dashboard', icon: LayoutDashboard },
        { name: 'My Bus', href: '/driver/my-bus', icon: Bus },
        { name: 'My Route', href: '/driver/route', icon: Map },
        { name: 'Live Tracking', href: '/driver/tracking', icon: Navigation },
        { name: 'Trip Management', href: '/driver/trip', icon: Map },
        { name: 'Student Pickup/Drop', href: '/driver/students', icon: Users },
        { name: 'Notification', href: '/driver/notifications', icon: AlertTriangle },
        { name: 'Report an Issue', href: '/driver/report', icon: AlertTriangle },
        { name: 'Trip History', href: '/driver/history', icon: History },
        { name: 'My Profile', href: '/driver/profile', icon: Users },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between h-16 px-6 bg-primary-700 text-white border-b border-primary-800">
                    <span className="text-xl font-extrabold tracking-wider">Driver Portal</span>
                    <button className="lg:hidden text-primary-200 hover:text-white" onClick={() => setSidebarOpen(false)}>
                        <X size={24} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-6 bg-primary-900">
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
                                        ? 'bg-primary-800 text-white' 
                                        : 'text-primary-300 hover:bg-primary-800 hover:text-white'
                                    }`}
                                >
                                    <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-400' : 'text-primary-500'}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="p-4 bg-primary-950 border-t border-primary-800">
                    <div className="flex items-center pb-4">
                        <div className="ml-3">
                            <p className="text-sm font-medium text-primary-200">{user.fullName}</p>
                            <p className="text-xs font-medium text-primary-400">Driver</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-2 text-sm font-medium text-white bg-primary-800 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
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
                    <span className="text-xl font-semibold text-gray-800">Driver Dashboard</span>
                    <div className="w-6"></div>
                </header>
                
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    <Outlet />
                </main>
            </div>
            
            {/* Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-primary-900 bg-opacity-75 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default DriverLayout;
