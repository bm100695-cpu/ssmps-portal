import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Bus, MapPin, Users, Navigation } from 'lucide-react';

const DriverDashboard = () => {
    const { user } = useContext(AuthContext);
    const [isTripActive, setIsTripActive] = useState(false);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-800">Hello, Driver {user.fullName.split(' ')[0]}!</h1>
                    <p className="text-gray-500 mt-1">Bus #4 (Route: North Suburbs)</p>
                </div>
                
                {/* Trip Toggle */}
                <div className="flex items-center space-x-3 bg-gray-50 p-2 rounded-xl border border-gray-200">
                    <span className={`font-bold ${isTripActive ? 'text-green-600' : 'text-gray-500'}`}>
                        {isTripActive ? 'Trip in Progress' : 'Trip Stopped'}
                    </span>
                    <button 
                        onClick={() => setIsTripActive(!isTripActive)}
                        className={`px-6 py-2 rounded-lg font-bold text-white transition-colors shadow-sm ${
                            isTripActive 
                            ? 'bg-red-500 hover:bg-red-600' 
                            : 'bg-green-500 hover:bg-green-600'
                        }`}
                    >
                        {isTripActive ? 'End Trip' : 'Start Trip'}
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
                    <div className="p-4 rounded-full bg-blue-100 mr-4">
                        <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Students Assigned</p>
                        <h3 className="text-2xl font-bold text-gray-900">32 / 40</h3>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
                    <div className="p-4 rounded-full bg-yellow-100 mr-4">
                        <MapPin className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Stops</p>
                        <h3 className="text-2xl font-bold text-gray-900">8</h3>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
                    <div className="p-4 rounded-full bg-green-100 mr-4">
                        <Navigation className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Distance Today</p>
                        <h3 className="text-2xl font-bold text-gray-900">12.4 km</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                
                {/* Route Progress */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Current Route Status</h3>
                    
                    <div className="relative border-l-2 border-gray-200 ml-4 space-y-8">
                        <div className="relative">
                            <span className="absolute -left-[21px] bg-green-500 w-4 h-4 rounded-full ring-4 ring-white"></span>
                            <div className="pl-6">
                                <h4 className="font-bold text-gray-800">School Campus (Start)</h4>
                                <p className="text-sm text-gray-500">07:00 AM</p>
                            </div>
                        </div>

                        <div className="relative">
                            <span className="absolute -left-[21px] bg-green-500 w-4 h-4 rounded-full ring-4 ring-white"></span>
                            <div className="pl-6">
                                <h4 className="font-bold text-gray-800">Oakwood Estate</h4>
                                <p className="text-sm text-gray-500">07:15 AM • 12 Students Picked up</p>
                            </div>
                        </div>

                        <div className="relative">
                            {/* Blinking indicator for current stop if trip is active */}
                            <span className={`absolute -left-[21px] ${isTripActive ? 'bg-yellow-500 animate-pulse' : 'bg-gray-300'} w-4 h-4 rounded-full ring-4 ring-white`}></span>
                            <div className="pl-6">
                                <h4 className="font-bold text-gray-800">Maple Street</h4>
                                <p className="text-sm text-gray-500">ETA: 07:30 AM • 8 Students</p>
                                {isTripActive && (
                                    <button className="mt-2 text-sm bg-yellow-100 text-yellow-800 font-bold px-3 py-1 rounded-md">
                                        Mark Reached
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="relative">
                            <span className="absolute -left-[21px] bg-gray-300 w-4 h-4 rounded-full ring-4 ring-white"></span>
                            <div className="pl-6">
                                <h4 className="font-bold text-gray-400">Pine Avenue</h4>
                                <p className="text-sm text-gray-400">07:45 AM • 12 Students</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* GPS Tracking Sim */}
                <div className="bg-slate-100 p-6 rounded-xl border border-gray-200 flex flex-col items-center justify-center min-h-[400px]">
                    <div className="bg-white p-4 rounded-full shadow-lg mb-4">
                        <MapPin className="w-12 h-12 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700">Map Integration</h3>
                    <p className="text-slate-500 text-center text-sm max-w-sm mt-2">
                        {isTripActive 
                        ? 'Live GPS tracking is broadcasting your location to Parents and School Admins.'
                        : 'Start the trip to enable live GPS broadcasting.'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DriverDashboard;
