import React, { useContext, useState, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Phone, Shield, Edit3, Key, Check, X, Camera } from 'lucide-react';
import axios from 'axios';

const Profile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const fileInputRef = useRef(null);
    const [profilePhoto, setProfilePhoto] = useState(user?.photo || null);
    
    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        mobile: user?.mobile || '',
        password: ''
    });

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const dataToUpdate = { ...formData, photo: profilePhoto };
            if (!dataToUpdate.password) delete dataToUpdate.password;
            
            const { data } = await axios.put('/api/users/profile', dataToUpdate, config);
            
            // To support local photo update instantly even if backend ignores it
            const updatedUser = { ...data, photo: profilePhoto };
            updateUser(updatedUser);
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            alert(error.response?.data?.message || 'Error updating profile');
        }
    };

    if (!user) return <div>Loading profile...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                <p className="text-sm text-gray-500 mt-1">Manage your personal information and account settings.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header/Cover */}
                <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-400"></div>
                
                {/* Profile Info */}
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="relative w-24 h-24 bg-white rounded-full p-1 shadow-lg group">
                            <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-primary-600 overflow-hidden relative">
                                {profilePhoto ? (
                                    <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-10 h-10" />
                                )}
                                
                                {isEditing && (
                                    <div 
                                        onClick={() => fileInputRef.current.click()}
                                        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Camera className="w-6 h-6 text-white" />
                                    </div>
                                )}
                            </div>
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                onChange={handlePhotoChange}
                                accept="image/*"
                                className="hidden" 
                            />
                        </div>
                        {isEditing ? (
                            <div className="flex gap-2">
                                <button onClick={() => setIsEditing(false)} className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                                    <X className="w-4 h-4 mr-2" /> Cancel
                                </button>
                                <button onClick={handleSave} className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
                                    <Check className="w-4 h-4 mr-2" /> Save Changes
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                                <Edit3 className="w-4 h-4 mr-2" />
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {isEditing ? (
                        <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="text-2xl font-bold text-gray-900 border-b-2 border-primary-500 focus:outline-none mb-1 bg-gray-50 px-2 py-1 rounded" />
                    ) : (
                        <h2 className="text-2xl font-bold text-gray-900">{user.fullName}</h2>
                    )}
                    <br />
                    <span className="inline-block mt-1 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-bold tracking-wide">
                        {user.role}
                    </span>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2">Contact Information</h3>
                            
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mr-4">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500 font-medium">Mobile Number</p>
                                    {isEditing ? (
                                        <input type="text" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} className="w-full border-b border-gray-300 focus:border-primary-500 focus:outline-none py-1" />
                                    ) : (
                                        <p className="text-gray-900 font-bold">{user.mobile || 'Not provided'}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mr-4">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500 font-medium">Email Address</p>
                                    {isEditing ? (
                                        <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border-b border-gray-300 focus:border-primary-500 focus:outline-none py-1" />
                                    ) : (
                                        <p className="text-gray-900 font-bold">{user.email || 'Not provided'}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2">Security</h3>
                            
                            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => { if(!isEditing) { setIsEditing(true); setTimeout(() => document.getElementById('passInput')?.focus(), 100); } }}>
                                <div className="flex items-center w-full">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 mr-4 shadow-sm">
                                        <Key className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-900 font-bold">Change Password</p>
                                        {isEditing ? (
                                            <input id="passInput" type="text" placeholder="Enter new password to change..." value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full text-sm border-b border-gray-300 focus:border-primary-500 focus:outline-none py-1 bg-transparent" />
                                        ) : (
                                            <p className="text-xs text-gray-500 font-medium">Click to update your password</p>
                                        )}
                                    </div>
                                </div>
                                {!isEditing && <span className="text-gray-400">→</span>}
                            </div>

                            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 mr-4 shadow-sm">
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-gray-900 font-bold">Two-Factor Auth</p>
                                        <p className="text-xs text-gray-500 font-medium">Add an extra layer of security</p>
                                    </div>
                                </div>
                                <span className="text-gray-400">→</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
