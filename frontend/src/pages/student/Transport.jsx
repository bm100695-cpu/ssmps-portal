import React, { useState, useEffect } from 'react';
import { MapPin, PhoneCall, Bus, Clock, AlertCircle, CheckCircle } from 'lucide-react';

const StudentTransport = () => {
    // Simulated live tracking state
    const [busStatus, setBusStatus] = useState('In Transit');
    const [eta, setEta] = useState('8 mins');

    // Simulate real-time updates
    useEffect(() => {
        const timer = setInterval(() => {
            setEta(prev => {
                if (prev === '8 mins') return '7 mins';
                if (prev === '7 mins') return '6 mins';
                return 'Arriving Soon';
            });
        }, 15000); // Update every 15 seconds for demo
        return () => clearInterval(timer);
    }, []);

    const busDetails = {
        number: 'DL-1PC-4321',
        route: 'Route 4 (Morning)',
        driver: {
            name: 'Ramesh Kumar',
            phone: '+91 98765 43210',
            rating: '4.8 ★'
        },
        currentSpeed: '42 km/h'
    };

    const stops = [
        { id: 1, name: 'School Campus', time: '02:30 PM', status: 'completed' },
        { id: 2, name: 'City Center Mall', time: '02:45 PM', status: 'completed' },
        { id: 3, name: 'Green Park Metro', time: '03:00 PM', status: 'current' },
        { id: 4, name: 'Your Stop (Sunrise Enclave)', time: '03:15 PM', status: 'upcoming' },
        { id: 5, name: 'Vasant Vihar', time: '03:30 PM', status: 'upcoming' },
    ];

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Bus Tracking</h1>
                    <p className="text-sm text-gray-500 mt-1">Track your school bus location in real-time so you never miss it.</p>
                </div>
                <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200">
                    <div className="relative flex h-3 w-3 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </div>
                    <span className="font-bold text-sm">Live GPS Active</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: Map & Driver Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Simulated Map Container */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative" style={{ height: '400px' }}>
                        {/* Embedding a Google Map iframe centered around a generic city area for simulation */}
                        <iframe 
                            title="Live Bus Map"
                            width="100%" 
                            height="100%" 
                            frameBorder="0" 
                            style={{ border: 0 }} 
                            src="https://maps.google.com/maps?q=new+delhi+school&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                            allowFullScreen
                        ></iframe>
                        
                        {/* ETA Overlay */}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100 flex items-center space-x-4">
                            <div className="bg-primary-100 text-primary-600 p-3 rounded-full">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Bus Arriving In</p>
                                <p className="text-xl font-black text-primary-700">{eta}</p>
                            </div>
                        </div>
                    </div>

                    {/* Driver & Bus Info */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-6 w-full md:w-auto">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 flex-shrink-0">
                                <Bus className="w-8 h-8 text-primary-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{busDetails.route}</h3>
                                <p className="text-sm font-medium text-gray-500">Bus No: <span className="text-gray-800 font-bold">{busDetails.number}</span></p>
                                <p className="text-xs text-primary-600 font-bold mt-1">Speed: {busDetails.currentSpeed}</p>
                            </div>
                        </div>
                        
                        <div className="w-full md:w-px md:h-16 bg-gray-200 hidden md:block"></div>
                        
                        <div className="flex items-center justify-between w-full md:w-auto md:gap-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase">Driver Info</p>
                                <p className="font-bold text-gray-900">{busDetails.driver.name}</p>
                            </div>
                            <button onClick={() => alert(`Calling Driver ${busDetails.driver.name} at ${busDetails.driver.phone}...`)} className="p-3 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors shadow-sm">
                                <PhoneCall className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Route Timeline */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
                        <h3 className="font-bold text-gray-900 mb-6 flex items-center">
                            <MapPin className="w-5 h-5 mr-2 text-primary-500" /> 
                            Route Timeline
                        </h3>
                        
                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-green-500 before:via-gray-200 before:to-gray-200 flex-grow">
                            {stops.map((stop, index) => (
                                <div key={stop.id} className="relative flex items-center">
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shrink-0 shadow-sm z-10 ${
                                        stop.status === 'completed' ? 'bg-green-500 text-white' :
                                        stop.status === 'current' ? 'bg-primary-500 text-white animate-pulse' :
                                        'bg-gray-200 text-gray-400'
                                    }`}>
                                        {stop.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : 
                                         stop.status === 'current' ? <AlertCircle className="w-5 h-5" /> :
                                         <span className="w-2 h-2 rounded-full bg-gray-400"></span>}
                                    </div>
                                    <div className={`ml-4 p-3 rounded-lg w-full ${stop.name.includes('Your Stop') ? 'bg-primary-50 border border-primary-100' : ''}`}>
                                        <div className="flex justify-between items-start">
                                            <p className={`text-sm font-bold ${stop.status === 'upcoming' ? 'text-gray-500' : 'text-gray-900'} ${stop.name.includes('Your Stop') ? 'text-primary-700' : ''}`}>
                                                {stop.name}
                                            </p>
                                            <span className="text-xs font-bold text-gray-500">{stop.time}</span>
                                        </div>
                                        {stop.status === 'current' && (
                                            <p className="text-xs font-medium text-primary-600 mt-1">Bus is currently here</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-8 pt-4 border-t border-gray-100 text-center">
                            <p className="text-xs font-bold text-gray-400 uppercase">Be at your stop 5 minutes early.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StudentTransport;
