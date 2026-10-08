import React, { useState, useEffect, useContext } from 'react';
import { Book, Clock, Download, CheckCircle, Search, Calendar } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const ParentHomework = () => {
    const { user } = useContext(AuthContext);
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomework = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const { data } = await axios.get('/api/homework', config);
                setAssignments(data);
            } catch (error) {
                console.error("Error fetching homework", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHomework();
    }, [user.token]);

    const handleDownload = (fileName) => {
        const fileContent = `This is a simulated download for the homework assignment: ${fileName}`;
        const blob = new Blob([fileContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const downloadName = fileName.includes('.') ? fileName : `${fileName}.txt`;
        a.download = downloadName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Child's Homework</h1>
                <p className="text-sm text-gray-500 mt-1">Track your child's daily assignments, due dates, and submission status.</p>
            </div>

            {loading ? (
                <div className="text-center py-10 text-gray-500">Loading assignments...</div>
            ) : assignments.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <Book className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-gray-900">No Homework Assigned</h3>
                    <p className="text-gray-500 mt-1">Your child has no pending assignments from teachers.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {assignments.map((assignment) => (
                        <div key={assignment._id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col p-5">
                            <div className="flex items-center justify-between mb-4">
                                <span className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-bold rounded-full border border-primary-100">
                                    {assignment.subject}
                                </span>
                                <span className="text-xs font-medium text-gray-500 flex items-center">
                                    <Calendar className="w-3.5 h-3.5 mr-1" />
                                    Assigned: {new Date(assignment.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            
                            <h3 className="font-bold text-gray-900 text-lg mb-2">{assignment.title}</h3>
                            <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">
                                {assignment.description}
                            </p>

                            {assignment.fileName && (
                                <button onClick={() => handleDownload(assignment.fileName)} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-primary-50 hover:border-primary-200 transition-colors mb-4 group cursor-pointer w-full text-left">
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700 truncate mr-2">📎 {assignment.fileName}</span>
                                    <Download className="w-4 h-4 text-gray-400 group-hover:text-primary-600 flex-shrink-0" />
                                </button>
                            )}
                            
                            <div className="mt-auto pt-4 border-t border-gray-100 space-y-4">
                                <div className="flex items-center justify-between text-sm font-medium">
                                    <span className="text-gray-500 flex items-center"><Clock className="w-4 h-4 mr-1"/> Due: {assignment.dueDate}</span>
                                    <span className={assignment.status === 'Active' ? 'text-blue-600' : 'text-green-600'}>
                                        {assignment.status}
                                    </span>
                                </div>
                                
                                {assignment.status === 'Active' ? (
                                    <div className="w-full flex justify-center items-center py-2.5 px-4 bg-orange-50 text-orange-700 rounded-lg text-sm font-bold border border-orange-200">
                                        <Clock className="w-4 h-4 mr-2" /> Pending Submission
                                    </div>
                                ) : (
                                    <div className="w-full flex justify-center items-center py-2.5 px-4 bg-green-50 text-green-700 rounded-lg text-sm font-bold border border-green-200">
                                        <CheckCircle className="w-4 h-4 mr-2" /> Completed
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ParentHomework;
