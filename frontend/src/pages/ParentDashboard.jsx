import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, BookOpen, CreditCard, MapPin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ActionCard = ({ title, desc, icon: Icon, colorClass, linkTo }) => (
    <Link to={linkTo} className="bg-white rounded-2xl shadow-sm p-6 flex flex-col border border-gray-100 hover:shadow-md transition-shadow group relative overflow-hidden">
        <div className="flex items-center justify-between z-10 mb-4">
            <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10`}>
                <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-')}`} />
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 transition-colors" />
        </div>
        <div className="z-10">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <p className="text-sm font-medium text-gray-500 mt-1">{desc}</p>
        </div>
        <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-0 group-hover:opacity-5 transition-opacity ${colorClass}`}></div>
    </Link>
);

const ParentDashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-md p-8 text-white flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Welcome, {user.fullName}!</h1>
                    <p className="text-indigo-100 mt-2 max-w-lg text-sm">
                        Stay updated on your child's academic progress, track their school bus in real-time, and manage fee payments all in one place.
                    </p>
                </div>
                <div className="hidden md:block">
                    {/* Placeholder for illustration/graphic */}
                    <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <User className="w-12 h-12 text-white" />
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <ActionCard title="Academic Profile" desc="View grades & attendance" icon={User} colorClass="bg-blue-500" linkTo="/parent/child" />
                <ActionCard title="Homework" desc="2 Pending assignments" icon={BookOpen} colorClass="bg-orange-500" linkTo="/parent/homework" />
                <ActionCard title="Fee Payment" desc="Next due: $450 (Oct 15)" icon={CreditCard} colorClass="bg-emerald-500" linkTo="/parent/fees" />
                <ActionCard title="Track Bus" desc="Bus #4 is arriving soon" icon={MapPin} colorClass="bg-purple-500" linkTo="/parent/transport" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                
                {/* Child Snapshot */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-800">Child's Snapshot</h3>
                        <Link to="/parent/child" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">View Full Profile</Link>
                    </div>
                    
                    <div className="flex items-center p-4 bg-indigo-50 rounded-xl border border-indigo-100 mb-4">
                        <div className="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xl mr-4">
                            S
                        </div>
                        <div>
                            <p className="font-bold text-indigo-900">Student Name</p>
                            <p className="text-sm text-indigo-700">Class 10 - Section A | Roll No: 12</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                            <p className="text-sm text-gray-500 mb-1">Monthly Attendance</p>
                            <p className="text-xl font-bold text-emerald-600">95%</p>
                        </div>
                        <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                            <p className="text-sm text-gray-500 mb-1">Recent Grade</p>
                            <p className="text-xl font-bold text-blue-600">A (Science)</p>
                        </div>
                    </div>
                </div>

                {/* Recent Notifications */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Recent Notifications</h3>
                    <ul className="space-y-4">
                        <li className="flex gap-4 items-start p-3 hover:bg-gray-50 rounded-xl transition-colors">
                            <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                            <div>
                                <p className="font-semibold text-gray-800 text-sm">Parent-Teacher Meeting</p>
                                <p className="text-xs text-gray-500 mt-1">Scheduled for this Saturday at 10:00 AM.</p>
                                <p className="text-xs text-gray-400 mt-2">2 hours ago</p>
                            </div>
                        </li>
                        <li className="flex gap-4 items-start p-3 hover:bg-gray-50 rounded-xl transition-colors">
                            <div className="w-2 h-2 mt-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                            <div>
                                <p className="font-semibold text-gray-800 text-sm">Fee Receipt Generated</p>
                                <p className="text-xs text-gray-500 mt-1">Receipt for September tuition has been uploaded.</p>
                                <p className="text-xs text-gray-400 mt-2">1 day ago</p>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default ParentDashboard;
