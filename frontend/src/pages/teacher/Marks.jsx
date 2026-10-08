import React, { useState, useContext } from 'react';
import { CheckSquare, Save, Search } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Marks = () => {
    const { user } = useContext(AuthContext);
    const [meta, setMeta] = useState({ class: '10-A', subject: 'Mathematics', examType: 'Mid-Term Exam' });
    const [students, setStudents] = useState([
        { id: 1, roll: '101', name: 'Alice Smith', marks: '', remarks: '' },
        { id: 2, roll: '102', name: 'Bob Johnson', marks: '', remarks: '' },
        { id: 3, roll: '103', name: 'Charlie Brown', marks: '', remarks: '' },
        { id: 4, roll: '104', name: 'Diana Prince', marks: '', remarks: '' },
        { id: 5, roll: '105', name: 'Evan Wright', marks: '', remarks: '' },
    ]);

    const handleMarksChange = (id, value, field) => {
        setStudents(students.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const handleSaveMarks = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const payload = {
                className: meta.class,
                subject: meta.subject,
                examType: meta.examType,
                marksData: students.filter(s => s.marks !== '')
            };
            
            await axios.post('/api/marks', payload, config);
            alert("Marks saved to database successfully!");
        } catch (error) {
            alert("Failed to save marks.");
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Load Marks & Results</h1>
                <p className="text-sm text-gray-500 mt-1">Upload marks for exams and generate student results.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                        <select value={meta.class} onChange={e=>setMeta({...meta, class: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                            <option value="10-A">Class 10-A</option>
                            <option value="10-B">Class 10-B</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <select value={meta.subject} onChange={e=>setMeta({...meta, subject: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                            <option>Mathematics</option>
                            <option>Physics</option>
                            <option>English</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Exam Type</label>
                        <select value={meta.examType} onChange={e=>setMeta({...meta, examType: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                            <option>Mid-Term Exam</option>
                            <option>Final Exam</option>
                            <option>Unit Test 1</option>
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button onClick={() => alert("Students loaded successfully from database!")} className="w-full py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-md flex items-center justify-center">
                            <Search className="w-4 h-4 mr-2" />
                            Load Students
                        </button>
                    </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-primary-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="font-bold text-primary-900 flex items-center">
                            <CheckSquare className="w-5 h-5 mr-2" />
                            Entering Marks: {meta.subject} ({meta.class}) - {meta.examType}
                        </h3>
                        <span className="text-sm font-medium text-primary-700">Max Marks: 100</span>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-4 font-medium">Roll No</th>
                                <th className="px-6 py-4 font-medium">Student Name</th>
                                <th className="px-6 py-4 font-medium">Marks Obtained</th>
                                <th className="px-6 py-4 font-medium">Remarks</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {students.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-3 text-sm font-bold text-gray-700">{student.roll}</td>
                                    <td className="px-6 py-3 text-sm font-medium text-gray-900">{student.name}</td>
                                    <td className="px-6 py-3">
                                        <input 
                                            type="number" 
                                            value={student.marks}
                                            onChange={(e) => handleMarksChange(student.id, e.target.value, 'marks')}
                                            className="w-24 px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 text-sm font-bold"
                                        />
                                    </td>
                                    <td className="px-6 py-3">
                                        <input 
                                            type="text" 
                                            placeholder="Optional"
                                            value={student.remarks}
                                            onChange={(e) => handleMarksChange(student.id, e.target.value, 'remarks')}
                                            className="w-full px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 text-sm"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
                        <button onClick={handleSaveMarks} className="flex items-center px-6 py-2.5 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-colors shadow-md">
                            <Save className="w-5 h-5 mr-2" />
                            Save Marks
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marks;
