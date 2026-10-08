import React, { useState } from 'react';
import { Shield, ShieldAlert, Key, Edit, Save, CheckSquare, Square, Check, X } from 'lucide-react';

const Roles = () => {
    const initialRoles = [
        {
            id: 1,
            name: 'Principal',
            usersCount: 2,
            desc: 'Full access to academic, administrative, and financial reports.',
            permissions: {
                viewDashboard: true,
                manageUsers: true,
                manageAttendance: true,
                manageFinance: true,
                publishResults: true,
                manageTransport: true
            }
        },
        {
            id: 2,
            name: 'Admin',
            usersCount: 3,
            desc: 'System administrator. Can manage users, roles, and settings.',
            permissions: {
                viewDashboard: true,
                manageUsers: true,
                manageAttendance: true,
                manageFinance: true,
                publishResults: false,
                manageTransport: true
            }
        },
        {
            id: 3,
            name: 'Teacher',
            usersCount: 45,
            desc: 'Can manage own class, attendance, homework, and marks.',
            permissions: {
                viewDashboard: true,
                manageUsers: false,
                manageAttendance: true,
                manageFinance: false,
                publishResults: false,
                manageTransport: false
            }
        },
        {
            id: 4,
            name: 'Driver',
            usersCount: 12,
            desc: 'Can view assigned routes and report transit issues.',
            permissions: {
                viewDashboard: true,
                manageUsers: false,
                manageAttendance: false,
                manageFinance: false,
                publishResults: false,
                manageTransport: true
            }
        },
    ];

    const [roles, setRoles] = useState(initialRoles);
    const [editingRoleId, setEditingRoleId] = useState(null);
    const [tempPermissions, setTempPermissions] = useState({});

    const handleEdit = (role) => {
        setEditingRoleId(role.id);
        setTempPermissions({ ...role.permissions });
    };

    const handleTogglePerm = (key) => {
        setTempPermissions(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleSave = (id) => {
        setRoles(roles.map(r => r.id === id ? { ...r, permissions: tempPermissions } : r));
        setEditingRoleId(null);
        alert('Permissions updated successfully!');
    };

    const handleCancel = () => {
        setEditingRoleId(null);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Shield className="w-6 h-6 mr-2 text-primary-600" /> Roles & Permissions
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Manage what each user role is allowed to see and do across the system.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {roles.map(role => (
                    <div key={role.id} className={`bg-white rounded-2xl shadow-sm border ${editingRoleId === role.id ? 'border-primary-300 ring-2 ring-primary-50' : 'border-gray-100'} overflow-hidden transition-all`}>
                        <div className="p-5 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                                    <Key className="w-4 h-4 mr-2 text-gray-400" /> {role.name}
                                    <span className="ml-3 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                                        {role.usersCount} Users
                                    </span>
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">{role.desc}</p>
                            </div>
                            <div>
                                {editingRoleId === role.id ? (
                                    <div className="flex space-x-2">
                                        <button onClick={handleCancel} className="px-3 py-1.5 text-sm font-bold text-gray-600 hover:bg-gray-200 bg-gray-100 rounded-lg transition-colors flex items-center">
                                            <X className="w-4 h-4 mr-1" /> Cancel
                                        </button>
                                        <button onClick={() => handleSave(role.id)} className="px-3 py-1.5 text-sm font-bold text-white hover:bg-green-700 bg-green-600 rounded-lg transition-colors flex items-center shadow-sm">
                                            <Save className="w-4 h-4 mr-1" /> Save
                                        </button>
                                    </div>
                                ) : (
                                    <button onClick={() => handleEdit(role)} className="px-3 py-1.5 text-sm font-bold text-primary-600 hover:bg-primary-50 border border-primary-200 bg-white rounded-lg transition-colors flex items-center shadow-sm">
                                        <Edit className="w-4 h-4 mr-1" /> Edit Permissions
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {Object.entries(editingRoleId === role.id ? tempPermissions : role.permissions).map(([key, value]) => {
                                    const title = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                                    const isEditing = editingRoleId === role.id;
                                    
                                    return (
                                        <div 
                                            key={key} 
                                            onClick={() => isEditing && handleTogglePerm(key)}
                                            className={`flex items-center justify-between p-3 rounded-xl border ${
                                                isEditing ? 'cursor-pointer hover:bg-gray-50' : 'cursor-default'
                                            } ${value ? (isEditing ? 'border-primary-200 bg-primary-50' : 'border-gray-100') : 'border-gray-100 bg-gray-50 opacity-60'}`}
                                        >
                                            <span className={`text-sm font-bold ${value ? 'text-gray-900' : 'text-gray-500'}`}>{title}</span>
                                            {isEditing ? (
                                                value ? <CheckSquare className="w-5 h-5 text-primary-600" /> : <Square className="w-5 h-5 text-gray-300" />
                                            ) : (
                                                value ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-300" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            
                            {editingRoleId === role.id && role.name === 'Admin' && (
                                <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start">
                                    <ShieldAlert className="w-5 h-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                                    <p className="text-xs text-red-800 font-medium">
                                        Warning: You are editing the Admin role. Ensure you do not accidentally remove critical permissions that could lock you out of the system.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Roles;
