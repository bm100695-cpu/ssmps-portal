import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Plus, Trash2, Search, Filter } from 'lucide-react';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user: currentUser } = useContext(AuthContext);
    
    // Search and Filter
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    
    // Form state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ fullName: '', mobile: '', email: '', password: '', role: 'Teacher' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
            const { data } = await axios.get('/api/users', config);
            setUsers(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch users');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm('Are you sure you want to delete this user?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
                await axios.delete(`/api/users/${id}`, config);
                fetchUsers();
            } catch (err) {
                alert(err.response?.data?.message || 'Error deleting user');
            }
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
            await axios.post('/api/users', formData, config);
            setIsModalOpen(false);
            setFormData({ fullName: '', mobile: '', email: '', password: '', role: 'Teacher' });
            fetchUsers();
        } catch (err) {
            alert(err.response?.data?.message || 'Error creating user');
        }
    };

    const filteredUsers = users.filter(u => {
        const matchesSearch = u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase())) || 
                              u.mobile.includes(searchTerm);
        const matchesRole = roleFilter === '' || u.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    if (loading) return <div>Loading users...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Staff
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name, email, or mobile..." 
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="text-gray-400 w-5 h-5" />
                    <select 
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                        <option value="">All Roles</option>
                        <option value="Teacher">Teachers</option>
                        <option value="Driver">Drivers</option>
                        <option value="Parent">Parents</option>
                        <option value="Student">Students</option>
                        <option value="Principal">Principal</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-4 font-medium">Name</th>
                                <th className="px-6 py-4 font-medium">Role</th>
                                <th className="px-6 py-4 font-medium">Mobile</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredUsers.length === 0 ? (
                                <tr><td colSpan="5" className="p-8 text-center text-gray-500">No users found.</td></tr>
                            ) : filteredUsers.map(u => (
                                <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold mr-3">
                                                {u.fullName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{u.fullName}</p>
                                                <p className="text-sm text-gray-500">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{u.mobile}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${u.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {u.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {u.role !== 'Admin' && (
                                            <button onClick={() => handleDelete(u._id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Staff Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Staff</h2>
                        <form onSubmit={handleCreateUser} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input type="text" required value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                                    <input type="text" required value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                    <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                                        <option value="Teacher">Teacher</option>
                                        <option value="Principal">Principal</option>
                                        <option value="Driver">Driver</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
                                <button type="submit" className="px-4 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors shadow-md">Create Staff</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
