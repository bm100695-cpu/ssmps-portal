import React, { useState, useEffect, useContext } from 'react';
import { Bell, Megaphone, Calendar, X, Plus } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Notices = () => {
    const { user } = useContext(AuthContext);
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ title: '', type: 'Announcement', content: '' });

    const fetchNotices = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('/api/notices', config);
            setNotices(data);
        } catch (error) {
            console.error("Error fetching notices", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    const handleCreateNotice = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('/api/notices', formData, config);
            setShowModal(false);
            setFormData({ title: '', type: 'Announcement', content: '' });
            fetchNotices(); // Refresh list
        } catch (error) {
            alert(error.response?.data?.message || 'Error creating notice');
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Notice Board</h1>
                    <p className="text-sm text-gray-500 mt-1">Stay updated with latest announcements.</p>
                </div>
                <button onClick={() => setShowModal(true)} className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-md">
                    <Megaphone className="w-4 h-4 mr-2" />
                    Post Notice
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? <p>Loading notices...</p> : notices.length === 0 ? <p className="text-gray-500">No notices available.</p> : notices.map((notice) => (
                    <div key={notice._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                notice.type === 'Event' ? 'bg-purple-100 text-purple-800' :
                                notice.type === 'Announcement' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'
                            }`}>
                                {notice.type}
                            </span>
                            <div className="flex items-center text-xs text-gray-400 font-medium">
                                <Calendar className="w-3.5 h-3.5 mr-1" />
                                {new Date(notice.date).toLocaleDateString()}
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{notice.title}</h3>
                        <p className="text-gray-600 text-sm flex-1">{notice.content}</p>
                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                            <button className="text-primary-600 text-sm font-medium hover:text-primary-800 flex items-center">
                                Read Full Notice <Bell className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Notice Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
                            <h3 className="font-bold text-gray-900">Post New Notice</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5"/></button>
                        </div>
                        <form onSubmit={handleCreateNotice} className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500" placeholder="Notice Title" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500">
                                    <option>Announcement</option>
                                    <option>Event</option>
                                    <option>Holiday</option>
                                    <option>Exam</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                                <textarea required rows="4" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500" placeholder="Write notice content here..."></textarea>
                            </div>
                            <button type="submit" className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
                                <Plus className="w-4 h-4 mr-2" /> Publish Notice
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notices;
