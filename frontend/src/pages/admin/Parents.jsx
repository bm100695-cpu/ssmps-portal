import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Search, Users, Phone, Mail, GraduationCap, Plus, Link as LinkIcon } from 'lucide-react';

const Parents = () => {
    const [parents, setParents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        fetchParents();
    }, []);

    const fetchParents = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
            const { data } = await axios.get('/api/users', config);
            // Filter only parents
            const parentList = data.filter(u => u.role === 'Parent');
            setParents(parentList);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const filteredParents = parents.filter(p => 
        p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.mobile.includes(searchTerm)
    );

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Users className="w-6 h-6 mr-2 text-primary-600" /> Parents Directory
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Manage all registered parents and their linked student accounts.</p>
                </div>
                <button className="flex items-center px-4 py-2 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-colors shadow-sm">
                    <Plus className="w-4 h-4 mr-2" /> Invite Parent
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search parents by name or mobile number..." 
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
            </div>

            {loading ? (
                <div className="p-8 text-center text-gray-500 font-bold animate-pulse">Loading parents directory...</div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredParents.length === 0 ? (
                        <div className="col-span-full p-8 text-center text-gray-500 font-bold bg-white rounded-xl border border-gray-100">
                            No parents found matching your search.
                        </div>
                    ) : filteredParents.map(p => (
                        <div key={p._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
                            <div className="p-5 flex items-start space-x-4 border-b border-gray-50">
                                <div className="w-14 h-14 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xl font-black shrink-0 shadow-sm">
                                    {p.fullName.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{p.fullName}</h3>
                                    <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded">Parent Account</span>
                                </div>
                            </div>
                            
                            <div className="p-5 flex-1 bg-gray-50/50 space-y-3">
                                <div className="flex items-center text-sm text-gray-700">
                                    <Phone className="w-4 h-4 mr-3 text-gray-400" />
                                    <span className="font-medium">{p.mobile}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-700">
                                    <Mail className="w-4 h-4 mr-3 text-gray-400" />
                                    <span className="font-medium truncate">{p.email || 'Email not provided'}</span>
                                </div>
                            </div>

                            <div className="p-4 bg-white border-t border-gray-100">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Linked Students</h4>
                                <div className="space-y-2">
                                    {/* Mocking linked students for display since user endpoint doesn't return student data natively yet */}
                                    <div className="flex items-center justify-between p-2 bg-blue-50 border border-blue-100 rounded-lg">
                                        <div className="flex items-center">
                                            <GraduationCap className="w-4 h-4 mr-2 text-blue-600" />
                                            <div>
                                                <p className="text-sm font-bold text-blue-900">Student Profile</p>
                                                <p className="text-[10px] text-blue-700">Class 10-A</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full mt-3 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-xs font-bold flex items-center justify-center transition-colors">
                                    <LinkIcon className="w-3 h-3 mr-2" /> Link Another Child
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Parents;
