import React, { useState } from 'react';
import { AlertTriangle, Send, FileText, CheckCircle, Clock } from 'lucide-react';

const DriverReportIssue = () => {
    const [issueCategory, setIssueCategory] = useState('');
    const [issueDescription, setIssueDescription] = useState('');
    const [urgency, setUrgency] = useState('Medium');

    const [pastIssues, setPastIssues] = useState([
        { id: 'ISS-0021', date: '01 Oct 2026', category: 'Vehicle Breakdown', status: 'Resolved' },
        { id: 'ISS-0018', date: '25 Sep 2026', category: 'Student Behavior', status: 'Pending' },
        { id: 'ISS-0012', date: '10 Sep 2026', category: 'Route/Traffic Block', status: 'Resolved' },
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!issueCategory || !issueDescription) {
            alert("Please select a category and describe the issue.");
            return;
        }

        const newIssue = {
            id: `ISS-${Math.floor(Math.random() * 1000).toString().padStart(4, '0')}`,
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            category: issueCategory,
            status: 'Pending'
        };

        setPastIssues([newIssue, ...pastIssues]);
        setIssueCategory('');
        setIssueDescription('');
        setUrgency('Medium');
        alert(`Issue reported successfully! Your reference ID is ${newIssue.id}`);
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-2 text-red-500" /> Report an Issue
                </h1>
                <p className="text-sm text-gray-500 mt-1">Submit transport-related problems directly to the school administration.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Submit New Issue Form */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">New Incident Report</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Issue Category *</label>
                            <select 
                                value={issueCategory} 
                                onChange={(e) => setIssueCategory(e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                            >
                                <option value="">-- Select Category --</option>
                                <option value="Vehicle Breakdown">Bus Breakdown / Mechanical Issue</option>
                                <option value="Route/Traffic Block">Severe Traffic / Road Blocked</option>
                                <option value="Student Behavior">Student Misbehavior</option>
                                <option value="Parent Complaint">Parent Complaint / Dispute</option>
                                <option value="Fuel Issue">Fuel Shortage / Payment Issue</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Urgency Level</label>
                            <div className="flex space-x-3">
                                {['Low', 'Medium', 'High', 'Critical'].map(level => (
                                    <label key={level} className={`flex-1 cursor-pointer text-center px-2 py-2 rounded-lg border text-sm font-bold transition-colors ${
                                        urgency === level 
                                        ? level === 'Critical' ? 'bg-red-50 border-red-500 text-red-700' : 'bg-primary-50 border-primary-500 text-primary-700'
                                        : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                                    }`}>
                                        <input 
                                            type="radio" 
                                            name="urgency" 
                                            value={level} 
                                            checked={urgency === level} 
                                            onChange={(e) => setUrgency(e.target.value)}
                                            className="hidden" 
                                        />
                                        {level}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Description *</label>
                            <textarea 
                                value={issueDescription}
                                onChange={(e) => setIssueDescription(e.target.value)}
                                placeholder="Describe exactly what happened..."
                                className="w-full h-32 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none transition-colors"
                            ></textarea>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full flex items-center justify-center py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-black transition-colors shadow-sm"
                        >
                            <Send className="w-4 h-4 mr-2" /> Submit Report to Admin
                        </button>
                    </form>
                </div>

                {/* Past Issues List */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
                    <h2 className="font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2 flex items-center justify-between">
                        <span>My Previous Reports</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{pastIssues.length} Reports</span>
                    </h2>
                    
                    <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                        {pastIssues.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                <FileText className="w-12 h-12 mb-2 opacity-50" />
                                <p>You haven't reported any issues.</p>
                            </div>
                        ) : (
                            pastIssues.map((issue) => (
                                <div key={issue.id} className="p-4 rounded-xl border border-gray-100 hover:shadow-sm transition-all bg-gray-50 hover:bg-white group">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="font-bold text-gray-900">{issue.category}</p>
                                            <p className="text-xs font-mono text-gray-400 mt-0.5">ID: {issue.id}</p>
                                        </div>
                                        <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                                            issue.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                        }`}>
                                            {issue.status === 'Resolved' ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                                            {issue.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200/60">
                                        <p className="text-xs font-bold text-gray-500">{issue.date}</p>
                                        <button className="text-xs font-bold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                            View Details →
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DriverReportIssue;
