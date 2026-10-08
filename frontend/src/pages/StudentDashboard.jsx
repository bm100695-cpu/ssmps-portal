import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, CalendarCheck, Award, Bell } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass, gradient }) => (
    <div className={`rounded-xl shadow-sm p-6 flex items-center border border-gray-100 ${gradient} text-white`}>
        <div className="p-4 rounded-full bg-white bg-opacity-20 mr-4">
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <p className="text-sm font-medium opacity-90">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
        </div>
    </div>
);

const StudentDashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Hello, {user.fullName}! 👋</h1>
                    <p className="text-gray-500 mt-1">Ready for another great day of learning?</p>
                </div>
                <div className="hidden sm:block text-right">
                    <p className="text-sm text-gray-400">Current Class</p>
                    <p className="font-bold text-emerald-600">Class 10 - A</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard title="Attendance" value="98%" icon={CalendarCheck} gradient="bg-gradient-to-r from-emerald-500 to-teal-500" />
                <StatCard title="Pending Homework" value="3 Tasks" icon={BookOpen} gradient="bg-gradient-to-r from-orange-400 to-rose-400" />
                <StatCard title="Recent Result" value="Grade A" icon={Award} gradient="bg-gradient-to-r from-blue-500 to-indigo-500" />
                <StatCard title="School Notices" value="2 New" icon={Bell} gradient="bg-gradient-to-r from-purple-500 to-pink-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                
                {/* Timetable Snippet */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Timetable</h3>
                    <div className="space-y-3">
                        <div className="flex items-center p-4 bg-gray-50 rounded-xl border-l-4 border-emerald-500">
                            <div className="w-24 text-sm font-bold text-gray-600">09:00 AM</div>
                            <div className="flex-1 ml-4">
                                <p className="font-bold text-gray-800">Mathematics</p>
                                <p className="text-xs text-gray-500">Mr. Anderson • Room 102</p>
                            </div>
                        </div>
                        <div className="flex items-center p-4 bg-gray-50 rounded-xl border-l-4 border-blue-500">
                            <div className="w-24 text-sm font-bold text-gray-600">10:00 AM</div>
                            <div className="flex-1 ml-4">
                                <p className="font-bold text-gray-800">Science Lab</p>
                                <p className="text-xs text-gray-500">Mrs. Jenkins • Lab 3</p>
                            </div>
                        </div>
                        <div className="flex items-center p-4 bg-gray-50 rounded-xl border-l-4 border-orange-500 opacity-70">
                            <div className="w-24 text-sm font-bold text-gray-600">11:00 AM</div>
                            <div className="flex-1 ml-4">
                                <p className="font-bold text-gray-800">Recess</p>
                                <p className="text-xs text-gray-500">Cafeteria</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Homework Deadlines */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Upcoming Deadlines</h3>
                    <ul className="space-y-4">
                        <li className="flex flex-col p-3 bg-rose-50 rounded-lg border border-rose-100">
                            <span className="font-semibold text-rose-800">Physics Essay</span>
                            <span className="text-xs text-rose-600 mt-1">Due: Tomorrow, 9:00 AM</span>
                        </li>
                        <li className="flex flex-col p-3 bg-amber-50 rounded-lg border border-amber-100">
                            <span className="font-semibold text-amber-800">Math Worksheet 5</span>
                            <span className="text-xs text-amber-600 mt-1">Due: Friday, 12:00 PM</span>
                        </li>
                        <li className="flex flex-col p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <span className="font-semibold text-blue-800">History Project</span>
                            <span className="text-xs text-blue-600 mt-1">Due: Next Monday</span>
                        </li>
                    </ul>
                    <button className="mt-4 w-full text-center text-sm text-emerald-600 font-medium hover:text-emerald-700">
                        View All Homework
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
