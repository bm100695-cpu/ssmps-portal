import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Users, ArrowRight, Flag, CheckCircle } from 'lucide-react';

const DriverRoute = () => {
    const routeDetails = {
        name: 'Route 4 (Morning)',
        startPoint: 'Vasant Vihar',
        endPoint: 'Delhi Public School Campus',
        totalDistance: '14.5 km',
        estimatedTime: '45 mins',
        totalStudents: 42
    };

    const [stops, setStops] = useState([
        { id: 1, name: 'Vasant Vihar (Start)', time: '07:00 AM', students: 12, coordinates: '28.5562° N, 77.1610° E', completed: true },
        { id: 2, name: 'Sunrise Enclave', time: '07:15 AM', students: 8, coordinates: '28.5600° N, 77.1700° E', completed: false },
        { id: 3, name: 'Green Park Metro', time: '07:30 AM', students: 15, coordinates: '28.5587° N, 77.2045° E', completed: false },
        { id: 4, name: 'City Center Mall', time: '07:45 AM', students: 7, coordinates: '28.5245° N, 77.2066° E', completed: false },
        { id: 5, name: 'School Campus (End)', time: '08:00 AM', students: 0, coordinates: '28.5355° N, 77.1568° E', completed: false },
    ]);

    const toggleStopComplete = (id) => {
        setStops(stops.map(stop => 
            stop.id === id ? { ...stop, completed: !stop.completed } : stop
        ));
    };

    const completedCount = stops.filter(s => s.completed).length;

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Assigned Route</h1>
                    <p className="text-sm text-gray-500 mt-1">Detailed overview of your daily pick-up and drop locations.</p>
                </div>
                <button className="flex items-center px-4 py-2 bg-white text-primary-600 font-bold border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors shadow-sm">
                    <Navigation className="w-4 h-4 mr-2" />
                    Open in Google Maps
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-3">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Distance</p>
                        <p className="text-lg font-black text-gray-900">{routeDetails.totalDistance}</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mr-3">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Duration</p>
                        <p className="text-lg font-black text-gray-900">{routeDetails.estimatedTime}</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center mr-3">
                        <Users className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Students</p>
                        <p className="text-lg font-black text-gray-900">{routeDetails.totalStudents}</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mr-3">
                        <Flag className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Total Stops</p>
                        <p className="text-lg font-black text-gray-900">{stops.length}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Route Map Visual */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative min-h-[400px]">
                    {/* Simulated Embed */}
                    <iframe 
                        title="Route Map"
                        width="100%" 
                        height="100%" 
                        className="absolute inset-0 w-full h-full"
                        frameBorder="0" 
                        style={{ border: 0 }} 
                        src="https://maps.google.com/maps?q=Vasant+Vihar+to+Delhi+Public+School&t=&z=12&ie=UTF8&iwloc=&output=embed" 
                        allowFullScreen
                    ></iframe>
                    
                    {/* Path Overlay details */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur p-4 rounded-xl shadow-lg border border-gray-100 max-w-xs">
                        <h3 className="font-black text-gray-900 mb-2">{routeDetails.name}</h3>
                        <div className="flex flex-col space-y-2 relative">
                            <div className="absolute left-[7px] top-4 bottom-4 w-0.5 bg-gray-200 z-0"></div>
                            <div className="flex items-center relative z-10">
                                <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-sm mr-3"></div>
                                <span className="text-sm font-bold text-gray-700">{routeDetails.startPoint}</span>
                            </div>
                            <div className="flex items-center relative z-10 pt-2">
                                <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-sm mr-3"></div>
                                <span className="text-sm font-bold text-gray-700">{routeDetails.endPoint}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stop by Stop Details */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 mb-6 flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-primary-500" /> 
                        Stop Sequence & Pickups
                    </h3>
                    
                    <div className="space-y-0 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gray-200 before:to-gray-200">
                        {stops.map((stop, index) => (
                            <div key={stop.id} onClick={() => toggleStopComplete(stop.id)} className={`relative flex items-start py-4 group rounded-xl px-2 transition-colors cursor-pointer ${stop.completed ? 'bg-green-50/50' : 'hover:bg-gray-50'}`}>
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-4 border-white shrink-0 shadow-sm z-10 transition-colors ${stop.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500 group-hover:bg-primary-500 group-hover:text-white'}`}>
                                    {stop.completed ? <CheckCircle className="w-4 h-4" /> : <span className="text-xs font-bold">{index + 1}</span>}
                                </div>
                                <div className="ml-4 flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className={`text-sm font-bold transition-colors ${stop.completed ? 'text-green-700' : 'text-gray-900 group-hover:text-primary-700'}`}>
                                                {stop.name}
                                            </p>
                                            <p className="text-xs font-mono text-gray-400 mt-1">{stop.coordinates}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-bold text-gray-500 block">{stop.time}</span>
                                            {stop.students > 0 && (
                                                <span className={`inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors ${stop.completed ? 'bg-green-100 text-green-700 border-green-200' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                                                    <Users className="w-3 h-3 mr-1" /> {stop.students} Students
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-bold text-gray-600">Route Progress</span>
                            <span className="text-sm font-bold text-green-600">{completedCount} / {stops.length} Stops</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4">
                            <div className="bg-green-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${(completedCount / stops.length) * 100}%` }}></div>
                        </div>
                        <button className="w-full py-2.5 rounded-lg text-sm font-bold text-gray-700 bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors">
                            Print Route Sheet
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DriverRoute;
