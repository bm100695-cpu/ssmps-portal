import React, { useState } from 'react';
import { Activity, Trophy, Users, Star, ArrowRight, CheckCircle, PlusCircle } from 'lucide-react';

const StudentActivity = () => {
    const [activeTab, setActiveTab] = useState('My Activities');

    const [myActivities, setMyActivities] = useState([
        { id: 1, title: 'Science Club', role: 'Member', status: 'Active', nextEvent: 'Robotics Workshop (Oct 15)', icon: Users, color: 'blue' },
        { id: 2, title: 'Football Team', role: 'Captain', status: 'Active', nextEvent: 'Inter-School Match (Oct 20)', icon: Trophy, color: 'green' },
    ]);

    const [upcomingActivities, setUpcomingActivities] = useState([
        { id: 3, title: 'Annual Drama Play', category: 'Arts', date: 'Registration closes Nov 1', students: '45 joined', icon: Star, color: 'purple' },
        { id: 4, title: 'Chess Tournament', category: 'Sports', date: 'Trials on Oct 25', students: '12 joined', icon: Activity, color: 'yellow' },
        { id: 5, title: 'Coding Hackathon', category: 'Technology', date: 'Starts Nov 10', students: '28 joined', icon: Star, color: 'blue' },
    ]);

    const handleJoin = (activityToJoin) => {
        // Move from upcoming to myActivities
        setUpcomingActivities(upcomingActivities.filter(a => a.id !== activityToJoin.id));
        setMyActivities([
            ...myActivities, 
            { 
                id: activityToJoin.id, 
                title: activityToJoin.title, 
                role: 'New Member', 
                status: 'Active', 
                nextEvent: 'Orientation Pending', 
                icon: activityToJoin.icon, 
                color: activityToJoin.color 
            }
        ]);
        alert(`Congratulations! You are now a member of the ${activityToJoin.title}.`);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Co-Curricular Activities</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your clubs, sports, and extra-curricular participations.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm border border-gray-100 w-fit">
                <button 
                    onClick={() => setActiveTab('My Activities')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'My Activities' ? 'bg-primary-50 text-primary-700 shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                >
                    My Activities
                </button>
                <button 
                    onClick={() => setActiveTab('Explore New')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'Explore New' ? 'bg-primary-50 text-primary-700 shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                >
                    Explore New
                </button>
            </div>

            {activeTab === 'My Activities' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myActivities.map(activity => {
                        const Icon = activity.icon;
                        return (
                            <div key={activity.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow relative overflow-hidden">
                                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 -mr-8 -mt-8 ${
                                    activity.color === 'blue' ? 'bg-blue-500' : 'bg-green-500'
                                }`}></div>
                                <div className="flex items-center justify-between mb-4 relative z-10">
                                    <div className={`p-3 rounded-xl ${
                                        activity.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                                    }`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full flex items-center">
                                        <CheckCircle className="w-3 h-3 mr-1" /> {activity.status}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{activity.title}</h3>
                                <p className="text-sm font-medium text-gray-500 mt-1">Role: <span className="text-gray-800">{activity.role}</span></p>
                                
                                <div className="mt-6 pt-4 border-t border-gray-100 relative z-10">
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Upcoming Event</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-primary-700">{activity.nextEvent}</p>
                                        <button className="text-primary-600 hover:text-primary-800"><ArrowRight className="w-5 h-5"/></button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {upcomingActivities.map(activity => {
                        const Icon = activity.icon;
                        return (
                            <div key={activity.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col hover:border-primary-300 transition-colors">
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                                        activity.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                                        activity.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-blue-100 text-blue-700'
                                    }`}>
                                        {activity.category}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900">{activity.title}</h3>
                                    <p className="text-sm text-gray-500 mt-2 flex items-center"><Users className="w-4 h-4 mr-1.5" /> {activity.students}</p>
                                    <p className="text-sm font-medium text-red-500 mt-2">{activity.date}</p>
                                </div>
                                
                                <button onClick={() => handleJoin(activity)} className="mt-6 w-full flex items-center justify-center px-4 py-2 bg-gray-50 text-gray-700 rounded-lg font-bold hover:bg-primary-600 hover:text-white transition-colors border border-gray-200">
                                    <PlusCircle className="w-4 h-4 mr-2" />
                                    Join Activity
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default StudentActivity;
