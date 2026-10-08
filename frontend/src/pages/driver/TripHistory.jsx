import React from 'react';
import { Calendar, Clock, MapPin, Users, CheckCircle, FileText, AlertTriangle, ArrowDownToLine } from 'lucide-react';

const DriverTripHistory = () => {
    // Simulated trip history data
    const tripHistory = [
        {
            id: 'TRP-1045',
            date: '06 Oct 2026',
            type: 'Morning Pickup',
            route: 'Route 4',
            startTime: '07:00 AM',
            endTime: '08:15 AM',
            duration: '1h 15m',
            studentsBoarded: 41,
            totalStudents: 42,
            distance: '15.2 km',
            status: 'On Time',
            issues: null
        },
        {
            id: 'TRP-1044',
            date: '05 Oct 2026',
            type: 'Afternoon Drop',
            route: 'Route 4',
            startTime: '02:30 PM',
            endTime: '03:55 PM',
            duration: '1h 25m',
            studentsBoarded: 42,
            totalStudents: 42,
            distance: '15.8 km',
            status: 'Delayed',
            issues: 'Heavy traffic near Green Park'
        },
        {
            id: 'TRP-1043',
            date: '05 Oct 2026',
            type: 'Morning Pickup',
            route: 'Route 4',
            startTime: '07:05 AM',
            endTime: '08:10 AM',
            duration: '1h 05m',
            studentsBoarded: 40,
            totalStudents: 42,
            distance: '14.9 km',
            status: 'On Time',
            issues: null
        },
        {
            id: 'TRP-1042',
            date: '04 Oct 2026',
            type: 'Afternoon Drop',
            route: 'Route 4',
            startTime: '02:30 PM',
            endTime: '03:40 PM',
            duration: '1h 10m',
            studentsBoarded: 42,
            totalStudents: 42,
            distance: '14.5 km',
            status: 'On Time',
            issues: null
        }
    ];

    return (
        <div className="space-y-6 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Past Trip History</h1>
                    <p className="text-sm text-gray-500 mt-1">Review your completed daily routes and attendance records.</p>
                </div>
                <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <select className="bg-transparent font-bold text-gray-700 focus:outline-none cursor-pointer">
                        <option>This Week</option>
                        <option>Last Week</option>
                        <option>This Month</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Trips (This Week)</p>
                        <p className="text-2xl font-black text-gray-900 mt-1">10</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-blue-500" />
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">On-Time Rate</p>
                        <p className="text-2xl font-black text-gray-900 mt-1">92%</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-green-500" />
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Avg Students/Trip</p>
                        <p className="text-2xl font-black text-gray-900 mt-1">41</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                        <Users className="w-6 h-6 text-purple-500" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h2 className="font-bold text-gray-800">Trip Logs</h2>
                    <button className="flex items-center text-sm font-bold text-primary-600 hover:text-primary-800 transition-colors">
                        <ArrowDownToLine className="w-4 h-4 mr-1.5" /> Export PDF
                    </button>
                </div>
                
                <div className="divide-y divide-gray-100">
                    {tripHistory.map((trip) => (
                        <div key={trip.id} className="p-5 sm:p-6 hover:bg-gray-50 transition-colors group">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                                <div className="flex items-center">
                                    <div className={`p-2.5 rounded-lg mr-4 ${trip.type === 'Morning Pickup' ? 'bg-orange-50 text-orange-600' : 'bg-indigo-50 text-indigo-600'}`}>
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center">
                                            <h3 className="font-bold text-gray-900 text-lg mr-3">{trip.type}</h3>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${trip.status === 'On Time' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                                {trip.status === 'On Time' ? <CheckCircle className="w-3 h-3 mr-1" /> : <AlertTriangle className="w-3 h-3 mr-1" />}
                                                {trip.status}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-gray-500 mt-1">{trip.date} • {trip.route}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-mono font-bold text-gray-400">{trip.id}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Time Log</p>
                                    <p className="text-sm font-bold text-gray-800">{trip.startTime} - {trip.endTime}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Duration</p>
                                    <p className="text-sm font-bold text-gray-800">{trip.duration}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Students</p>
                                    <p className="text-sm font-bold text-gray-800">{trip.studentsBoarded} / {trip.totalStudents} Present</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Distance</p>
                                    <p className="text-sm font-bold text-gray-800">{trip.distance}</p>
                                </div>
                            </div>
                            
                            {trip.issues && (
                                <div className="mt-3 bg-red-50 text-red-700 p-3 rounded-lg text-sm font-medium flex items-start border border-red-100">
                                    <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                                    <p><span className="font-bold">Delay Reason:</span> {trip.issues}</p>
                                </div>
                            )}

                            <div className="mt-4 flex justify-end">
                                <button className="text-sm font-bold text-primary-600 hover:text-primary-800 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <FileText className="w-4 h-4 mr-1.5" /> View Detailed Log
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
                    <button className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">
                        Load Older Trips
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DriverTripHistory;
