import React, { useState } from 'react';
import { User, Award, Calendar, Book, Clock, MapPin, Activity, ChevronRight, PhoneCall } from 'lucide-react';

const ParentMyChild = () => {
    // Dummy data for child
    const child = {
        name: 'Alice Smith',
        class: '10-A',
        roll: '2026101',
        dob: '15 Aug 2010',
        bloodGroup: 'O+',
        teacher: 'Mr. Sharma',
        photo: `https://ui-avatars.com/api/?name=Alice+Smith&background=4f46e5&color=fff&size=128`,
        stats: {
            attendance: '92%',
            grade: 'A+',
            rank: '3rd',
            behavior: 'Excellent'
        }
    };

    const recentActivities = [
        { id: 1, title: 'Math Homework Submitted', time: 'Today, 10:30 AM', type: 'academic', icon: Book, color: 'blue' },
        { id: 2, title: 'Joined Coding Hackathon', time: 'Yesterday', type: 'activity', icon: Activity, color: 'purple' },
        { id: 3, title: 'Scored 95/100 in Science Test', time: 'Oct 05, 2026', type: 'result', icon: Award, color: 'green' },
    ];

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Child Profile</h1>
                    <p className="text-sm text-gray-500 mt-1">Overview of your child's academic performance and activities.</p>
                </div>
                <button className="flex items-center px-4 py-2 bg-white text-primary-600 border border-primary-200 rounded-lg font-medium hover:bg-primary-50 transition-colors shadow-sm">
                    <PhoneCall className="w-4 h-4 mr-2" />
                    Contact Teacher
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: ID & Stats */}
                <div className="lg:col-span-1 space-y-6">
                    {/* ID Card Style Profile */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-center relative pt-12 pb-6 px-6">
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary-500 to-primary-700"></div>
                        <div className="relative mx-auto w-24 h-24 rounded-full border-4 border-white shadow-md mb-4 bg-white z-10">
                            <img src={child.photo} alt="Child" className="w-full h-full rounded-full object-cover" />
                        </div>
                        <h2 className="text-xl font-black text-gray-900">{child.name}</h2>
                        <p className="text-sm font-medium text-primary-600 uppercase tracking-wide mb-4">Class {child.class} • Roll {child.roll}</p>
                        
                        <div className="flex justify-center space-x-2 text-xs font-bold text-gray-500 mb-6">
                            <span className="bg-gray-100 px-3 py-1 rounded-full">{child.dob}</span>
                            <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full">{child.bloodGroup}</span>
                        </div>

                        <div className="border-t border-gray-100 pt-4 text-sm font-medium text-gray-600 text-left">
                            <div className="flex justify-between py-2">
                                <span>Class Teacher:</span>
                                <span className="text-gray-900 font-bold">{child.teacher}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span>Bus Route:</span>
                                <span className="text-gray-900 font-bold">Route 4 (Morning)</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                            <p className="text-xs font-bold text-gray-400 uppercase">Attendance</p>
                            <p className="text-2xl font-black text-primary-600 mt-1">{child.stats.attendance}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                            <p className="text-xs font-bold text-gray-400 uppercase">Overall Grade</p>
                            <p className="text-2xl font-black text-green-500 mt-1">{child.stats.grade}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                            <p className="text-xs font-bold text-gray-400 uppercase">Class Rank</p>
                            <p className="text-2xl font-black text-yellow-500 mt-1">{child.stats.rank}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                            <p className="text-xs font-bold text-gray-400 uppercase">Behavior</p>
                            <p className="text-lg font-black text-blue-500 mt-1.5">{child.stats.behavior}</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Activity Timeline & Details */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Performance Overview Chart Placeholder */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-gray-900">Academic Progress</h3>
                            <button className="text-sm font-bold text-primary-600 hover:text-primary-800">View Full Report</button>
                        </div>
                        <div className="h-48 flex items-end justify-between px-2 sm:px-6">
                            {/* Dummy Bar Chart */}
                            <div className="w-1/6 bg-gray-100 rounded-t-lg relative group h-[70%]">
                                <div className="absolute inset-x-0 bottom-0 bg-primary-300 rounded-t-lg transition-all h-full group-hover:bg-primary-400"></div>
                                <span className="absolute -bottom-6 w-full text-center text-xs font-bold text-gray-500">Unit 1</span>
                            </div>
                            <div className="w-1/6 bg-gray-100 rounded-t-lg relative group h-[85%]">
                                <div className="absolute inset-x-0 bottom-0 bg-primary-400 rounded-t-lg transition-all h-full group-hover:bg-primary-500"></div>
                                <span className="absolute -bottom-6 w-full text-center text-xs font-bold text-gray-500">Mid-Term</span>
                            </div>
                            <div className="w-1/6 bg-gray-100 rounded-t-lg relative group h-[75%]">
                                <div className="absolute inset-x-0 bottom-0 bg-primary-300 rounded-t-lg transition-all h-full group-hover:bg-primary-400"></div>
                                <span className="absolute -bottom-6 w-full text-center text-xs font-bold text-gray-500">Unit 2</span>
                            </div>
                            <div className="w-1/6 bg-gray-100 rounded-t-lg relative group h-[92%]">
                                <div className="absolute inset-x-0 bottom-0 bg-primary-500 rounded-t-lg transition-all h-full shadow-[0_0_15px_rgba(79,70,229,0.3)]"></div>
                                <span className="absolute -bottom-6 w-full text-center text-xs font-bold text-gray-800">Finals</span>
                            </div>
                        </div>
                        <div className="mt-8 pt-4 border-t border-gray-100 text-center">
                            <p className="text-sm text-gray-600">Your child's performance has improved by <span className="font-bold text-green-500">12%</span> since the last semester.</p>
                        </div>
                    </div>

                    {/* Recent Activity Timeline */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-6">Recent Activity Log</h3>
                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                            {recentActivities.map((activity) => {
                                const Icon = activity.icon;
                                return (
                                    <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${
                                            activity.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                                            activity.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                                            'bg-green-100 text-green-600'
                                        }`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 bg-gray-50 shadow-sm transition-all hover:bg-white hover:shadow-md">
                                            <div className="flex items-center justify-between space-x-2 mb-1">
                                                <div className="font-bold text-gray-900 text-sm">{activity.title}</div>
                                            </div>
                                            <div className="text-xs font-medium text-gray-500">{activity.time}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <button className="w-full mt-6 py-2.5 rounded-lg text-sm font-bold text-primary-600 bg-primary-50 hover:bg-primary-100 transition-colors">
                            View Full Timeline
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ParentMyChild;
