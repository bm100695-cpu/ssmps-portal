import React, { useState, useEffect, useContext } from 'react';
import { Bell, Calendar, Info, AlertTriangle, FileText, Download } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const StudentNotices = () => {
    const { user } = useContext(AuthContext);
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                // Using the real backend API that the teacher posts to
                const { data } = await axios.get('/api/notices', config);
                setNotices(data);
            } catch (error) {
                console.error("Error fetching notices", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotices();
    }, [user.token]);

    const getIconForType = (type) => {
        switch (type) {
            case 'Important': return <AlertTriangle className="w-5 h-5 text-red-600" />;
            case 'Event': return <Calendar className="w-5 h-5 text-purple-600" />;
            default: return <Info className="w-5 h-5 text-blue-600" />;
        }
    };

    const getColorForType = (type) => {
        switch (type) {
            case 'Important': return 'border-red-500 bg-red-50';
            case 'Event': return 'border-purple-500 bg-purple-50';
            default: return 'border-blue-500 bg-blue-50';
        }
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">School Notices</h1>
                    <p className="text-sm text-gray-500 mt-1">Stay updated with the latest announcements and events.</p>
                </div>
                <div className="p-3 bg-primary-50 rounded-full text-primary-600 relative">
                    <Bell className="w-6 h-6" />
                    {notices.length > 0 && (
                        <span className="absolute top-1 right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
                    )}
                </div>
            </div>

            {loading ? (
                <div className="text-center py-10 text-gray-500">Loading latest notices...</div>
            ) : notices.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-gray-900">No New Notices</h3>
                    <p className="text-gray-500 mt-1">You're all caught up! There are no announcements at the moment.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {notices.map((notice) => (
                        <div key={notice._id} className={`bg-white rounded-xl shadow-sm border-l-4 ${getColorForType(notice.type)} p-5 sm:p-6 transition-all hover:shadow-md flex flex-col sm:flex-row gap-4`}>
                            <div className="flex-shrink-0 pt-1">
                                <div className="p-3 bg-white rounded-full shadow-sm border border-gray-100">
                                    {getIconForType(notice.type)}
                                </div>
                            </div>
                            <div className="flex-grow">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                                    <h2 className="text-lg font-bold text-gray-900">{notice.title}</h2>
                                    <span className="text-xs font-bold text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 w-fit">
                                        {new Date(notice.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm whitespace-pre-wrap">{notice.content}</p>
                                
                                {notice.attachment && (
                                    <button onClick={() => alert("Downloading notice attachment...")} className="mt-4 flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 bg-white border border-primary-200 px-4 py-2 rounded-lg w-fit transition-colors">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download Attachment
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

export default StudentNotices;
