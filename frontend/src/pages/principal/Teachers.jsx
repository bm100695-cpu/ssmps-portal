import React, { useState } from 'react';
import { Users, Search, Filter, Phone, Mail, CheckCircle, XCircle, MoreVertical } from 'lucide-react';

const PrincipalTeachers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('All');
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    
    const [teachers, setTeachers] = useState([
        { id: 'T-101', name: 'Dr. Anita Sharma', subject: 'Mathematics', dept: 'Science', phone: '+91 9876543210', attendance: 'Present' },
        { id: 'T-102', name: 'Mr. Rajesh Kumar', subject: 'Physics', dept: 'Science', phone: '+91 9876543211', attendance: 'Present' },
        { id: 'T-103', name: 'Mrs. Sunita Verma', subject: 'English', dept: 'Languages', phone: '+91 9876543212', attendance: 'Absent' },
        { id: 'T-104', name: 'Ms. Priya Singh', subject: 'History', dept: 'Humanities', phone: '+91 9876543213', attendance: 'Present' },
        { id: 'T-105', name: 'Mr. Anil Gupta', subject: 'Computer Science', dept: 'IT', phone: '+91 9876543214', attendance: 'On Leave' },
        { id: 'T-106', name: 'Mrs. Kavita Patel', subject: 'Hindi', dept: 'Languages', phone: '+91 9876543215', attendance: 'Present' },
    ]);

    const [newTeacher, setNewTeacher] = useState({ name: '', subject: '', dept: 'Science', phone: '' });

    const handleAddTeacher = () => {
        if (!newTeacher.name.trim()) {
            alert("Please enter the teacher's full name!");
            return;
        }
        const addedTeacher = {
            id: `T-${100 + teachers.length + 1}`,
            name: newTeacher.name,
            subject: newTeacher.subject || 'General',
            dept: newTeacher.dept,
            phone: newTeacher.phone || 'N/A',
            attendance: 'Present'
        };
        setTeachers([addedTeacher, ...teachers]);
        setShowAddModal(false);
        setNewTeacher({ name: '', subject: '', dept: 'Science', phone: '' });
        alert(`Teacher ${newTeacher.name} has been added successfully!`);
    };

    const filteredTeachers = teachers.filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDept = departmentFilter === 'All' || t.dept === departmentFilter;
        return matchesSearch && matchesDept;
    });

    const presentCount = teachers.filter(t => t.attendance === 'Present').length;
    const absentCount = teachers.filter(t => t.attendance === 'Absent').length;
    const leaveCount = teachers.filter(t => t.attendance === 'On Leave').length;

    return (
        <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Teaching Staff Overview</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage all teachers, check attendance, and view performance.</p>
                </div>
                <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-colors shadow-sm">
                    + Add New Teacher
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Teachers</p>
                    <p className="text-2xl font-black text-gray-900 mt-1">{teachers.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl shadow-sm border border-green-100">
                    <p className="text-xs font-bold text-green-600 uppercase tracking-wider">Present Today</p>
                    <p className="text-2xl font-black text-green-700 mt-1">{presentCount}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-xl shadow-sm border border-red-100">
                    <p className="text-xs font-bold text-red-600 uppercase tracking-wider">Absent</p>
                    <p className="text-2xl font-black text-red-700 mt-1">{absentCount}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl shadow-sm border border-orange-100">
                    <p className="text-xs font-bold text-orange-600 uppercase tracking-wider">On Leave</p>
                    <p className="text-2xl font-black text-orange-700 mt-1">{leaveCount}</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Search & Filter Bar */}
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search by teacher name or subject..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Filter className="w-5 h-5 text-gray-400" />
                        <select 
                            value={departmentFilter}
                            onChange={(e) => setDepartmentFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white cursor-pointer font-medium text-sm text-gray-700"
                        >
                            <option value="All">All Departments</option>
                            <option value="Science">Science</option>
                            <option value="Languages">Languages</option>
                            <option value="Humanities">Humanities</option>
                            <option value="IT">IT</option>
                        </select>
                    </div>
                </div>

                {/* Teachers Grid */}
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTeachers.map((teacher) => (
                        <div key={teacher.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow group relative bg-white">
                            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-900">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                            
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg">
                                    {teacher.name.split(' ').map(n => n[0]).join('').substring(0,2)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{teacher.name}</h3>
                                    <p className="text-sm text-gray-500">{teacher.subject}</p>
                                </div>
                            </div>
                            
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-gray-600">
                                    <Phone className="w-4 h-4 mr-2 text-gray-400" /> {teacher.phone}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Mail className="w-4 h-4 mr-2 text-gray-400" /> {teacher.name.split(' ')[1].toLowerCase()}@school.edu
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                <div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Today's Status</span>
                                    {teacher.attendance === 'Present' && <span className="inline-flex items-center text-xs font-bold text-green-600"><CheckCircle className="w-3 h-3 mr-1" /> Present</span>}
                                    {teacher.attendance === 'Absent' && <span className="inline-flex items-center text-xs font-bold text-red-600"><XCircle className="w-3 h-3 mr-1" /> Absent</span>}
                                    {teacher.attendance === 'On Leave' && <span className="inline-flex items-center text-xs font-bold text-orange-600"><CheckCircle className="w-3 h-3 mr-1" /> On Leave</span>}
                                </div>
                                <button onClick={() => setSelectedTeacher(teacher)} className="text-sm font-bold text-primary-600 hover:text-primary-800 transition-colors">
                                    View Profile →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Teacher Profile Modal */}
            {selectedTeacher && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        
                        {/* Modal Header/Cover */}
                        <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-400 relative">
                            <button 
                                onClick={() => setSelectedTeacher(null)}
                                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
                            >
                                <XCircle className="w-5 h-5" />
                            </button>
                        </div>
                        
                        {/* Modal Content */}
                        <div className="px-8 pb-8">
                            <div className="relative flex justify-between items-end -mt-12 mb-6">
                                <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
                                    <div className="w-full h-full rounded-full bg-primary-50 flex items-center justify-center text-primary-700 font-black text-3xl">
                                        {selectedTeacher.name.split(' ').map(n => n[0]).join('').substring(0,2)}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center">
                                        <Mail className="w-4 h-4 mr-2" /> Message
                                    </button>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900">{selectedTeacher.name}</h2>
                            <p className="text-gray-500 font-medium mb-6">{selectedTeacher.subject} Teacher • {selectedTeacher.dept} Department</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">Contact Details</h3>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Phone className="w-4 h-4 mr-3 text-gray-400" /> {selectedTeacher.phone}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Mail className="w-4 h-4 mr-3 text-gray-400" /> {selectedTeacher.name.split(' ')[1]?.toLowerCase() || 'staff'}@school.edu
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">Employment Details</h3>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <span className="text-gray-400 mr-2">ID:</span> <span className="font-bold">{selectedTeacher.id}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <span className="text-gray-400 mr-2">Joining Date:</span> <span className="font-bold">12 Aug 2021</span>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">Performance & Classes</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                                    <p className="text-xs font-bold text-gray-500 uppercase">Monthly Attendance</p>
                                    <p className="text-xl font-black text-green-600 mt-1">96%</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                                    <p className="text-xs font-bold text-gray-500 uppercase">Classes Assigned</p>
                                    <p className="text-xl font-black text-gray-900 mt-1">5</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                                    <p className="text-xs font-bold text-gray-500 uppercase">Avg Student Rating</p>
                                    <p className="text-xl font-black text-primary-600 mt-1">4.8/5</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add New Teacher Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Teacher</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name *</label>
                                <input 
                                    type="text" 
                                    value={newTeacher.name} 
                                    onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})} 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" 
                                    placeholder="e.g. Rahul Gupta" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Subject</label>
                                <input 
                                    type="text" 
                                    value={newTeacher.subject} 
                                    onChange={(e) => setNewTeacher({...newTeacher, subject: e.target.value})} 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" 
                                    placeholder="e.g. Mathematics" 
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Department</label>
                                    <select 
                                        value={newTeacher.dept} 
                                        onChange={(e) => setNewTeacher({...newTeacher, dept: e.target.value})} 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                                    >
                                        <option value="Science">Science</option>
                                        <option value="Languages">Languages</option>
                                        <option value="Humanities">Humanities</option>
                                        <option value="IT">IT</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                                    <input 
                                        type="text" 
                                        value={newTeacher.phone} 
                                        onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})} 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" 
                                        placeholder="+91..." 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-100">
                            <button onClick={() => setShowAddModal(false)} className="px-4 py-2 font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleAddTeacher} className="px-4 py-2 font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors shadow-sm">
                                Save Teacher
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrincipalTeachers;
