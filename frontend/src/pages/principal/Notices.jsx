import React, { useState, useEffect, useContext } from 'react';
import { Megaphone, Send, Users, User, GraduationCap, CheckCircle, Clock } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const PrincipalNotices = () => {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [targetAudience, setTargetAudience] = useState('All');
    const [notices, setNotices] = useState([]);

    const fetchNotices = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('/api/notices', config);
            setNotices(data);
        } catch (error) {
            console.error('Error fetching notices', error);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    const handlePublish = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            alert("Title and Content cannot be empty!");
            return;
        }

        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('/api/notices', {
                title,
                content,
                audience: targetAudience,
                type: 'Announcement'
            }, config);
            
            setTitle('');
            setContent('');
            alert("Notice published successfully!");
            fetchNotices();
        } catch (error) {
            alert(error.response?.data?.message || 'Error publishing notice');
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Megaphone className="w-6 h-6 mr-2 text-primary-600" /> School Notices & Announcements
                </h1>
                <p className="text-sm text-gray-500 mt-1">Publish circulars to students, parents, and teachers directly.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Create Notice Form */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit">
                    <h2 className="font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Create New Notice</h2>
                    
                    <form onSubmit={handlePublish} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Notice Title</label>
                            <input 
                                type="text" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="e.g. Holiday Declaration"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Target Audience</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {['All', 'Students', 'Parents', 'Teachers'].map(type => (
                                    <div 
                                        key={type}
                                        onClick={() => setTargetAudience(type)}
                                        className={`cursor-pointer flex flex-col items-center justify-center p-3 rounded-xl border text-sm font-bold transition-all ${
                                            targetAudience === type 
                                            ? 'bg-primary-50 border-primary-500 text-primary-700 shadow-sm' 
                                            : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                                        }`}
                                    >
                                        {type === 'All' && <Megaphone className="w-5 h-5 mb-1" />}
                                        {type === 'Students' && <GraduationCap className="w-5 h-5 mb-1" />}
                                        {type === 'Parents' && <Users className="w-5 h-5 mb-1" />}
                                        {type === 'Teachers' && <User className="w-5 h-5 mb-1" />}
                                        {type}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Message Content</label>
                            <textarea 
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                                placeholder="Write your announcement here..."
                            ></textarea>
                        </div>

                        <button type="submit" className="w-full flex items-center justify-center py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-black transition-colors shadow-sm">
                            <Send className="w-4 h-4 mr-2" /> Publish Notice Now
                        </button>
                    </form>
                </div>

                {/* Published Notices List */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-[600px]">
                    <h2 className="font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Recently Published</h2>
                    
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                        {notices.map(notice => (
                            <div key={notice._id} className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-sm transition-all group">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-900 pr-4">{notice.title}</h3>
                                    <span className={`shrink-0 inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                        notice.audience === 'All' ? 'bg-primary-100 text-primary-700' :
                                        notice.audience === 'Parents' ? 'bg-orange-100 text-orange-700' :
                                        notice.audience === 'Teachers' ? 'bg-blue-100 text-blue-700' :
                                        'bg-green-100 text-green-700'
                                    }`}>
                                        {notice.audience || notice.type}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">{notice.content}</p>
                                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                    <span className="text-xs font-bold text-gray-400 flex items-center">
                                        <Clock className="w-3 h-3 mr-1" /> Published: {new Date(notice.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </span>
                                    <button className="text-xs font-bold text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PrincipalNotices;
