import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Bell, Megaphone, Send, Clock, AlertCircle, Info, Plus, Mail } from 'lucide-react';

const Notices = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user: currentUser } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', type: 'General', content: '' });

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
            const { data } = await axios.get('/api/notices', config);
            setNotices(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching notices:', error);
            setLoading(false);
        }
    };

    const handleCreateNotice = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
            await axios.post('/api/notices', formData, config);
            setIsModalOpen(false);
            setFormData({ title: '', type: 'General', content: '' });
            fetchNotices();
        } catch (error) {
            alert(error.response?.data?.message || 'Error creating notice');
        }
    };

    const getIconForType = (type) => {
        switch(type) {
            case 'Urgent': return <AlertCircle className="w-5 h-5 text-red-500" />;
            case 'Event': return <Bell className="w-5 h-5 text-orange-500" />;
            case 'Academic': return <Info className="w-5 h-5 text-blue-500" />;
            default: return <Megaphone className="w-5 h-5 text-emerald-500" />;
        }
    };

    const getColorForType = (type) => {
        switch(type) {
            case 'Urgent': return 'bg-red-50 border-red-200 text-red-800';
            case 'Event': return 'bg-orange-50 border-orange-200 text-orange-800';
            case 'Academic': return 'bg-blue-50 border-blue-200 text-blue-800';
            default: return 'bg-emerald-50 border-emerald-200 text-emerald-800';
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
        </div>
    );

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            {/* Premium Header */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-800 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"></div>
                <div className="absolute left-10 bottom-0 w-40 h-40 bg-purple-400 opacity-20 rounded-full blur-2xl transform translate-y-1/2"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <p className="text-purple-200 font-bold tracking-wider uppercase text-sm mb-1 flex items-center">
                            <Mail className="w-4 h-4 mr-2" /> Communications Hub
                        </p>
                        <h1 className="text-3xl md:text-4xl font-black mb-2">Notices & Announcements</h1>
                        <p className="text-purple-100 font-medium opacity-90 max-w-xl">
                            Broadcast important updates to students, parents, and staff instantly across the entire platform.
                        </p>
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="px-6 py-3 bg-white text-indigo-800 hover:bg-indigo-50 rounded-xl font-black transition-all flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        <Send className="w-5 h-5 mr-2" /> Publish Notice
                    </button>
                </div>
            </div>

            {/* Notices Board */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                    <h2 className="text-2xl font-black text-gray-900 flex items-center">
                        <Megaphone className="w-6 h-6 mr-3 text-indigo-600" /> Notice Board
                    </h2>
                    <span className="bg-indigo-50 text-indigo-700 font-black text-xs px-3 py-1.5 rounded-lg border border-indigo-100">
                        Total: {notices.length}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {notices.length === 0 ? (
                        <div className="col-span-full p-12 text-center text-gray-400 font-bold bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                            No notices published yet. Click 'Publish Notice' to create one.
                        </div>
                    ) : notices.map(notice => (
                        <div key={notice._id} className="group relative bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border flex items-center ${getColorForType(notice.type)}`}>
                                    <span className="mr-1">{getIconForType(notice.type)}</span> {notice.type}
                                </div>
                                <div className="text-xs font-bold text-gray-400 flex items-center bg-gray-50 px-2 py-1 rounded-md">
                                    <Clock className="w-3 h-3 mr-1" /> 
                                    {new Date(notice.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-indigo-700 transition-colors">
                                {notice.title}
                            </h3>
                            
                            <p className="text-sm text-gray-600 font-medium leading-relaxed mb-4 line-clamp-3">
                                {notice.content}
                            </p>

                            <div className="pt-4 mt-auto border-t border-gray-50 flex items-center justify-between">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Published By Admin</span>
                                <button className="text-indigo-600 font-bold text-sm flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    View Full <ArrowRight className="w-4 h-4 ml-1" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Publish Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl w-full max-w-xl p-8 shadow-2xl transform scale-100 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center">
                                <Send className="w-6 h-6 mr-2 text-indigo-600" /> Publish New Notice
                            </h2>
                        </div>
                        <form onSubmit={handleCreateNotice} className="space-y-5">
                            <div>
                                <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1.5">Notice Title</label>
                                <input required type="text" placeholder="E.g., Annual Sports Day 2026" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all font-bold text-gray-900" />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1.5">Category</label>
                                <select required value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all font-bold text-gray-900">
                                    <option value="General">General Announcement</option>
                                    <option value="Academic">Academic</option>
                                    <option value="Event">Event / Celebration</option>
                                    <option value="Urgent">Urgent / Emergency</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1.5">Notice Content</label>
                                <textarea required rows={5} placeholder="Write the complete notice message here..." value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all font-medium text-gray-800 resize-none"></textarea>
                            </div>
                            
                            <div className="flex gap-3 mt-8">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-gray-700 bg-gray-100 font-black rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 py-3 text-white bg-indigo-600 font-black rounded-xl hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all flex items-center justify-center">
                                    <Send className="w-5 h-5 mr-2" /> Publish Now
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// Simple ArrowRight icon component since I didn't import it in the lucide-react import
const ArrowRight = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 12h14"></path>
        <path d="m12 5 7 7-7 7"></path>
    </svg>
);

export default Notices;
