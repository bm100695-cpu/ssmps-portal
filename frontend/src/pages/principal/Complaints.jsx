import React, { useState } from 'react';
import { MessageSquare, AlertCircle, CheckCircle, Clock, Search, Filter } from 'lucide-react';

const PrincipalComplaints = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [replyText, setReplyText] = useState('');
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    const [complaints, setComplaints] = useState([
        { id: 'CMP-104', by: 'Sanjay Patel (Parent)', type: 'Transport', date: 'Today, 8:30 AM', status: 'Pending', desc: 'The bus on Route 2 has been consistently late by 15 mins for the past 3 days.' },
        { id: 'CMP-103', by: 'Mrs. Kavita (Teacher)', type: 'Facility', date: 'Yesterday', status: 'Investigating', desc: 'The smartboard in Class 8th B is not working, hindering lectures.' },
        { id: 'CMP-102', by: 'Ramesh Kumar (Parent)', type: 'Academic', date: '04 Oct 2026', status: 'Resolved', desc: 'Requesting a re-evaluation of my child\'s math midterm paper.' },
        { id: 'CMP-101', by: 'Dr. Anita (Teacher)', type: 'Behavioral', date: '01 Oct 2026', status: 'Resolved', desc: 'Disciplinary issue regarding a group of students during recess.' },
    ]);

    const handleReply = () => {
        if (!replyText.trim()) return;
        
        const updatedComplaints = complaints.map(c => {
            if (c.id === selectedComplaint.id) {
                return { ...c, status: 'Resolved' };
            }
            return c;
        });
        
        setComplaints(updatedComplaints);
        setReplyText('');
        setSelectedComplaint(null);
        alert('Reply sent and complaint marked as Resolved.');
    };

    const filteredComplaints = complaints.filter(c => activeFilter === 'All' || c.status === activeFilter);

    const pendingCount = complaints.filter(c => c.status === 'Pending').length;

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <MessageSquare className="w-6 h-6 mr-2 text-primary-600" /> Complaints & Feedback
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Review and resolve issues raised by parents, teachers, and staff.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Sidebar Stats & Filters */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 flex items-center justify-between shadow-sm">
                        <div>
                            <p className="text-sm font-bold text-orange-600 uppercase">Pending Actions</p>
                            <p className="text-3xl font-black text-orange-700 mt-1">{pendingCount}</p>
                        </div>
                        <AlertCircle className="w-10 h-10 text-orange-200" />
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <h3 className="font-bold text-gray-900 p-4 border-b border-gray-100 bg-gray-50">Filter by Status</h3>
                        <div className="p-2 space-y-1">
                            {['All', 'Pending', 'Investigating', 'Resolved'].map(filter => (
                                <button 
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-colors flex justify-between items-center ${
                                        activeFilter === filter ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {filter}
                                    <span className="bg-white px-2 py-0.5 rounded-full text-xs border border-gray-200">
                                        {filter === 'All' ? complaints.length : complaints.filter(c => c.status === filter).length}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Complaints List & Action Area */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[650px]">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <h3 className="font-bold text-gray-900">Inbox ({filteredComplaints.length})</h3>
                    </div>
                    
                    <div className="flex-1 flex overflow-hidden">
                        {/* List */}
                        <div className={`w-full ${selectedComplaint ? 'hidden md:block md:w-1/2' : 'w-full'} border-r border-gray-100 overflow-y-auto`}>
                            {filteredComplaints.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">No complaints found.</div>
                            ) : (
                                filteredComplaints.map(complaint => (
                                    <div 
                                        key={complaint.id}
                                        onClick={() => setSelectedComplaint(complaint)}
                                        className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                                            selectedComplaint?.id === complaint.id ? 'bg-primary-50/50' : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                                complaint.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                                complaint.status === 'Investigating' ? 'bg-blue-100 text-blue-700' :
                                                'bg-orange-100 text-orange-700'
                                            }`}>
                                                {complaint.status === 'Resolved' && <CheckCircle className="w-3 h-3 mr-1" />}
                                                {complaint.status === 'Pending' && <Clock className="w-3 h-3 mr-1" />}
                                                {complaint.status}
                                            </span>
                                            <span className="text-[10px] font-bold text-gray-400">{complaint.date}</span>
                                        </div>
                                        <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">{complaint.type} Issue</h4>
                                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{complaint.desc}</p>
                                        <p className="text-[10px] font-bold text-gray-400">From: {complaint.by}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Detailed View / Reply Panel */}
                        <div className={`w-full ${selectedComplaint ? 'block' : 'hidden md:block'} md:w-1/2 bg-gray-50 flex flex-col`}>
                            {selectedComplaint ? (
                                <div className="h-full flex flex-col">
                                    <div className="p-6 flex-1 overflow-y-auto">
                                        <button className="md:hidden text-xs font-bold text-primary-600 mb-4" onClick={() => setSelectedComplaint(null)}>← Back to list</button>
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                                                {selectedComplaint.by[0]}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900">{selectedComplaint.by}</h3>
                                                <p className="text-xs text-gray-500">ID: {selectedComplaint.id} • {selectedComplaint.date}</p>
                                            </div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
                                            <p className="text-sm font-bold text-gray-900 mb-2 border-b border-gray-100 pb-2">Category: {selectedComplaint.type}</p>
                                            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{selectedComplaint.desc}</p>
                                        </div>

                                        {selectedComplaint.status !== 'Resolved' && (
                                            <div className="space-y-3">
                                                <label className="block text-sm font-bold text-gray-900">Reply & Resolve</label>
                                                <textarea 
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                    className="w-full h-32 p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                                                    placeholder="Type your response to the sender. This will mark the issue as resolved."
                                                ></textarea>
                                                <div className="flex justify-between items-center">
                                                    <button 
                                                        onClick={() => {
                                                            const updated = complaints.map(c => c.id === selectedComplaint.id ? { ...c, status: 'Investigating' } : c);
                                                            setComplaints(updated);
                                                            setSelectedComplaint({...selectedComplaint, status: 'Investigating'});
                                                        }}
                                                        className="text-xs font-bold text-blue-600 hover:text-blue-800"
                                                    >
                                                        Mark as Investigating
                                                    </button>
                                                    <button onClick={handleReply} className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 shadow-sm">
                                                        Send Reply & Resolve
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                        {selectedComplaint.status === 'Resolved' && (
                                            <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-center">
                                                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                                <p className="text-sm font-bold text-green-800">This complaint has been resolved.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-6 text-center">
                                    <MessageSquare className="w-12 h-12 mb-3 opacity-20" />
                                    <p className="text-sm font-medium">Select a complaint from the list<br/>to view details and reply.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PrincipalComplaints;
