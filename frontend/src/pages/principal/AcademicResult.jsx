import React, { useState } from 'react';
import { Award, TrendingUp, TrendingDown, BookOpen, Search, Download, AlertCircle, CheckCircle } from 'lucide-react';

const PrincipalAcademicResult = () => {
    const [examTerm, setExamTerm] = useState('Mid-Term 2026');
    const [isPublishing, setIsPublishing] = useState(false);
    const [isPublished, setIsPublished] = useState(false);

    const handlePublish = () => {
        setIsPublishing(true);
        // Simulate network request
        setTimeout(() => {
            setIsPublishing(false);
            setIsPublished(true);
            alert(`Results for ${examTerm} have been published!`);
        }, 1500);
    };

    const topPerformers = [
        { name: 'Karan Singh', class: '12th Sci', percentage: '98.5%', rank: 1 },
        { name: 'Neha Gupta', class: '8th B', percentage: '97.2%', rank: 2 },
        { name: 'Rohan Sharma', class: '10th A', percentage: '96.8%', rank: 3 },
    ];

    const classPerformance = [
        { class: '12th Science', avg: 88, passRate: 98, status: 'excellent' },
        { class: '10th A', avg: 85, passRate: 95, status: 'good' },
        { class: '11th Commerce', avg: 78, passRate: 85, status: 'average' },
        { class: '8th B', avg: 62, passRate: 68, status: 'poor' },
    ];

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Award className="w-6 h-6 mr-2 text-primary-600" /> Academic Results
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Analyze school-wide academic performance and exam results.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <select 
                        value={examTerm}
                        onChange={(e) => setExamTerm(e.target.value)}
                        className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                        <option value="Mid-Term 2026">Mid-Term 2026</option>
                        <option value="Unit Test 1 (2026)">Unit Test 1 (2026)</option>
                        <option value="Final Exams 2025">Final Exams 2025</option>
                    </select>
                    <button className="px-4 py-2 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-colors shadow-sm">
                        Publish Results
                    </button>
                </div>
            </div>

            {/* High-level Academic Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-6 rounded-2xl shadow-sm text-white col-span-1 md:col-span-2 flex justify-between items-center">
                    <div>
                        <p className="text-sm font-bold text-primary-100 uppercase tracking-wider mb-1">Overall Pass Percentage</p>
                        <span className="text-5xl font-black">92.4%</span>
                        <p className="text-sm font-medium text-primary-200 mt-2 flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" /> +2.1% compared to last term
                        </p>
                    </div>
                    <div className="hidden sm:block">
                        <Award className="w-24 h-24 text-white opacity-20" />
                    </div>
                </div>
                
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">School Average Score</p>
                    <span className="text-3xl font-black text-gray-900">78.5%</span>
                </div>
                
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Total Distinctions</p>
                    <span className="text-3xl font-black text-gray-900">412</span>
                    <p className="text-xs text-gray-400 font-bold mt-1">Students scoring &gt;85%</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Class Performance Analysis */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <h3 className="font-bold text-gray-900 flex items-center">
                            <BookOpen className="w-4 h-4 mr-2 text-gray-500" /> Class-wise Performance
                        </h3>
                        <button className="text-xs font-bold text-primary-600 hover:text-primary-800 flex items-center">
                            <Download className="w-3 h-3 mr-1" /> Export Data
                        </button>
                    </div>
                    
                    <div className="p-4 sm:p-6 space-y-6">
                        {classPerformance.map((cls, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between group">
                                <div className="w-full sm:w-1/3 mb-2 sm:mb-0">
                                    <h4 className="font-bold text-gray-900">{cls.class}</h4>
                                    <p className="text-xs text-gray-500">Class Avg: {cls.avg}%</p>
                                </div>
                                <div className="w-full sm:w-1/2 px-0 sm:px-4 mb-2 sm:mb-0">
                                    <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                                        <span>Pass Rate</span>
                                        <span>{cls.passRate}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full ${
                                                cls.status === 'excellent' ? 'bg-green-500' :
                                                cls.status === 'good' ? 'bg-blue-500' :
                                                cls.status === 'average' ? 'bg-orange-500' : 'bg-red-500'
                                            }`} 
                                            style={{ width: `${cls.passRate}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="w-full sm:w-auto text-right">
                                    <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                                        cls.status === 'excellent' ? 'bg-green-100 text-green-700' :
                                        cls.status === 'good' ? 'bg-blue-100 text-blue-700' :
                                        cls.status === 'average' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        {cls.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Alert for poor performance */}
                    <div className="mx-6 mb-6 p-4 bg-orange-50 border border-orange-100 rounded-xl flex items-start">
                        <AlertCircle className="w-5 h-5 text-orange-500 mr-3 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-bold text-orange-900">Attention Required: 8th B</h4>
                            <p className="text-xs text-orange-700 mt-1">Pass percentage has dropped significantly compared to last term. Consider meeting with the class teacher.</p>
                        </div>
                    </div>
                </div>

                {/* Toppers & Honors */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-yellow-50 to-white">
                            <h3 className="font-bold text-gray-900 flex items-center">
                                <Award className="w-4 h-4 mr-2 text-yellow-500" /> School Toppers
                            </h3>
                        </div>
                        <div className="p-2 space-y-1">
                            {topPerformers.map((topper, i) => (
                                <div key={i} className="flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm mr-3 ${
                                        topper.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                                        topper.rank === 2 ? 'bg-gray-200 text-gray-700' :
                                        'bg-orange-100 text-orange-800'
                                    }`}>
                                        #{topper.rank}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-gray-900">{topper.name}</h4>
                                        <p className="text-xs text-gray-500">{topper.class}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-black text-gray-900">{topper.percentage}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Result Publishing Control */}
                    <div className={`bg-white rounded-2xl shadow-sm border ${isPublished ? 'border-green-200 bg-green-50/30' : 'border-gray-100'} p-6 text-center transition-colors`}>
                        {isPublished ? (
                            <>
                                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                                <h3 className="font-bold text-gray-900 mb-2">Results Published!</h3>
                                <p className="text-xs text-gray-600 mb-4">The results for {examTerm} have been successfully published and are now visible to all students and parents.</p>
                                <button disabled className="w-full py-2 bg-gray-200 text-gray-500 rounded-lg text-sm font-bold cursor-not-allowed">
                                    Published
                                </button>
                            </>
                        ) : (
                            <>
                                <CheckCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <h3 className="font-bold text-gray-900 mb-2">Results are ready</h3>
                                <p className="text-xs text-gray-500 mb-4">All teachers have submitted their marks for {examTerm}. You can now publish them to students.</p>
                                <button 
                                    onClick={handlePublish}
                                    disabled={isPublishing}
                                    className={`w-full py-2 rounded-lg text-sm font-bold transition-colors ${
                                        isPublishing 
                                        ? 'bg-primary-400 text-white cursor-wait' 
                                        : 'bg-gray-900 text-white hover:bg-black'
                                    }`}
                                >
                                    {isPublishing ? 'Publishing...' : 'Publish to Student Portal'}
                                </button>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PrincipalAcademicResult;
