import React, { useState } from 'react';
import { Users, GraduationCap, Award, Search, Phone, Mail, UserPlus, Filter, X, FileText, Download } from 'lucide-react';

const MyClass = () => {
    const [students] = useState([
        { id: 1, roll: '101', name: 'Alice Smith', parent: 'Mr. John Smith', phone: '9876543210', grade: 'A+', attendance: '98%' },
        { id: 2, roll: '102', name: 'Bob Johnson', parent: 'Mrs. Mary Johnson', phone: '8765432109', grade: 'B', attendance: '85%' },
        { id: 3, roll: '103', name: 'Charlie Brown', parent: 'Mr. David Brown', phone: '7654321098', grade: 'A', attendance: '92%' },
        { id: 4, roll: '104', name: 'Diana Prince', parent: 'Mrs. Sarah Prince', phone: '6543210987', grade: 'A+', attendance: '99%' },
        { id: 5, roll: '105', name: 'Evan Wright', parent: 'Mr. Peter Wright', phone: '5432109876', grade: 'C', attendance: '75%' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);

    const filteredStudents = students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.roll.includes(searchTerm));

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Class (10-A)</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your class students, view their overall performance and contact parents.</p>
                </div>
                <button onClick={() => alert("Add Student form will open here!")} className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-md">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Student
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="p-4 rounded-full bg-blue-50 text-blue-600 mr-4">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Students</p>
                        <h3 className="text-2xl font-bold text-gray-900">45</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="p-4 rounded-full bg-green-50 text-green-600 mr-4">
                        <Award className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Class Average</p>
                        <h3 className="text-2xl font-bold text-gray-900">82%</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="p-4 rounded-full bg-purple-50 text-purple-600 mr-4">
                        <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Average Attendance</p>
                        <h3 className="text-2xl font-bold text-gray-900">94%</h3>
                    </div>
                </div>
            </div>

            {/* Students List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div className="relative max-w-sm w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="w-4 h-4 text-gray-400" />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search student by name or roll no..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>
                    <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                    </button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-4 font-medium">Roll No</th>
                                <th className="px-6 py-4 font-medium">Student Name</th>
                                <th className="px-6 py-4 font-medium">Parent Info</th>
                                <th className="px-6 py-4 font-medium">Attendance</th>
                                <th className="px-6 py-4 font-medium">Overall Grade</th>
                                <th className="px-6 py-4 text-right font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-bold text-gray-700">{student.roll}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs mr-3">
                                                {student.name.charAt(0)}
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{student.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-gray-900">{student.parent}</p>
                                        <p className="text-xs text-gray-500 flex items-center mt-1">
                                            <Phone className="w-3 h-3 mr-1" /> {student.phone}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                                <div className={`h-2 rounded-full ${parseInt(student.attendance) > 90 ? 'bg-green-500' : parseInt(student.attendance) > 80 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: student.attendance }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-gray-700">{student.attendance}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                            student.grade.includes('A') ? 'bg-green-100 text-green-800 border border-green-200' :
                                            student.grade.includes('B') ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                                            'bg-orange-100 text-orange-800 border border-orange-200'
                                        }`}>
                                            {student.grade}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium">
                                        <button onClick={() => setSelectedStudent(student)} className="text-primary-600 hover:text-primary-900 px-3 py-1 bg-primary-50 rounded-md transition-colors font-bold flex items-center justify-end ml-auto">
                                            <FileText className="w-4 h-4 mr-1"/> View Report
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500 text-sm">
                                        No students found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Report Modal */}
            {selectedStudent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-6 flex justify-between items-start">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 rounded-full bg-white text-primary-700 flex items-center justify-center font-bold text-2xl shadow-inner">
                                    {selectedStudent.name.charAt(0)}
                                </div>
                                <div className="text-white">
                                    <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                                    <p className="text-primary-100 font-medium">Roll No: {selectedStudent.roll} • Class 10-A</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedStudent(null)} className="text-white hover:text-gray-200 transition-colors p-1 bg-white/10 rounded-full hover:bg-white/20">
                                <X className="w-5 h-5"/>
                            </button>
                        </div>
                        
                        {/* Body */}
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <p className="text-sm text-gray-500 font-medium mb-1">Parent Contact</p>
                                    <p className="font-bold text-gray-900">{selectedStudent.parent}</p>
                                    <p className="text-sm text-primary-600 flex items-center mt-1"><Phone className="w-3 h-3 mr-1"/> {selectedStudent.phone}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium mb-1">Overall Grade</p>
                                        <p className="text-3xl font-extrabold text-primary-600">{selectedStudent.grade}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500 font-medium mb-1">Attendance</p>
                                        <p className="text-xl font-bold text-gray-900">{selectedStudent.attendance}</p>
                                    </div>
                                </div>
                            </div>

                            <h3 className="font-bold text-gray-900 mb-4 border-b pb-2">Academic Performance</h3>
                            <div className="space-y-4">
                                {[
                                    { sub: 'Mathematics', score: selectedStudent.grade.includes('A') ? 95 : 78, color: 'bg-blue-500' },
                                    { sub: 'Physics', score: selectedStudent.grade.includes('A') ? 92 : 82, color: 'bg-purple-500' },
                                    { sub: 'Chemistry', score: selectedStudent.grade.includes('A') ? 88 : 75, color: 'bg-green-500' },
                                    { sub: 'English', score: selectedStudent.grade.includes('A') ? 85 : 80, color: 'bg-yellow-500' }
                                ].map((subject, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between text-sm font-medium mb-1">
                                            <span className="text-gray-700">{subject.sub}</span>
                                            <span className="text-gray-900">{subject.score}/100</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div className={`${subject.color} h-2 rounded-full`} style={{ width: `${subject.score}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-end">
                            <button className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                                <Download className="w-4 h-4 mr-2" />
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyClass;
