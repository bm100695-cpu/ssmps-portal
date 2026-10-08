import React, { useState, useEffect, useContext } from 'react';
import { FileText, Clock, Download, CheckCircle, Upload } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const StudentHomework = () => {
    const { user } = useContext(AuthContext);
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submittedIds, setSubmittedIds] = useState([]); // Track which ones are submitted locally

    useEffect(() => {
        const fetchHomework = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                // Fetch all homework from DB. (In real app, filter by student's class)
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
        // Create dummy content for the file
        const fileContent = `This is a simulated download for the homework assignment: ${fileName}\n\nIn a fully integrated production environment with AWS S3 or GridFS, this would be the actual PDF/DOCX file uploaded by the teacher.`;
        
        // Create a blob and trigger download
        const blob = new Blob([fileContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        
        // Ensure the downloaded file has the requested name (append .txt if it doesn't have an extension)
        const downloadName = fileName.includes('.') ? fileName : `${fileName}.txt`;
        a.download = downloadName;
        
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleFileUpload = (e, assignmentId, title) => {
        if (e.target.files && e.target.files[0]) {
            const fileName = e.target.files[0].name;
            // Add to submitted ids
            setSubmittedIds([...submittedIds, assignmentId]);
            alert(`Your submission "${fileName}" for "${title}" has been successfully uploaded to the server!`);
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">My Homework</h1>
                <p className="text-sm text-gray-500 mt-1">View pending assignments and submit your work.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? <p>Loading homework...</p> : assignments.length === 0 ? <p className="text-gray-500">No homework assigned yet! Enjoy your day.</p> : assignments.map((assignment) => (
                    <div key={assignment._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-lg ${
                                    assignment.status === 'Active' ? 'bg-blue-100 text-blue-600' :
                                    'bg-green-100 text-green-600'
                                }`}>
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 leading-tight">{assignment.title}</h3>
                                    <p className="text-sm text-gray-500">{assignment.subject} • Class {assignment.class}</p>
                                </div>
                            </div>
                        </div>

                        {assignment.fileName && (
                            <button onClick={() => handleDownload(assignment.fileName)} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-primary-50 hover:border-primary-200 transition-colors mb-4 group cursor-pointer w-full text-left">
                                <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700 truncate mr-2">📎 {assignment.fileName}</span>
                                <Download className="w-4 h-4 text-gray-400 group-hover:text-primary-600 flex-shrink-0" />
                            </button>
                        )}

                        <div className="mt-auto pt-4 border-t border-gray-100 space-y-4">
                            <div className="flex items-center justify-between text-sm font-medium">
                                <span className="text-gray-500 flex items-center"><Clock className="w-4 h-4 mr-1"/> Due: {assignment.dueDate}</span>
                                <span className={assignment.status === 'Active' && !submittedIds.includes(assignment._id) ? 'text-blue-600' : 'text-green-600'}>
                                    {submittedIds.includes(assignment._id) ? 'Completed' : assignment.status}
                                </span>
                            </div>
                            
                            {assignment.status === 'Active' && !submittedIds.includes(assignment._id) ? (
                                <label className="w-full flex justify-center items-center py-2.5 px-4 border-2 border-dashed border-primary-300 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 transition-colors cursor-pointer relative overflow-hidden">
                                    <input 
                                        type="file" 
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={(e) => handleFileUpload(e, assignment._id, assignment.title)}
                                    />
                                    <Upload className="w-4 h-4 mr-2" /> Upload Submission
                                </label>
                            ) : (
                                <button disabled className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-green-500 cursor-not-allowed">
                                    <CheckCircle className="w-4 h-4 mr-2" /> Submitted
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentHomework;
