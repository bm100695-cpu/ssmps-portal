import React, { useState, useEffect, useContext } from 'react';
import { Upload, FileText, CheckCircle, Clock } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Homework = () => {
    const { user } = useContext(AuthContext);
    const [assignments, setAssignments] = useState([]);
    
    const [formData, setFormData] = useState({ title: '', class: '10-A', subject: 'Mathematics', dueDate: '' });
    const [selectedFile, setSelectedFile] = useState(null);

    const fetchHomework = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('/api/homework', config);
            setAssignments(data);
        } catch (error) {
            console.error("Error fetching homework", error);
        }
    };

    useEffect(() => {
        fetchHomework();
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handlePublish = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const payload = {
                title: formData.title || 'New Assignment',
                className: formData.class || '10-A',
                subject: formData.subject,
                dueDate: formData.dueDate || new Date().toLocaleDateString(),
                fileName: selectedFile ? selectedFile.name : null
            };
            await axios.post('/api/homework', payload, config);
            
            alert(`Assignment ${selectedFile ? 'with attached file ' + selectedFile.name : ''} published successfully!`);
            setFormData({ title: '', class: '10-A', subject: 'Mathematics', dueDate: '' });
            setSelectedFile(null);
            fetchHomework(); // Refresh list from backend
        } catch (error) {
            alert(error.response?.data?.message || 'Error publishing homework');
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Homework & Assignments</h1>
                <p className="text-sm text-gray-500 mt-1">Create new assignments and manage student submissions.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upload Assignment Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <Upload className="w-5 h-5 mr-2 text-primary-600" />
                            Upload Assignment
                        </h2>
                        <form className="space-y-4" onSubmit={handlePublish}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Chapter 4 Exercise" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                                    <select value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                                        <option value="10-A">Class 10-A</option>
                                        <option value="10-B">Class 10-B</option>
                                        <option value="9-A">Class 9-A</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                    <select value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                                        <option>Mathematics</option>
                                        <option>Physics</option>
                                        <option>Chemistry</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                                <input required type="date" value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Attach File (Optional)</label>
                                <label className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-500 transition-colors cursor-pointer bg-gray-50">
                                    <div className="space-y-1 text-center">
                                        <Upload className={`mx-auto h-12 w-12 ${selectedFile ? 'text-primary-500' : 'text-gray-400'}`} />
                                        <div className="flex text-sm text-gray-600 justify-center">
                                            <span className="relative cursor-pointer bg-transparent rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none">
                                                <span>{selectedFile ? 'Change file' : 'Upload a file'}</span>
                                                <input type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                                            </span>
                                            {!selectedFile && <p className="pl-1">or drag and drop</p>}
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            {selectedFile ? <span className="text-primary-700 font-bold">{selectedFile.name}</span> : 'PDF, DOCX up to 10MB'}
                                        </p>
                                    </div>
                                </label>
                            </div>
                            <button type="submit" className="w-full py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-md">
                                Publish Assignment
                            </button>
                        </form>
                    </div>
                </div>

                {/* Assignment List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h3 className="font-bold text-gray-800">Recent Assignments</h3>
                            <input type="text" placeholder="Search assignments..." className="px-3 py-1.5 text-sm border border-gray-200 rounded-md" />
                        </div>
                        <div className="divide-y divide-gray-100">
                            {assignments.map((assignment) => (
                                <div key={assignment.id} className="p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-gray-900 flex items-center">
                                            <FileText className="w-4 h-4 mr-2 text-primary-500" />
                                            {assignment.title}
                                        </h4>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                            assignment.status === 'Active' ? 'bg-green-100 text-green-800' :
                                            assignment.status === 'Grading' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {assignment.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                                        <span><strong className="text-gray-700">Class:</strong> {assignment.class}</span>
                                        <span><strong className="text-gray-700">Subject:</strong> {assignment.subject}</span>
                                        <span className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1" />
                                            Due: {assignment.dueDate}
                                        </span>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <button className="px-3 py-1.5 text-sm font-medium text-primary-700 bg-primary-50 rounded hover:bg-primary-100">
                                            View Submissions
                                        </button>
                                        <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homework;
