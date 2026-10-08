import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Users, UserCheck, Activity, DollarSign, AlertCircle } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass, subtitle }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col border border-gray-100 relative overflow-hidden group">
        <div className="flex items-center justify-between z-10">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">{value}</h3>
            </div>
            <div className={`p-4 rounded-full ${colorClass}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
        </div>
        {subtitle && <p className="text-xs text-gray-400 mt-4 z-10">{subtitle}</p>}
        {/* Subtle background decoration */}
        <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-10 transition-transform group-hover:scale-150 ${colorClass}`}></div>
    </div>
);

const PrincipalDashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Welcome back, Principal {user.fullName.split(' ')[0]}!</h1>
                    <p className="text-slate-500">Here's the summary of the school today.</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard title="Total Students Enrolled" value="1,240" icon={Users} colorClass="bg-blue-500" subtitle="+12 this month" />
                <StatCard title="Total Teachers Active" value="84" icon={UserCheck} colorClass="bg-indigo-500" subtitle="2 on leave today" />
                <StatCard title="Average Attendance" value="94.2%" icon={Activity} colorClass="bg-emerald-500" subtitle="Compared to 92% last week" />
                <StatCard title="Pending Complaints" value="5" icon={AlertCircle} colorClass="bg-rose-500" subtitle="Requires immediate attention" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Staff Attendance Snippet */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-800">Teacher Attendance Status (Today)</h3>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-xs text-gray-400 uppercase tracking-wider border-b">
                                    <th className="pb-3 font-medium">Teacher</th>
                                    <th className="pb-3 font-medium">Class/Subject</th>
                                    <th className="pb-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                <tr>
                                    <td className="py-3 font-medium text-gray-800">Sarah Jenkins</td>
                                    <td className="py-3 text-gray-500 text-sm">Class 10 - Science</td>
                                    <td className="py-3"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-semibold">Present</span></td>
                                </tr>
                                <tr>
                                    <td className="py-3 font-medium text-gray-800">Michael Ross</td>
                                    <td className="py-3 text-gray-500 text-sm">Class 8 - English</td>
                                    <td className="py-3"><span className="px-2 py-1 bg-red-100 text-red-700 rounded-md text-xs font-semibold">Absent</span></td>
                                </tr>
                                <tr>
                                    <td className="py-3 font-medium text-gray-800">David Clark</td>
                                    <td className="py-3 text-gray-500 text-sm">Class 12 - Math</td>
                                    <td className="py-3"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md text-xs font-semibold">Late</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Alerts */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Action Needed</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-rose-50 border border-rose-100 rounded-lg">
                            <p className="font-semibold text-rose-800 mb-1">Parent Meeting Required</p>
                            <p className="text-xs text-rose-600">Mr. Smith (John's Father) requested a meeting regarding recent grades.</p>
                        </div>
                        <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
                            <p className="font-semibold text-amber-800 mb-1">Bus 4 Delay</p>
                            <p className="text-xs text-amber-600">Driver reported a 15-minute delay due to route traffic.</p>
                        </div>
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                            <p className="font-semibold text-slate-800 mb-1">Approve Exam Schedule</p>
                            <p className="text-xs text-slate-600">Mid-term schedule drafted by admin needs final approval.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrincipalDashboard;
