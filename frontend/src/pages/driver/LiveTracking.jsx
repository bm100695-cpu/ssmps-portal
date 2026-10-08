import React, { useState, useEffect } from 'react';
import { MapPin, Play, Square, Navigation, AlertTriangle, ShieldAlert, Clock, Activity } from 'lucide-react';

const DriverLiveTracking = () => {
    const [isTripActive, setIsTripActive] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [currentSpeed, setCurrentSpeed] = useState(0);

    // Simulate timer and speed when trip is active
    useEffect(() => {
        let timer;
        let speedInterval;
        
        if (isTripActive) {
            timer = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);
            
            // Randomly fluctuate speed between 35 and 45 km/h for realism
            setCurrentSpeed(40);
            speedInterval = setInterval(() => {
                setCurrentSpeed(Math.floor(Math.random() * (48 - 35 + 1) + 35));
            }, 3000);
        } else {
            setCurrentSpeed(0);
        }
        
        return () => {
            clearInterval(timer);
            clearInterval(speedInterval);
        };
    }, [isTripActive]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs > 0 ? hrs + 'h ' : ''}${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
    };

    const handleToggleTrip = () => {
        if (!isTripActive) {
            const confirmStart = window.confirm("Start the Morning Trip for Route 4? This will notify all parents.");
            if (confirmStart) {
                setIsTripActive(true);
            }
        } else {
            const confirmEnd = window.confirm("Are you sure you want to END this trip?");
            if (confirmEnd) {
                setIsTripActive(false);
                setElapsedTime(0);
                alert("Trip ended successfully. Summary report generated.");
            }
        }
    };

    const handleSOS = () => {
        alert("🚨 EMERGENCY SOS ACTIVATED 🚨\nAlert sent immediately to School Admin, Principal, and Local Authorities with current GPS location!");
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Live Trip Control</h1>
                    <p className="text-sm text-gray-500 mt-1">Start your trip to begin broadcasting live GPS location to parents.</p>
                </div>
                
                {/* Master Control Button */}
                <button 
                    onClick={handleToggleTrip}
                    className={`flex items-center px-8 py-3 rounded-xl font-black text-lg transition-all shadow-lg ${
                        isTripActive 
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/30' 
                        : 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/30'
                    }`}
                >
                    {isTripActive ? (
                        <><Square className="w-5 h-5 mr-2 fill-current" /> END TRIP</>
                    ) : (
                        <><Play className="w-5 h-5 mr-2 fill-current" /> START TRIP</>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* Left side metrics (3 columns wide) */}
                <div className="lg:col-span-3 space-y-6">
                    
                    {/* Live Metrics Bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className={`p-5 rounded-2xl border transition-colors flex flex-col justify-center items-center text-center ${isTripActive ? 'bg-primary-50 border-primary-100' : 'bg-white border-gray-100 shadow-sm'}`}>
                            <Activity className={`w-8 h-8 mb-2 ${isTripActive ? 'text-primary-500 animate-pulse' : 'text-gray-300'}`} />
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</p>
                            <p className={`text-xl font-black mt-1 ${isTripActive ? 'text-primary-700' : 'text-gray-900'}`}>
                                {isTripActive ? 'BROADCASTING' : 'OFFLINE'}
                            </p>
                        </div>
                        
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
                            <Clock className={`w-8 h-8 mb-2 ${isTripActive ? 'text-green-500' : 'text-gray-300'}`} />
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Trip Duration</p>
                            <p className="text-2xl font-mono font-black text-gray-900 mt-1">{formatTime(elapsedTime)}</p>
                        </div>
                        
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center relative overflow-hidden">
                            <div className="absolute -right-4 -bottom-4 opacity-5">
                                <Activity className="w-32 h-32" />
                            </div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider relative z-10">Current Speed</p>
                            <div className="flex items-baseline justify-center mt-1 relative z-10">
                                <span className={`text-4xl font-black ${currentSpeed > 0 ? 'text-gray-900' : 'text-gray-300'}`}>{currentSpeed}</span>
                                <span className="ml-1 text-sm font-bold text-gray-500">km/h</span>
                            </div>
                        </div>
                    </div>

                    {/* Live Map Display */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative" style={{ height: '500px' }}>
                        {isTripActive ? (
                            <>
                                {/* GPS Active Indicator */}
                                <div className="absolute top-4 right-4 z-10 flex items-center bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-md border border-gray-200">
                                    <span className="relative flex h-3 w-3 mr-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                    <span className="text-xs font-bold text-gray-700">GPS Linked</span>
                                </div>
                                <iframe 
                                    title="Live GPS Tracking"
                                    width="100%" 
                                    height="100%" 
                                    frameBorder="0" 
                                    style={{ border: 0 }} 
                                    src="https://maps.google.com/maps?q=moving+bus+delhi&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                                    allowFullScreen
                                ></iframe>
                            </>
                        ) : (
                            <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center border-2 border-dashed border-gray-200">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <Navigation className="w-10 h-10 text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-400">Map Offline</h3>
                                <p className="text-gray-400 mt-2">Start the trip to enable live tracking</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right side controls (1 column wide) */}
                <div className="lg:col-span-1 space-y-6">
                    
                    {/* SOS Emergency */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShieldAlert className="w-8 h-8 text-red-500" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Emergency Hub</h3>
                        <p className="text-xs text-gray-500 mb-6">Press only in case of accident, breakdown, or medical emergency.</p>
                        
                        <button 
                            onClick={handleSOS}
                            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black tracking-wider transition-all shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] flex flex-col items-center justify-center"
                        >
                            <span>SOS ALERT</span>
                        </button>
                    </div>

                    {/* Current Trip Info */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                            <Navigation className="w-5 h-5 mr-2 text-primary-500" /> 
                            Trip Details
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Assigned Route</p>
                                <p className="font-bold text-gray-900 mt-0.5">Route 4 (Morning)</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Next Stop</p>
                                <p className="font-bold text-primary-600 mt-0.5">{isTripActive ? 'Sunrise Enclave (ETA: 4 mins)' : 'Trip not started'}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Traffic Status</p>
                                <p className="font-bold text-green-600 mt-0.5 flex items-center">
                                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> Clear Route
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default DriverLiveTracking;
