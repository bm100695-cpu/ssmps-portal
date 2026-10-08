import React, { useState } from 'react';
import { Calendar as CalendarIcon, CheckCircle, XCircle, Clock, AlertTriangle, TrendingUp } from 'lucide-react';

const ParentAttendance = () => {
    // Generate dummy attendance for the child
    const [attendanceData] = useState(() => {
        const data = {};
        for (let i = 1; i <= 28; i++) {
            if ([5, 6, 12, 13, 19, 20, 26, 27].includes(i)) continue; 
            
            if (i === 12) {
                data[i] = { status: 'absent', reason: 'Sick Leave' };
            } else if (i === 24) {
                data[i] = { status: 'absent', reason: 'Unexcused' };
            } else if (i === 15) {
                data[i] = { status: 'late', reason: 'Bus Delayed' };
            } else {
                data[i] = { status: 'present' };
            }
        }
        return data;
    });

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Attendance Record</h1>
                    <p className="text-sm text-gray-500 mt-1">Monitor your child's daily attendance and apply for leaves.</p>
                </div>
                <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-md">
                    Apply Leave
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Calendar View */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <CalendarIcon className="w-5 h-5 text-gray-500" />
                            <h2 className="font-bold text-gray-800 text-lg">October 2026</h2>
                        </div>
                        <div className="flex space-x-2">
                            <button className="p-1 hover:bg-gray-200 rounded">&lt;</button>
                            <button className="p-1 hover:bg-gray-200 rounded">&gt;</button>
                        </div>
                    </div>
                    
                    <div className="p-4 sm:p-6">
                        <div className="grid grid-cols-7 gap-1 sm:gap-4 text-center mb-2 sm:mb-4">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="text-xs font-bold text-gray-400 uppercase">{day}</div>
                            ))}
                        </div>
                        
                        <div className="grid grid-cols-7 gap-1 sm:gap-4 text-center">
                            {/* Empty days for offset (assuming month starts on Thursday) */}
                            <div className="p-2 sm:p-4"></div>
                            <div className="p-2 sm:p-4"></div>
                            <div className="p-2 sm:p-4"></div>
                            <div className="p-2 sm:p-4"></div>
                            
                            {[...Array(31)].map((_, i) => {
                                const day = i + 1;
                                const isWeekend = [4, 5, 11, 12, 18, 19, 25, 26].includes(day+3); // Just dummy math for weekends
                                const record = attendanceData[day];
                                
                                let bgClass = "bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-100"; // default/future
                                
                                if (isWeekend) {
                                    bgClass = "bg-gray-100 text-gray-400";
                                } else if (record) {
                                    if (record.status === 'present') bgClass = "bg-green-50 text-green-700 border border-green-200 font-bold shadow-sm";
                                    else if (record.status === 'absent') bgClass = "bg-red-50 text-red-700 border border-red-200 font-bold shadow-sm";
                                    else if (record.status === 'late') bgClass = "bg-yellow-50 text-yellow-700 border border-yellow-200 font-bold shadow-sm";
                                }
                                
                                return (
                                    <div key={day} className={`p-2 sm:p-4 rounded-lg flex flex-col items-center justify-center transition-colors cursor-pointer group relative ${bgClass}`}>
                                        <span className="text-sm sm:text-base">{day}</span>
                                        {record && record.status === 'absent' && <XCircle className="w-3 h-3 text-red-500 mt-1" />}
                                        {record && record.status === 'present' && <CheckCircle className="w-3 h-3 text-green-500 mt-1" />}
                                        
                                        {record && record.reason && (
                                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-10 transition-opacity">
                                                {record.reason}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Stats & History */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-4 border-b pb-2">Monthly Stats</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-green-50 p-4 rounded-lg border border-green-100 text-center">
                                <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-1" />
                                <p className="text-2xl font-black text-green-700">18</p>
                                <p className="text-xs font-bold text-green-600 uppercase">Present</p>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg border border-red-100 text-center">
                                <XCircle className="w-6 h-6 text-red-500 mx-auto mb-1" />
                                <p className="text-2xl font-black text-red-700">2</p>
                                <p className="text-xs font-bold text-red-600 uppercase">Absent</p>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-bold text-gray-700">Total Attendance</span>
                                <span className="text-sm font-bold text-primary-600">90%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-4 border-b pb-2">Recent Absences</h3>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="p-2 bg-red-50 text-red-600 rounded-lg mr-3">
                                    <XCircle className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Oct 24, 2026</p>
                                    <p className="text-xs text-gray-500">Unexcused Absence (Action Required)</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="p-2 bg-red-50 text-red-600 rounded-lg mr-3">
                                    <XCircle className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Oct 12, 2026</p>
                                    <p className="text-xs text-gray-500">Sick Leave (Approved)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentAttendance;
