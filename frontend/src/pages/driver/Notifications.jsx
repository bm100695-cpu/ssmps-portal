import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const DriverNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    // Fetch messages sent by parents from localStorage (simulated backend)
    useEffect(() => {
        const fetchNotifications = () => {
            const data = JSON.parse(localStorage.getItem('transport_issues') || '[]');
            setNotifications(data);
        };
        
        fetchNotifications();
        
        // Listen for updates if same browser
        window.addEventListener('storage', fetchNotifications);
        return () => window.removeEventListener('storage', fetchNotifications);
    }, []);

    const markAsRead = (id) => {
        const updated = notifications.map(notif => 
            notif.id === id ? { ...notif, status: 'Read' } : notif
        );
        setNotifications(updated);
        localStorage.setItem('transport_issues', JSON.stringify(updated));
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Parent Notifications</h1>
                    <p className="text-sm text-gray-500 mt-1">Live messages and delay reports from parents.</p>
                </div>
                <div className="p-3 bg-red-50 rounded-full text-red-600 relative">
                    <Bell className="w-6 h-6" />
                    {notifications.some(n => n.status === 'Unread') && (
                        <span className="absolute top-1 right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
                    )}
                </div>
            </div>

            {notifications.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-gray-900">All Clear!</h3>
                    <p className="text-gray-500 mt-1">No pending messages or issues from parents.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {notifications.map((notif) => (
                        <div key={notif.id} className={`bg-white rounded-xl shadow-sm border-l-4 p-5 sm:p-6 transition-all flex flex-col sm:flex-row gap-4 ${
                            notif.status === 'Unread' ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}>
                            <div className="flex-shrink-0 pt-1">
                                <div className={`p-3 rounded-full shadow-sm border border-gray-100 ${notif.status === 'Unread' ? 'bg-white' : 'bg-gray-50'}`}>
                                    <AlertTriangle className={`w-5 h-5 ${notif.status === 'Unread' ? 'text-red-600' : 'text-gray-400'}`} />
                                </div>
                            </div>
                            <div className="flex-grow">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                                    <h2 className="text-lg font-bold text-gray-900">{notif.parentName}</h2>
                                    <span className="text-xs font-bold text-gray-500 flex items-center">
                                        <Clock className="w-3.5 h-3.5 mr-1" /> {notif.time}
                                    </span>
                                </div>
                                <p className="text-sm font-bold text-gray-600 mb-1">Route: {notif.route}</p>
                                <p className={`text-sm ${notif.status === 'Unread' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>"{notif.message}"</p>
                                
                                {notif.status === 'Unread' && (
                                    <button onClick={() => markAsRead(notif.id)} className="mt-4 flex items-center text-xs font-bold text-green-600 hover:text-green-800 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200 transition-colors">
                                        <CheckCircle className="w-3 h-3 mr-1" /> Mark as Acknowledged
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DriverNotifications;
