import React, { useState, useEffect, useContext } from 'react';
import { Award, Target, Trophy, ChevronDown, Download, CheckCircle, Search } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const StudentResults = () => {
    const { user } = useContext(AuthContext);
    const [marks, setMarks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMarks = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                // Fetch all marks for this student (In real app, filter by student's ID/Roll)
                const { data } = await axios.get('/api/marks', config);
                // Group marks by Exam Type
                const grouped = data.reduce((acc, curr) => {
                    if (!acc[curr.examType]) acc[curr.examType] = [];
                    acc[curr.examType].push(curr);
                    return acc;
                }, {});
                setMarks(grouped);
            } catch (error) {
                console.error("Error fetching marks", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMarks();
    }, [user.token]);

    const examTypes = Object.keys(marks);
    const [selectedExam, setSelectedExam] = useState('');

    useEffect(() => {
        if (examTypes.length > 0 && !selectedExam) {
            setSelectedExam(examTypes[0]);
        }
    }, [examTypes, selectedExam]);

    const currentResults = marks[selectedExam] || [];
    
    // Calculate total score percentage for the selected exam
    const totalScore = currentResults.reduce((sum, curr) => sum + curr.marksObtained, 0);
    const maxPossible = currentResults.length * 100;
    const percentage = maxPossible > 0 ? ((totalScore / maxPossible) * 100).toFixed(1) : 0;

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Academic Results</h1>
                    <p className="text-sm text-gray-500 mt-1">View your performance, marks, and teacher remarks.</p>
                </div>
                <button onClick={() => window.print()} className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-md">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                </button>
            </div>

            {loading ? (
                <p>Loading your results...</p>
            ) : examTypes.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">No Results Found</h2>
                    <p className="text-gray-500">Your teachers haven't uploaded any results yet.</p>
                </div>
            ) : (
                <>
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl shadow-md p-6 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-primary-100 text-sm font-medium mb-1">Overall Percentage</p>
                                <h3 className="text-4xl font-extrabold">{percentage}%</h3>
                                <p className="text-sm text-primary-200 mt-2 font-medium">For {selectedExam}</p>
                            </div>
                            <Target className="w-24 h-24 text-white opacity-10 absolute -bottom-4 -right-4" />
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
                            <div className="p-4 rounded-full bg-yellow-50 text-yellow-600 mr-4">
                                <Trophy className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Overall Grade</p>
                                <h3 className="text-3xl font-extrabold text-gray-900">
                                    {percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B+' : percentage >= 60 ? 'B' : 'C'}
                                </h3>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
                            <div className="p-4 rounded-full bg-green-50 text-green-600 mr-4">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Score</p>
                                <h3 className="text-3xl font-extrabold text-gray-900">{totalScore} <span className="text-lg text-gray-400 font-medium">/ {maxPossible}</span></h3>
                            </div>
                        </div>
                    </div>

                    {/* Result Sheet */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                            <div className="flex items-center">
                                <Award className="w-5 h-5 text-primary-600 mr-2" />
                                <h2 className="font-bold text-gray-800 text-lg">Detailed Marksheet</h2>
                            </div>
                            <div className="relative">
                                <select 
                                    value={selectedExam}
                                    onChange={(e) => setSelectedExam(e.target.value)}
                                    className="pl-3 pr-8 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-bold text-gray-700 focus:ring-primary-500 focus:border-primary-500 appearance-none shadow-sm"
                                >
                                    {examTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>

                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-4 font-medium">Subject</th>
                                    <th className="px-6 py-4 font-medium">Max Marks</th>
                                    <th className="px-6 py-4 font-medium">Marks Obtained</th>
                                    <th className="px-6 py-4 font-medium">Grade</th>
                                    <th className="px-6 py-4 font-medium">Remarks</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {currentResults.map((result) => (
                                    <tr key={result._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">{result.subject}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">100</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <span className="text-sm font-bold text-gray-900 mr-2">{result.marksObtained}</span>
                                                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                                    <div className={`h-1.5 rounded-full ${result.marksObtained >= 80 ? 'bg-green-500' : result.marksObtained >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${result.marksObtained}%` }}></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                                result.marksObtained >= 90 ? 'bg-green-100 text-green-800 border border-green-200' :
                                                result.marksObtained >= 80 ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                                                result.marksObtained >= 70 ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                                                'bg-red-100 text-red-800 border border-red-200'
                                            }`}>
                                                {result.marksObtained >= 90 ? 'A+' : result.marksObtained >= 80 ? 'A' : result.marksObtained >= 70 ? 'B' : result.marksObtained >= 60 ? 'C' : 'D'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 italic">
                                            {result.remarks || '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default StudentResults;
