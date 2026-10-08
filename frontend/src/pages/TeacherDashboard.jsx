import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Users, BookOpen, CalendarCheck, FileText, Clock, ChevronRight, CheckCircle, Bell, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, colorClass, subtitle }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center hover:shadow-md transition-all group overflow-hidden relative">
        <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 transition-transform group-hover:scale-150 duration-500 ${colorClass.replace('text-', 'bg-')}`}></div>
        <div className={`p-4 rounded-xl ${colorClass.replace('text-', 'bg-').replace('600', '100')} mr-5 group-hover:scale-110 transition-transform`}>
            <Icon className={`w-7 h-7 ${colorClass}`} />
        </div>
        <div className="z-10">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
            <h3 className="text-3xl font-black text-gray-900 leading-none">{value}</h3>
            {subtitle && <p className="text-[10px] font-bold text-gray-400 mt-1">{subtitle}</p>}
        </div>
    </div>
);

const TeacherDashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            {/* Header Area */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute left-0 bottom-0 w-48 h-48 bg-blue-400 opacity-20 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <p className="text-blue-200 font-bold tracking-wider uppercase text-sm mb-1">Teacher Workspace</p>
                        <h1 className="text-3xl md:text-4xl font-black mb-2">Welcome back, {user.fullName}!</h1>
                        <p className="text-blue-100 font-medium opacity-90 max-w-xl">
                            You have 3 classes scheduled today and 12 homework submissions waiting for your review. Let's make it a great day of learning!
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 rounded-xl font-bold transition-all flex items-center">
                            <Bell className="w-5 h-5 mr-2" /> View Alerts
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard title="My Class (10-A)" value="42" icon={Users} colorClass="text-blue-600" subtitle="2 absent today" />
                <StatCard title="Pending Review" value="12" icon={BookOpen} colorClass="text-orange-500" subtitle="Homework & Assignments" />
                <StatCard title="Today's Attendance" value="95%" icon={CalendarCheck} colorClass="text-green-600" subtitle="Class 10-A" />
                <StatCard title="New Notices" value="3" icon={FileText} colorClass="text-purple-600" subtitle="From Principal's Desk" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* Left Column - Timetable */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h3 className="font-bold text-gray-900 flex items-center">
                                <Clock className="w-5 h-5 mr-2 text-primary-600" /> Today's Schedule
                            </h3>
                            <Link to="/teacher/timetable" className="text-xs font-bold text-primary-600 hover:text-primary-800">
                                View Full Timetable
                            </Link>
                        </div>
                        <div className="p-2 space-y-2">
                            <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100 opacity-60">
                                <div className="w-24 shrink-0 text-center border-r border-gray-200 pr-4 mr-4">
                                    <p className="font-bold text-gray-800 text-sm">09:00 AM</p>
                                    <p className="text-xs font-medium text-gray-500">45 mins</p>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-800 text-lg">Mathematics</h4>
                                    <p className="text-sm font-medium text-gray-500">Class 10-A • Room 102</p>
                                </div>
                                <div className="hidden sm:block">
                                    <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs font-bold rounded-lg flex items-center">
                                        <CheckCircle className="w-3 h-3 mr-1" /> Completed
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center p-4 bg-blue-50/50 rounded-xl border border-blue-200 relative overflow-hidden group hover:shadow-md transition-all">
                                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500"></div>
                                <div className="w-24 shrink-0 text-center border-r border-blue-200 pr-4 mr-4">
                                    <p className="font-bold text-blue-900 text-sm animate-pulse">10:00 AM</p>
                                    <p className="text-xs font-medium text-blue-700">Ongoing</p>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-blue-900 text-lg">Physics</h4>
                                    <p className="text-sm font-medium text-blue-700">Class 10-B • Science Lab</p>
                                </div>
                                <div>
                                    <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
                                        Mark Attendance
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center p-4 bg-white rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-sm transition-all group cursor-pointer">
                                <div className="w-24 shrink-0 text-center border-r border-gray-100 pr-4 mr-4">
                                    <p className="font-bold text-gray-900 text-sm">11:30 AM</p>
                                    <p className="text-xs font-medium text-gray-500">Upcoming</p>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 text-lg">Algebra Revision</h4>
                                    <p className="text-sm font-medium text-gray-500">Class 9-C • Room 204</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary-500 transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Tasks & Insights */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-5 border-b border-gray-100 bg-orange-50/50 flex justify-between items-center">
                            <h3 className="font-bold text-orange-900 flex items-center">
                                <BookOpen className="w-5 h-5 mr-2 text-orange-600" /> Pending Review
                            </h3>
                            <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-bold">12 Tasks</span>
                        </div>
                        <div className="p-2">
                            {[
                                { title: 'Trigonometry Worksheet', class: 'Class 10-A', due: 'Submitted Today' },
                                { title: 'Physics Lab Report', class: 'Class 10-B', due: 'Submitted Yesterday' },
                                { title: 'Math Unit Test Copies', class: 'Class 9-C', due: 'Pending 3 Days' }
                            ].map((task, i) => (
                                <div key={i} className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-xl transition-colors border-b border-gray-50 last:border-0 group cursor-pointer">
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">{task.title}</p>
                                        <p className="text-xs font-medium text-gray-500 mt-1">{task.class} • {task.due}</p>
                                    </div>
                                    <button className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange-100">
                                        Review
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-sm border border-purple-100 p-6">
                        <h3 className="font-bold text-purple-900 mb-2 flex items-center">
                            <Star className="w-5 h-5 mr-2 text-purple-500" /> Quick Actions
                        </h3>
                        <p className="text-sm text-purple-700 mb-4">Jump directly to your most used tools.</p>
                        <div className="grid grid-cols-2 gap-3">
                            <Link to="/teacher/homework" className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-purple-100 hover:border-purple-300 hover:shadow-sm transition-all text-center">
                                <BookOpen className="w-6 h-6 text-purple-600 mb-2" />
                                <span className="text-xs font-bold text-purple-900">Assign<br/>Homework</span>
                            </Link>
                            <Link to="/teacher/attendance" className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-purple-100 hover:border-purple-300 hover:shadow-sm transition-all text-center">
                                <CalendarCheck className="w-6 h-6 text-purple-600 mb-2" />
                                <span className="text-xs font-bold text-purple-900">Mark<br/>Attendance</span>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TeacherDashboard;
