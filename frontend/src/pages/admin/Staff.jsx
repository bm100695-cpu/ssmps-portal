import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Search, Plus, Filter, Mail, Phone, MoreVertical, Briefcase, GraduationCap, Shield } from 'lucide-react';

const Staff = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
            const { data } = await axios.get('/api/users', config);
            // Filter only staff roles (exclude students/parents)
            const staffRoles = data.filter(u => ['Teacher', 'Principal', 'Admin', 'Driver'].includes(u.role));
            setStaff(staffRoles);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const filteredStaff = staff.filter(s => {
        const matchesSearch = s.fullName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'All' || s.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const getRoleIcon = (role) => {
        if (role === 'Teacher') return <GraduationCap className="w-5 h-5" />;
        if (role === 'Admin' || role === 'Principal') return <Shield className="w-5 h-5" />;
        return <Briefcase className="w-5 h-5" />;
    };

    const getRoleColor = (role) => {
        if (role === 'Teacher') return 'bg-blue-100 text-blue-700';
        if (role === 'Principal') return 'bg-purple-100 text-purple-700';
        if (role === 'Admin') return 'bg-red-100 text-red-700';
        return 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Briefcase className="w-6 h-6 mr-2 text-primary-600" /> Teachers & Staff Directory
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Manage all school employees, their roles, and contact information.</p>
                </div>
                <button className="flex items-center px-4 py-2 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-colors shadow-sm">
                    <Plus className="w-4 h-4 mr-2" /> Add New Staff
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search staff by name..." 
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="text-gray-400 w-5 h-5" />
                    <select 
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
                    >
                        <option value="All">All Roles</option>
                        <option value="Teacher">Teachers</option>
                        <option value="Principal">Principals</option>
                        <option value="Admin">Admins</option>
                        <option value="Driver">Drivers</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="p-8 text-center text-gray-500 font-bold animate-pulse">Loading staff directory...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredStaff.length === 0 ? (
                        <div className="col-span-full p-8 text-center text-gray-500 font-bold bg-white rounded-xl border border-gray-100">
                            No staff members found matching your search.
                        </div>
                    ) : filteredStaff.map(s => (
                        <div key={s._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                            <div className="h-20 bg-gradient-to-r from-gray-100 to-gray-200 relative">
                                <button className="absolute top-3 right-3 p-1.5 bg-white/50 hover:bg-white rounded-lg text-gray-600 transition-colors">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="px-5 pb-5 relative flex flex-col items-center text-center">
                                <div className={`w-20 h-20 rounded-full border-4 border-white -mt-10 flex items-center justify-center text-2xl font-black shadow-sm mb-3 ${getRoleColor(s.role)}`}>
                                    {s.fullName.charAt(0)}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 line-clamp-1 w-full">{s.fullName}</h3>
                                
                                <div className="flex items-center justify-center mt-1 mb-4">
                                    <span className={`flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getRoleColor(s.role)}`}>
                                        {getRoleIcon(s.role)}
                                        <span className="ml-1">{s.role}</span>
                                    </span>
                                </div>

                                <div className="w-full space-y-2 mt-2">
                                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                                        <Phone className="w-4 h-4 mr-3 text-gray-400" />
                                        <span className="font-medium">{s.mobile}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                                        <Mail className="w-4 h-4 mr-3 text-gray-400" />
                                        <span className="font-medium truncate">{s.email || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-gray-100 p-3 bg-gray-50 flex justify-center">
                                <button className="text-sm font-bold text-primary-600 hover:text-primary-800 transition-colors">
                                    View Full Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Staff;
