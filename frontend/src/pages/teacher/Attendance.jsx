import React, { useState } from 'react';
import { Calendar, UserCheck, UserX, Save, FileText, Check, X } from 'lucide-react';

const Attendance = () => {
    const [students, setStudents] = useState([
        { id: 1, roll: '101', name: 'Alice Smith', status: 'Present' },
        { id: 2, roll: '102', name: 'Bob Johnson', status: 'Present' },
        { id: 3, roll: '103', name: 'Charlie Brown', status: 'Absent' },
        { id: 4, roll: '104', name: 'Diana Prince', status: 'Present' },
        { id: 5, roll: '105', name: 'Evan Wright', status: 'Late' },
    ]);

    const [leaves, setLeaves] = useState([
        { id: 1, name: 'Alice Smith', roll: '101', type: 'Sick Leave', dates: 'Oct 28 - Oct 29', reason: 'Suffering from high fever.', status: 'Pending' },
        { id: 2, name: 'Charlie Brown', roll: '103', type: 'Family Event', dates: 'Oct 30 - Oct 31', reason: 'Attending cousin\'s wedding out of town.', status: 'Pending' },
    ]);

    const handleStatusChange = (id, newStatus) => {
        setStudents(students.map(s => s.id === id ? { ...s, status: newStatus } : s));
    };

    const handleLeaveAction = (id, action) => {
        setLeaves(leaves.map(l => l.id === id ? { ...l, status: action } : l));
        alert(`Leave request has been ${action.toLowerCase()}!`);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Attendance Sheet</h1>
                <p className="text-sm text-gray-500 mt-1">Mark daily attendance for your class.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                            <option>Class 10-A</option>
                            <option>Class 10-B</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" />
                    </div>
                    <div className="flex items-end">
                        <button className="w-full py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-md flex items-center justify-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            Load Students
                        </button>
                    </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-4 font-medium">Roll No</th>
                                <th className="px-6 py-4 font-medium">Student Name</th>
                                <th className="px-6 py-4 font-medium">Attendance Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {students.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-bold text-gray-700">{student.roll}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.name}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button 
                                                onClick={() => handleStatusChange(student.id, 'Present')}
                                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center ${student.status === 'Present' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
                                            >
                                                <UserCheck className="w-4 h-4 mr-1" /> Present
                                            </button>
                                            <button 
                                                onClick={() => handleStatusChange(student.id, 'Absent')}
                                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center ${student.status === 'Absent' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
                                            >
                                                <UserX className="w-4 h-4 mr-1" /> Absent
                                            </button>
                                            <button 
                                                onClick={() => handleStatusChange(student.id, 'Late')}
                                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${student.status === 'Late' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
                                            >
                                                Late
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                        <div className="text-sm font-medium text-gray-500">
                            Total Present: <span className="text-green-600">{students.filter(s => s.status === 'Present').length}</span> | 
                            Total Absent: <span className="text-red-600">{students.filter(s => s.status === 'Absent').length}</span>
                        </div>
                        <button 
                            onClick={() => {
                                const absentCount = students.filter(s => s.status === 'Absent').length;
                                alert("✅ Attendance records successfully saved to Database!");
                                if (absentCount > 0) {
                                    alert(`📱 Automated SMS / App Notification sent to Parents of ${absentCount} absent student(s).`);
                                }
                            }}
                            className="flex items-center px-6 py-2.5 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-colors shadow-md"
                        >
                            <Save className="w-5 h-5 mr-2" />
                            Submit Attendance
                        </button>
                    </div>
                </div>
            </div>

            {/* Leave Requests Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 flex items-center">
                            <FileText className="w-5 h-5 mr-2 text-primary-600" />
                            Pending Leave Requests
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Approve or reject student leave applications.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {leaves.filter(l => l.status === 'Pending').length === 0 ? (
                        <p className="text-gray-500 text-sm">No pending leave requests at the moment.</p>
                    ) : (
                        leaves.filter(l => l.status === 'Pending').map((leave) => (
                            <div key={leave.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors bg-gray-50 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-gray-900">{leave.name} <span className="text-gray-500 text-sm font-normal">(Roll: {leave.roll})</span></h3>
                                        <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                                            {leave.type}
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-700 mb-2">Dates: <span className="text-primary-600">{leave.dates}</span></p>
                                    <p className="text-sm text-gray-600 bg-white p-2 rounded border border-gray-100 italic">"{leave.reason}"</p>
                                </div>
                                <div className="flex space-x-3 mt-4 pt-4 border-t border-gray-200">
                                    <button 
                                        onClick={() => handleLeaveAction(leave.id, 'Approved')}
                                        className="flex-1 flex justify-center items-center py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg font-bold hover:bg-green-100 transition-colors"
                                    >
                                        <Check className="w-4 h-4 mr-1" /> Approve
                                    </button>
                                    <button 
                                        onClick={() => handleLeaveAction(leave.id, 'Rejected')}
                                        className="flex-1 flex justify-center items-center py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg font-bold hover:bg-red-100 transition-colors"
                                    >
                                        <X className="w-4 h-4 mr-1" /> Reject
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Attendance;
