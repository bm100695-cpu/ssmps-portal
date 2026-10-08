import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Plus, Trash2, Search, GraduationCap } from 'lucide-react';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user: currentUser } = useContext(AuthContext);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ 
        studentName: '', admissionNumber: '', rollNumber: '', class: '', section: 'A' 
    });

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
            const { data } = await axios.get('/api/students', config);
            setStudents(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch students');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm('Are you sure you want to delete this student record?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
                await axios.delete(`/api/students/${id}`, config);
                fetchStudents();
            } catch (err) {
                alert(err.response?.data?.message || 'Error deleting student');
            }
        }
    };

    const handleCreateStudent = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
            await axios.post('/api/students', formData, config);
            setIsModalOpen(false);
            setFormData({ studentName: '', admissionNumber: '', rollNumber: '', class: '', section: 'A' });
            fetchStudents();
        } catch (err) {
            alert(err.response?.data?.message || 'Error creating student record');
        }
    };

    const filteredStudents = students.filter(s => 
        s.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.admissionNumber?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Student Admissions</h1>
                    <p className="text-sm text-gray-500">Manage school enrollment records</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Admit Student
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name or admission number..." 
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-4 font-medium">Student Info</th>
                                <th className="px-6 py-4 font-medium">Admission No.</th>
                                <th className="px-6 py-4 font-medium">Class / Roll No.</th>
                                <th className="px-6 py-4 font-medium">Portal Status</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredStudents.length === 0 ? (
                                <tr><td colSpan="5" className="p-8 text-center text-gray-500">No students found.</td></tr>
                            ) : filteredStudents.map(s => (
                                <tr key={s._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold mr-3">
                                                <GraduationCap className="w-5 h-5" />
                                            </div>
                                            <span className="font-medium text-gray-900">{s.studentName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-gray-600">{s.admissionNumber}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-gray-900 font-medium">Class {s.class} - {s.section}</div>
                                        <div className="text-gray-500 text-sm">Roll: {s.rollNumber}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {s.isRegistered ? (
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Registered</span>
                                        ) : (
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleDelete(s._id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Admit New Student</h2>
                        <form onSubmit={handleCreateStudent} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Student Full Name</label>
                                <input type="text" required value={formData.studentName} onChange={(e) => setFormData({...formData, studentName: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Admission Number</label>
                                    <input type="text" required value={formData.admissionNumber} onChange={(e) => setFormData({...formData, admissionNumber: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                                    <input type="text" required value={formData.rollNumber} onChange={(e) => setFormData({...formData, rollNumber: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                                    <input type="text" required value={formData.class} onChange={(e) => setFormData({...formData, class: e.target.value})} placeholder="e.g. 10" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                                    <input type="text" required value={formData.section} onChange={(e) => setFormData({...formData, section: e.target.value})} placeholder="e.g. A" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
                                <button type="submit" className="px-4 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-md">Admit Student</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Students;
