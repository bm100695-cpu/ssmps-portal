import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Bus, Map, MapPin, Users, Phone, Settings, Activity, Search } from 'lucide-react';

const Transport = () => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
            const { data } = await axios.get('/api/users', config);
            const driverList = data.filter(u => u.role === 'Driver');
            setDrivers(driverList);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const filteredDrivers = drivers.filter(d => 
        d.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        d.mobile.includes(searchTerm)
    );

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Bus className="w-6 h-6 mr-2 text-primary-600" /> Transport & Fleet Management
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Manage school buses, assigned drivers, and live routes.</p>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mr-4">
                        <Bus className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-500">Total Buses</p>
                        <h3 className="text-2xl font-black text-gray-900">12</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mr-4">
                        <Activity className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-500">Active on Route</p>
                        <h3 className="text-2xl font-black text-gray-900">8</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                    <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mr-4">
                        <Settings className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-500">In Maintenance</p>
                        <h3 className="text-2xl font-black text-gray-900">1</h3>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search drivers by name or mobile..." 
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
            </div>

            {loading ? (
                <div className="p-8 text-center text-gray-500 font-bold animate-pulse">Loading transport details...</div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredDrivers.length === 0 ? (
                        <div className="col-span-full p-8 text-center text-gray-500 font-bold bg-white rounded-xl border border-gray-100">
                            No drivers found.
                        </div>
                    ) : filteredDrivers.map((driver, index) => (
                        <div key={driver._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-all">
                            <div className="p-6 md:w-1/3 bg-gray-50 border-r border-gray-100 flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-2xl font-black bg-slate-200 text-slate-700 mb-3">
                                    {driver.fullName.charAt(0)}
                                </div>
                                <h3 className="font-bold text-gray-900 leading-tight">{driver.fullName}</h3>
                                <div className="flex items-center text-xs text-gray-500 mt-2 bg-white px-2 py-1 rounded-full border border-gray-200">
                                    <Phone className="w-3 h-3 mr-1" /> {driver.mobile}
                                </div>
                            </div>
                            <div className="p-6 md:w-2/3 flex flex-col justify-center space-y-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase">Assigned Bus</p>
                                        <p className="text-lg font-black text-gray-900 flex items-center">
                                            <Bus className="w-5 h-5 mr-2 text-primary-600" /> Bus {10 + index}
                                        </p>
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Active</span>
                                </div>
                                
                                <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl space-y-2">
                                    <div className="flex items-center text-sm text-blue-900 font-medium">
                                        <Map className="w-4 h-4 mr-2 text-blue-500" /> Route {String.fromCharCode(65 + index)} (City Center)
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-blue-700">
                                        <span className="flex items-center"><Users className="w-3 h-3 mr-1" /> 35 Students</span>
                                        <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> 8 Stops</span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button className="flex-1 py-2 bg-gray-100 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors">
                                        Reassign
                                    </button>
                                    <button className="flex-1 py-2 bg-primary-600 text-white text-sm font-bold rounded-lg hover:bg-primary-700 transition-colors shadow-sm">
                                        Live Track
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Transport;
