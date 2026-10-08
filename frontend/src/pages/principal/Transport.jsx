import React, { useState } from 'react';
import { Bus, MapPin, Navigation, Clock, AlertTriangle, CheckCircle, Search, Filter } from 'lucide-react';

const PrincipalTransport = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const fleetData = [
        { id: 'BUS-01', route: 'Route 1 (North)', driver: 'Ramesh Kumar', status: 'On Route', occupancy: '42/45', eta: 'On Time' },
        { id: 'BUS-02', route: 'Route 2 (South)', driver: 'Suresh Singh', status: 'Idle', occupancy: '0/40', eta: 'N/A' },
        { id: 'BUS-03', route: 'Route 3 (East)', driver: 'Amit Patel', status: 'Delayed', occupancy: '38/40', eta: '+15 mins' },
        { id: 'BUS-04', route: 'Route 4 (West)', driver: 'Vikas Sharma', status: 'On Route', occupancy: '41/42', eta: 'On Time' },
        { id: 'BUS-05', route: 'Route 5 (Central)', driver: 'Mohd. Ali', status: 'Maintenance', occupancy: '0/0', eta: 'N/A' },
    ];

    const recentIssues = [
        { id: 'ISS-0021', route: 'Route 3', driver: 'Amit Patel', issue: 'Heavy traffic block', time: '8:15 AM' },
        { id: 'ISS-0020', route: 'Route 5', driver: 'Mohd. Ali', issue: 'Engine starting trouble', time: 'Yesterday' },
    ];

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Transport Fleet Overview</h1>
                    <p className="text-sm text-gray-500 mt-1">Monitor all school buses, live routes, and driver status in real-time.</p>
                </div>
                <button className="px-4 py-2 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-colors shadow-sm">
                    View Fleet Reports
                </button>
            </div>

            {/* Quick Fleet Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Fleet</p>
                        <p className="text-2xl font-black text-gray-900 mt-1">12</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <Bus className="w-5 h-5 text-gray-600" />
                    </div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl shadow-sm border border-green-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-green-600 uppercase tracking-wider">Active on Route</p>
                        <p className="text-2xl font-black text-green-700 mt-1">8</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Navigation className="w-5 h-5 text-green-600" />
                    </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl shadow-sm border border-orange-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-orange-600 uppercase tracking-wider">Delayed</p>
                        <p className="text-2xl font-black text-orange-700 mt-1">1</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                </div>
                <div className="bg-red-50 p-4 rounded-xl shadow-sm border border-red-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-red-600 uppercase tracking-wider">In Maintenance</p>
                        <p className="text-2xl font-black text-red-700 mt-1">3</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Fleet List */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[500px]">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <h3 className="font-bold text-gray-900">Live Fleet Status</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search Bus or Driver..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-2">
                        {fleetData.filter(b => b.route.toLowerCase().includes(searchTerm.toLowerCase()) || b.driver.toLowerCase().includes(searchTerm.toLowerCase())).map(bus => (
                            <div key={bus.id} className="flex flex-col sm:flex-row items-center justify-between p-4 mb-2 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="flex items-center mb-3 sm:mb-0 w-full sm:w-auto">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 shadow-sm ${
                                        bus.status === 'On Route' ? 'bg-green-100 text-green-600' :
                                        bus.status === 'Delayed' ? 'bg-orange-100 text-orange-600' :
                                        bus.status === 'Maintenance' ? 'bg-red-100 text-red-600' :
                                        'bg-gray-100 text-gray-600'
                                    }`}>
                                        <Bus className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{bus.route}</h4>
                                        <p className="text-xs text-gray-500 font-medium">Bus {bus.id} • Driver: {bus.driver}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center w-full sm:w-auto space-x-6">
                                    <div className="text-center">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Occupancy</p>
                                        <p className="text-sm font-bold text-gray-800 mt-0.5">{bus.occupancy}</p>
                                    </div>
                                    <div className="text-center w-20">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Status</p>
                                        <span className={`inline-flex items-center justify-center mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold ${
                                            bus.status === 'On Route' ? 'bg-green-50 text-green-700 border border-green-200' :
                                            bus.status === 'Delayed' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                                            bus.status === 'Maintenance' ? 'bg-red-50 text-red-700 border border-red-200' :
                                            'bg-gray-50 text-gray-700 border border-gray-200'
                                        }`}>
                                            {bus.status}
                                        </span>
                                    </div>
                                    <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="View Live Map">
                                        <MapPin className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Live Map & Alerts */}
                <div className="space-y-6">
                    {/* Simulated Map Overview */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-64 relative">
                        <iframe 
                            title="City Overview Map"
                            width="100%" 
                            height="100%" 
                            frameBorder="0" 
                            style={{ border: 0 }} 
                            src="https://maps.google.com/maps?q=new+delhi+schools&t=&z=11&ie=UTF8&iwloc=&output=embed" 
                        ></iframe>
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm border border-gray-200 text-xs font-bold text-gray-700 flex items-center">
                            <span className="relative flex h-2 w-2 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Live Tracker Active
                        </div>
                    </div>

                    {/* Driver Alerts / Issues */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-2 text-red-500" /> Recent Driver Reports
                        </h3>
                        <div className="space-y-3">
                            {recentIssues.map(issue => (
                                <div key={issue.id} className="p-3 bg-red-50 border border-red-100 rounded-xl">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-sm font-bold text-red-800">{issue.route}</h4>
                                        <span className="text-[10px] font-bold text-red-500">{issue.time}</span>
                                    </div>
                                    <p className="text-xs text-red-700 font-medium mb-2">{issue.issue}</p>
                                    <p className="text-[10px] text-red-500 font-bold uppercase">Driver: {issue.driver}</p>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors">
                            View All Reports →
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PrincipalTransport;
