import React, { useState } from 'react';
import { Calendar, Users, GraduationCap, AlertCircle, BarChart3, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

const PrincipalAttendance = () => {
    const [activeTab, setActiveTab] = useState('Overview');

    const lowAttendanceClasses = [
        { class: '8th B', percentage: 78, absent: 12, teacher: 'Neha Gupta' },
        { class: '11th Com', percentage: 82, absent: 8, teacher: 'Sanjay Patel' }
    ];

    return (
        <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Master Attendance Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">Monitor real-time attendance for all students and staff members.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <BarChart3 className="w-24 h-24" />
                    </div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">School Overall</p>
                    <div className="flex items-end space-x-2">
                        <span className="text-4xl font-black text-gray-900">92.5%</span>
                        <span className="text-sm font-bold text-green-500 flex items-center pb-1"><TrendingUp className="w-4 h-4 mr-1" /> +1.2%</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">vs yesterday</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 rounded-2xl shadow-sm border border-blue-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">Total Students</p>
                            <span className="text-4xl font-black text-blue-900">94%</span>
                            <p className="text-sm font-medium text-blue-700 mt-2">1,245 / 1,320 Present</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <GraduationCap className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-6 rounded-2xl shadow-sm border border-purple-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-2">Total Staff</p>
                            <span className="text-4xl font-black text-purple-900">98%</span>
                            <p className="text-sm font-medium text-purple-700 mt-2">49 / 50 Present</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Main Graph Area (Placeholder) */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-[400px]">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-bold text-gray-900">Attendance Trend (This Week)</h2>
                        <select className="bg-gray-50 border border-gray-200 text-sm font-medium text-gray-600 rounded-lg px-3 py-1.5 focus:outline-none">
                            <option>All School</option>
                            <option>Students Only</option>
                            <option>Staff Only</option>
                        </select>
                    </div>
                    <div className="flex-1 flex items-end justify-between px-2 sm:px-6">
                        {/* Fake Bar Chart */}
                        {[88, 92, 94, 91, 95].map((height, i) => (
                            <div key={i} className="flex flex-col items-center w-full max-w-[40px] group">
                                <span className="text-xs font-bold text-gray-400 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">{height}%</span>
                                <div className="w-full bg-primary-100 rounded-t-lg relative flex items-end" style={{ height: '250px' }}>
                                    <div 
                                        className="w-full bg-primary-500 rounded-t-lg transition-all duration-1000" 
                                        style={{ height: `${height}%` }}
                                    ></div>
                                </div>
                                <span className="text-xs font-bold text-gray-500 mt-3">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Alerts Area */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="font-bold text-gray-900 mb-6 flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2 text-orange-500" /> Attention Required
                    </h2>
                    
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Classes with Low Attendance</h3>
                        
                        {lowAttendanceClasses.map((item, index) => (
                            <div key={index} className="p-4 rounded-xl border border-orange-100 bg-orange-50/50">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-gray-900">{item.class}</span>
                                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-orange-100 text-orange-700">{item.percentage}%</span>
                                </div>
                                <p className="text-xs text-gray-600 mb-3"><span className="font-bold">{item.absent} students</span> absent today.</p>
                                <div className="flex justify-between items-center pt-3 border-t border-orange-100/50">
                                    <span className="text-[10px] text-gray-500 uppercase font-bold">Class Teacher: {item.teacher}</span>
                                    <button className="text-xs font-bold text-orange-600 hover:text-orange-800">Alert →</button>
                                </div>
                            </div>
                        ))}

                        <button className="w-full mt-4 py-2.5 rounded-lg border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                            View Detailed Reports
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Actions List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-gray-900">Attendance Registers</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                    <div className="p-6 hover:bg-blue-50/30 transition-colors cursor-pointer group">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">Class-wise Students</h4>
                        <p className="text-sm text-gray-500 mb-4">View detailed attendance logs for every class and section.</p>
                        <span className="text-sm font-bold text-blue-600 flex items-center">Open Register <ArrowRight className="w-4 h-4 ml-1" /></span>
                    </div>
                    <div className="p-6 hover:bg-purple-50/30 transition-colors cursor-pointer group">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                            <Users className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">Teaching & Non-Teaching Staff</h4>
                        <p className="text-sm text-gray-500 mb-4">Check leaves, half-days, and detailed staff attendance logs.</p>
                        <span className="text-sm font-bold text-purple-600 flex items-center">Open Register <ArrowRight className="w-4 h-4 ml-1" /></span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PrincipalAttendance;
