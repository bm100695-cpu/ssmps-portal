import React from 'react';
import { Users, UserCheck, CreditCard, Bus } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-center border border-gray-100">
        <div className={`p-4 rounded-full ${colorClass} mr-4`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
    </div>
);

const AdminDashboard = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard title="Total Students" value="1,240" icon={Users} colorClass="bg-blue-500" />
                <StatCard title="Total Teachers" value="84" icon={UserCheck} colorClass="bg-green-500" />
                <StatCard title="Fee Collection" value="$12,400" icon={CreditCard} colorClass="bg-purple-500" />
                <StatCard title="Active Buses" value="12" icon={Bus} colorClass="bg-orange-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                {/* Placeholder for Charts */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[300px] flex items-center justify-center">
                    <p className="text-gray-500 italic">Attendance Chart will go here</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[300px] flex items-center justify-center">
                    <p className="text-gray-500 italic">Revenue Chart will go here</p>
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activities</h3>
                <ul className="space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                        <li key={item} className="flex items-center text-sm">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                            <span className="text-gray-600 flex-1">New student registration: John Doe (Grade 10)</span>
                            <span className="text-gray-400 text-xs">2 hours ago</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;
