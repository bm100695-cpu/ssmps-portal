import React, { useState } from 'react';
import { Users, Search, Filter, Phone, Mail, CheckCircle, XCircle, FileText, UserPlus, MoreVertical, X } from 'lucide-react';

const PrincipalStudents = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [classFilter, setClassFilter] = useState('All');
    const [showAddModal, setShowAddModal] = useState(false);

    const [students, setStudents] = useState([
        { id: 'ADM-2023-001', name: 'Rohan Sharma', class: '10th A', parentName: 'Vikram Sharma', phone: '+91 9876543220', attendance: 'Present', fees: 'Paid' },
        { id: 'ADM-2023-002', name: 'Aarohi Patel', class: '10th A', parentName: 'Sanjay Patel', phone: '+91 9876543221', attendance: 'Present', fees: 'Pending' },
        { id: 'ADM-2022-045', name: 'Karan Singh', class: '12th Sci', parentName: 'Amit Singh', phone: '+91 9876543222', attendance: 'Absent', fees: 'Paid' },
        { id: 'ADM-2024-112', name: 'Neha Gupta', class: '8th B', parentName: 'Rakesh Gupta', phone: '+91 9876543223', attendance: 'Present', fees: 'Paid' },
        { id: 'ADM-2024-115', name: 'Aryan Verma', class: '8th B', parentName: 'Sunil Verma', phone: '+91 9876543224', attendance: 'On Leave', fees: 'Paid' },
        { id: 'ADM-2021-088', name: 'Sneha Reddy', class: '11th Com', parentName: 'Ravi Reddy', phone: '+91 9876543225', attendance: 'Present', fees: 'Overdue' },
    ]);

    const [newStudent, setNewStudent] = useState({ name: '', class: '10th A', parentName: '', phone: '' });

    const handleAddStudent = () => {
        if (!newStudent.name) return;
        const addedStudent = {
            id: `ADM-2026-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
            name: newStudent.name,
            class: newStudent.class,
            parentName: newStudent.parentName || 'N/A',
            phone: newStudent.phone || 'N/A',
            attendance: 'Present',
            fees: 'Pending'
        };
        setStudents([addedStudent, ...students]);
        setShowAddModal(false);
        setNewStudent({ name: '', class: '10th A', parentName: '', phone: '' });
    };

    const filteredStudents = students.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesClass = classFilter === 'All' || s.class === classFilter;
        return matchesSearch && matchesClass;
    });

    const presentCount = students.filter(s => s.attendance === 'Present').length;
    const pendingFeesCount = students.filter(s => s.fees === 'Pending' || s.fees === 'Overdue').length;

    return (
        <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Student Directory</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage admissions, view student records, and track school-wide attendance.</p>
                </div>
                <button onClick={() => setShowAddModal(true)} className="flex items-center px-4 py-2 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-colors shadow-sm">
                    <UserPlus className="w-4 h-4 mr-2" /> Add New Student
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Enrolled</p>
                    <p className="text-2xl font-black text-gray-900 mt-1">{students.length + 1450}</p> 
                    {/* +1450 is just for realistic scale in a school */}
                </div>
                <div className="bg-green-50 p-4 rounded-xl shadow-sm border border-green-100">
                    <p className="text-xs font-bold text-green-600 uppercase tracking-wider">Today's Attendance</p>
                    <p className="text-2xl font-black text-green-700 mt-1">94%</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl shadow-sm border border-blue-100">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">New Admissions (This Month)</p>
                    <p className="text-2xl font-black text-blue-700 mt-1">12</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl shadow-sm border border-orange-100">
                    <p className="text-xs font-bold text-orange-600 uppercase tracking-wider">Fees Pending</p>
                    <p className="text-2xl font-black text-orange-700 mt-1">{pendingFeesCount + 42}</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Search & Filter Bar */}
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search by student name or admission ID..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Filter className="w-5 h-5 text-gray-400" />
                        <select 
                            value={classFilter}
                            onChange={(e) => setClassFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white cursor-pointer font-medium text-sm text-gray-700"
                        >
                            <option value="All">All Classes</option>
                            <option value="8th B">8th B</option>
                            <option value="10th A">10th A</option>
                            <option value="11th Com">11th Commerce</option>
                            <option value="12th Sci">12th Science</option>
                        </select>
                    </div>
                </div>

                {/* Students Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-4 font-bold">Admission ID</th>
                                <th className="px-6 py-4 font-bold">Student Name</th>
                                <th className="px-6 py-4 font-bold">Class</th>
                                <th className="px-6 py-4 font-bold">Parent Contact</th>
                                <th className="px-6 py-4 font-bold">Status</th>
                                <th className="px-6 py-4 font-bold">Fees</th>
                                <th className="px-6 py-4 text-right font-bold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredStudents.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                        <Users className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                                        <p>No students found matching your search.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-mono font-bold text-gray-600">{student.id}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold mr-3">
                                                    {student.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <span className="text-sm font-bold text-gray-900">{student.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded">{student.class}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-900 font-medium">{student.parentName}</p>
                                            <p className="text-xs text-gray-500">{student.phone}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            {student.attendance === 'Present' && <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 border border-green-200 uppercase"><CheckCircle className="w-3 h-3 mr-1" /> Present</span>}
                                            {student.attendance === 'Absent' && <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 border border-red-200 uppercase"><XCircle className="w-3 h-3 mr-1" /> Absent</span>}
                                            {student.attendance === 'On Leave' && <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-700 border border-orange-200 uppercase">Leave</span>}
                                        </td>
                                        <td className="px-6 py-4">
                                            {student.fees === 'Paid' ? (
                                                <span className="text-sm font-bold text-green-600">Paid</span>
                                            ) : student.fees === 'Overdue' ? (
                                                <span className="text-sm font-bold text-red-600">Overdue</span>
                                            ) : (
                                                <span className="text-sm font-bold text-orange-500">Pending</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                                                <FileText className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add New Student Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">New Admission</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Student Full Name *</label>
                                <input 
                                    type="text" 
                                    value={newStudent.name} 
                                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} 
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" 
                                    placeholder="e.g. Ramesh Kumar" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Assign Class</label>
                                <select 
                                    value={newStudent.class} 
                                    onChange={(e) => setNewStudent({...newStudent, class: e.target.value})} 
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                                >
                                    <option value="8th B">8th B</option>
                                    <option value="10th A">10th A</option>
                                    <option value="11th Com">11th Commerce</option>
                                    <option value="12th Sci">12th Science</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Parent Name</label>
                                    <input 
                                        type="text" 
                                        value={newStudent.parentName} 
                                        onChange={(e) => setNewStudent({...newStudent, parentName: e.target.value})} 
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" 
                                        placeholder="e.g. Suresh Kumar" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Mobile No.</label>
                                    <input 
                                        type="text" 
                                        value={newStudent.phone} 
                                        onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})} 
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" 
                                        placeholder="+91..." 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 mt-8">
                            <button onClick={() => setShowAddModal(false)} className="px-5 py-2.5 font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleAddStudent} className="px-5 py-2.5 font-black text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors shadow-sm">
                                Submit Admission
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrincipalStudents;
