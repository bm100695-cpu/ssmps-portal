import React, { useState } from 'react';
import { Calendar as CalendarIcon, CheckCircle, XCircle, AlertCircle, TrendingUp, X, Send } from 'lucide-react';

const StudentAttendance = () => {
    // Current month dummy data
    const daysInMonth = new Date(2026, 10, 0).getDate(); // October 2026
    const firstDay = new Date(2026, 9, 1).getDay(); // Day of week for Oct 1, 2026

    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [leaveData, setLeaveData] = useState({ type: 'Sick Leave', fromDate: '', toDate: '', reason: '' });
    
    // State to track submitted leave applications
    const [leaveApplications, setLeaveApplications] = useState([
        { id: 1, type: 'Family Event', date: 'Oct 30 - Oct 31, 2026', status: 'Approved' },
        { id: 2, type: 'Medical Emergency', date: 'Sep 15, 2026', status: 'Approved' },
        { id: 3, type: 'Other Reason', date: 'Aug 02, 2026', status: 'Rejected' },
    ]);
    const [attendanceData] = useState(() => {
        const data = {};
        for (let i = 1; i <= 28; i++) { // Current day is 28th
            const dayOfWeek = new Date(2026, 9, i).getDay();
            if (dayOfWeek === 0) { // Sunday
                data[i] = 'Holiday';
            } else if (i === 12 || i === 24) {
                data[i] = 'Absent';
            } else if (i === 5) {
                data[i] = 'Late';
            } else {
                data[i] = 'Present';
            }
        }
        return data;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Present': return 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200';
            case 'Absent': return 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200';
            case 'Late': return 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200';
            case 'Holiday': return 'bg-gray-100 text-gray-500 border-gray-200';
            default: return 'bg-white text-gray-400 border-gray-100 hover:bg-gray-50';
        }
    };

    const handleApplyLeave = (e) => {
        e.preventDefault();
        
        const newLeave = {
            id: leaveApplications.length + 1,
            type: leaveData.type,
            date: `${leaveData.fromDate} to ${leaveData.toDate}`,
            status: 'Pending (Awaiting Teacher Approval)'
        };
        
        setLeaveApplications([newLeave, ...leaveApplications]);
        alert(`Your leave application from ${leaveData.fromDate} to ${leaveData.toDate} has been submitted to your Class Teacher for approval!`);
        setShowLeaveModal(false);
        setLeaveData({ type: 'Sick Leave', fromDate: '', toDate: '', reason: '' });
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">My Attendance</h1>
                <p className="text-sm text-gray-500 mt-1">Track your daily presence and overall attendance percentage.</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="p-3 rounded-full bg-blue-50 text-blue-600 mr-4">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-gray-500">Overall Attendance</p>
                        <h3 className="text-xl font-bold text-gray-900">92.5%</h3>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="p-3 rounded-full bg-green-50 text-green-600 mr-4">
                        <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-gray-500">Total Present</p>
                        <h3 className="text-xl font-bold text-gray-900">21 Days</h3>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="p-3 rounded-full bg-red-50 text-red-600 mr-4">
                        <XCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-gray-500">Total Absent</p>
                        <h3 className="text-xl font-bold text-gray-900">2 Days</h3>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="p-3 rounded-full bg-yellow-50 text-yellow-600 mr-4">
                        <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-gray-500">Total Late</p>
                        <h3 className="text-xl font-bold text-gray-900">1 Day</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar View */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900 flex items-center text-lg">
                            <CalendarIcon className="w-5 h-5 mr-2 text-primary-600" />
                            October 2026
                        </h3>
                        <div className="flex space-x-2">
                            <select className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-primary-500 focus:border-primary-500">
                                <option>October 2026</option>
                                <option>September 2026</option>
                                <option>August 2026</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-2 mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="text-center text-xs font-bold text-gray-500 uppercase tracking-wider py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: firstDay }).map((_, i) => (
                            <div key={`empty-${i}`} className="h-14 bg-gray-50 rounded-lg opacity-50"></div>
                        ))}
                        
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const date = i + 1;
                            const status = attendanceData[date];
                            return (
                                <div 
                                    key={date} 
                                    className={`h-14 rounded-lg border flex flex-col justify-center items-center transition-all duration-200 cursor-default ${getStatusColor(status)}`}
                                >
                                    <span className="font-bold text-sm">{date}</span>
                                    {status && status !== 'Holiday' && (
                                        <span className="text-[10px] font-medium uppercase mt-0.5">{status}</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mt-8 pt-4 border-t border-gray-100">
                        <div className="flex items-center text-sm"><div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div> Present</div>
                        <div className="flex items-center text-sm"><div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div> Absent</div>
                        <div className="flex items-center text-sm"><div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div> Late</div>
                        <div className="flex items-center text-sm"><div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div> Holiday</div>
                    </div>
                </div>

                {/* Leaves & Notices */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl shadow-md p-6 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-bold text-lg mb-2">Need a Leave?</h3>
                            <p className="text-primary-100 text-sm mb-4">Apply for a leave in advance so your teachers are notified.</p>
                            <button onClick={() => setShowLeaveModal(true)} className="w-full py-2 bg-white text-primary-700 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-sm">
                                Apply for Leave
                            </button>
                        </div>
                        <CalendarIcon className="w-24 h-24 text-white opacity-10 absolute -bottom-4 -right-4" />
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-4 border-b pb-2">My Leave Applications</h3>
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                            {leaveApplications.map((app) => (
                                <div key={app.id} className="flex items-start border border-gray-100 p-3 rounded-lg bg-gray-50 hover:bg-white hover:border-gray-300 transition-colors">
                                    <div className={`p-2 rounded-lg mr-3 ${
                                        app.status.includes('Approved') ? 'bg-green-100 text-green-600' :
                                        app.status.includes('Rejected') ? 'bg-red-100 text-red-600' :
                                        'bg-blue-100 text-blue-600'
                                    }`}>
                                        {app.status.includes('Approved') ? <CheckCircle className="w-5 h-5" /> :
                                         app.status.includes('Rejected') ? <XCircle className="w-5 h-5" /> :
                                         <AlertCircle className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-bold text-gray-900">{app.type}</p>
                                        </div>
                                        <p className="text-xs text-gray-500 font-medium mb-1">{app.date}</p>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                            app.status.includes('Approved') ? 'bg-green-100 text-green-700' :
                                            app.status.includes('Rejected') ? 'bg-red-100 text-red-700' :
                                            'bg-blue-100 text-blue-700'
                                        }`}>
                                            {app.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Apply Leave Modal */}
            {showLeaveModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
                            <h3 className="font-bold text-gray-900">Apply for Leave</h3>
                            <button onClick={() => setShowLeaveModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5"/></button>
                        </div>
                        <form onSubmit={handleApplyLeave} className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                                <select required value={leaveData.type} onChange={e => setLeaveData({...leaveData, type: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500">
                                    <option>Sick Leave</option>
                                    <option>Family Event</option>
                                    <option>Medical Emergency</option>
                                    <option>Other Reason</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                                    <input required type="date" value={leaveData.fromDate} onChange={e => setLeaveData({...leaveData, fromDate: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                                    <input required type="date" value={leaveData.toDate} onChange={e => setLeaveData({...leaveData, toDate: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Reason</label>
                                <textarea required rows="3" value={leaveData.reason} onChange={e => setLeaveData({...leaveData, reason: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500" placeholder="Please explain why you need this leave..."></textarea>
                            </div>
                            <button type="submit" className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
                                <Send className="w-4 h-4 mr-2" /> Submit Application
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentAttendance;
