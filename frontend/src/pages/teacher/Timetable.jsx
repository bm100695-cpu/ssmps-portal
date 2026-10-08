import React, { useState } from 'react';
import { Calendar, Clock, Plus, MoreVertical, X, Send } from 'lucide-react';

const Timetable = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ class: '', date: '', reason: '' });

    const handleReschedule = (e) => {
        e.preventDefault();
        alert("Reschedule request sent to Principal successfully!");
        setShowModal(false);
        setFormData({ class: '', date: '', reason: '' });
    };
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM'];

    // Dummy schedule data for Teacher
    const [schedule] = useState({
        'Monday': { '09:00 AM': { subject: 'Mathematics', class: '10-A', room: 'Room 101', color: 'bg-blue-100 text-blue-800 border-blue-200' }, '11:00 AM': { subject: 'Physics', class: '12-C', room: 'Lab 2', color: 'bg-purple-100 text-purple-800 border-purple-200' } },
        'Tuesday': { '10:00 AM': { subject: 'Mathematics', class: '10-B', room: 'Room 102', color: 'bg-blue-100 text-blue-800 border-blue-200' }, '01:00 PM': { subject: 'Science Lab', class: '9-A', room: 'Lab 1', color: 'bg-green-100 text-green-800 border-green-200' } },
        'Wednesday': { '09:00 AM': { subject: 'Physics', class: '11-B', room: 'Room 205', color: 'bg-purple-100 text-purple-800 border-purple-200' }, '12:00 PM': { subject: 'Mathematics', class: '10-A', room: 'Room 101', color: 'bg-blue-100 text-blue-800 border-blue-200' } },
        'Thursday': { '11:00 AM': { subject: 'Science Lab', class: '9-B', room: 'Lab 1', color: 'bg-green-100 text-green-800 border-green-200' }, '02:00 PM': { subject: 'Extra Class', class: '12-C', room: 'Room 304', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' } },
        'Friday': { '09:00 AM': { subject: 'Mathematics', class: '10-B', room: 'Room 102', color: 'bg-blue-100 text-blue-800 border-blue-200' }, '10:00 AM': { subject: 'Physics', class: '11-A', room: 'Room 201', color: 'bg-purple-100 text-purple-800 border-purple-200' } },
        'Saturday': { '10:00 AM': { subject: 'Doubt Session', class: 'All', room: 'Library', color: 'bg-gray-100 text-gray-800 border-gray-200' } },
    });

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Timetable</h1>
                    <p className="text-sm text-gray-500 mt-1">View your weekly class schedule and manage routines.</p>
                </div>
                <button onClick={() => setShowModal(true)} className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-md">
                    <Plus className="w-4 h-4 mr-2" />
                    Request Reschedule
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
                <div className="min-w-[800px]">
                    <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
                        <div className="p-4 border-r border-gray-200 flex items-center justify-center font-bold text-gray-500">
                            <Clock className="w-5 h-5 mr-2" /> Time
                        </div>
                        {days.map(day => (
                            <div key={day} className="p-4 border-r border-gray-200 last:border-r-0 text-center font-bold text-gray-800">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="divide-y divide-gray-100">
                        {timeSlots.map(time => (
                            <div key={time} className="grid grid-cols-7 hover:bg-gray-50 transition-colors">
                                <div className="p-4 border-r border-gray-200 text-center text-sm font-bold text-gray-500 flex items-center justify-center">
                                    {time}
                                </div>
                                {days.map(day => {
                                    const session = schedule[day] && schedule[day][time];
                                    return (
                                        <div key={`${day}-${time}`} className="p-2 border-r border-gray-200 last:border-r-0 h-32 relative group">
                                            {session ? (
                                                <div className={`h-full w-full rounded-lg border p-3 flex flex-col justify-between ${session.color} cursor-pointer hover:shadow-md transition-shadow`}>
                                                    <div>
                                                        <p className="font-bold text-sm leading-tight mb-1">{session.subject}</p>
                                                        <p className="text-xs opacity-90 font-medium">Class: {session.class}</p>
                                                    </div>
                                                    <div className="flex justify-between items-end">
                                                        <p className="text-xs opacity-80 font-bold">{session.room}</p>
                                                        <button className="opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical className="w-4 h-4" /></button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 rounded-full bg-gray-100 text-gray-400 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reschedule Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
                            <h3 className="font-bold text-gray-900">Request Class Reschedule</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5"/></button>
                        </div>
                        <form onSubmit={handleReschedule} className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Select Class / Subject</label>
                                <select required value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500">
                                    <option value="">Select a class...</option>
                                    <option>10-A (Mathematics)</option>
                                    <option>11-B (Physics)</option>
                                    <option>9-B (Science Lab)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Proposed Date & Time</label>
                                <input required type="datetime-local" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Reschedule</label>
                                <textarea required rows="3" value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500" placeholder="E.g., Unexpected urgent meeting..."></textarea>
                            </div>
                            <button type="submit" className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
                                <Send className="w-4 h-4 mr-2" /> Submit Request
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Timetable;
