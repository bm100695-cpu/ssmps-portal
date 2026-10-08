import React, { useContext, useState } from 'react';
import { Download, Share2, ShieldCheck, Mail, Phone, MapPin, Edit3, X, Camera, Save } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const StudentIDCard = () => {
    const { user } = useContext(AuthContext);

    const [studentData, setStudentData] = useState({
        name: user?.name || 'Student Name',
        roll: '2026101',
        classStr: '10-A',
        dob: '15-Aug-2010',
        bloodGroup: 'O+',
        phone: user?.phone || '+91 9876543210',
        address: '123 School Road, Model Town, City',
        photo: `https://ui-avatars.com/api/?name=${user?.name || 'Student'}&background=4f46e5&color=fff&size=128`,
        validUntil: 'Mar 2027'
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState(studentData);

    const handleDownload = () => {
        window.print();
    };

    const handleShare = async () => {
        const shareText = `Digital ID Card for ${studentData.name} (Roll: ${studentData.roll}). SMPS School.`;
        if (navigator.share) {
            try {
                await navigator.share({ title: 'My Digital ID', text: shareText, url: window.location.href });
            } catch (err) {
                console.log("Share failed", err);
            }
        } else {
            navigator.clipboard.writeText(shareText);
            alert("ID Card details copied to clipboard to share!");
        }
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        setStudentData(editForm);
        setIsEditing(false);
        alert("ID Card details updated successfully!");
    };

    const handlePhotoUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setEditForm({ ...editForm, photo: event.target.result });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Digital ID Card</h1>
                    <p className="text-sm text-gray-500 mt-1">Your official school identity card. Use this for library access and events.</p>
                </div>
                <div className="flex space-x-2 sm:space-x-3 flex-wrap justify-end gap-y-2">
                    <button onClick={() => setIsEditing(true)} className="flex items-center px-3 sm:px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm text-sm">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Details
                    </button>
                    <button onClick={handleShare} className="flex items-center px-3 sm:px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm text-sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                    </button>
                    <button onClick={handleDownload} className="flex items-center px-3 sm:px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-md text-sm">
                        <Download className="w-4 h-4 mr-2" />
                        Save ID
                    </button>
                </div>
            </div>

            <div className="flex justify-center mt-8">
                {/* ID Card Front */}
                <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden relative group transform transition-transform hover:scale-[1.02]">
                    
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary-700 to-primary-900 px-6 py-5 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <ShieldCheck className="w-24 h-24 text-white" />
                        </div>
                        <h2 className="text-xl font-black text-white tracking-wider relative z-10">ST. MARY'S PUBLIC SCHOOL</h2>
                        <p className="text-primary-100 text-xs font-medium tracking-widest uppercase mt-1 relative z-10">Excellence in Education</p>
                    </div>

                    {/* Body */}
                    <div className="px-6 py-6 text-center relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                        
                        {/* Profile Photo */}
                        <div className="relative mx-auto w-32 h-32 mb-4 -mt-16 border-4 border-white rounded-xl shadow-lg bg-white flex items-center justify-center overflow-hidden">
                            <img 
                                src={studentData.photo} 
                                alt="Student" 
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Details */}
                        <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">{studentData.name}</h3>
                        <p className="text-primary-600 font-bold tracking-widest uppercase mb-6">{user?.role || 'Student'}</p>

                        <div className="space-y-3 text-left">
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-xs font-bold text-gray-500 uppercase">Roll No</span>
                                <span className="text-sm font-bold text-gray-900">{studentData.roll}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-xs font-bold text-gray-500 uppercase">Class & Sec</span>
                                <span className="text-sm font-bold text-gray-900">{studentData.classStr}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-xs font-bold text-gray-500 uppercase">DOB</span>
                                <span className="text-sm font-bold text-gray-900">{studentData.dob}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-xs font-bold text-gray-500 uppercase">Blood Group</span>
                                <span className="text-sm font-bold text-red-600">{studentData.bloodGroup}</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                        <div className="text-left">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Barcode-demo.svg" alt="Barcode" className="h-8 opacity-70 mix-blend-multiply" />
                            <p className="text-[10px] text-gray-500 mt-1">ID: SMPS-{studentData.roll}</p>
                        </div>
                        <div className="text-right">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Signature_of_Mahatma_Gandhi.svg" alt="Signature" className="h-6 opacity-60 ml-auto" />
                            <p className="text-[10px] font-bold text-gray-800 uppercase mt-1">Principal</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="text-center mt-6">
                <p className="text-xs text-gray-400">Valid until {studentData.validUntil}. If found, please return to the school address.</p>
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
                            <h3 className="font-bold text-gray-900">Update ID Card Details</h3>
                            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5"/></button>
                        </div>
                        <form onSubmit={handleSaveEdit} className="p-4 space-y-4">
                            
                            <div className="flex justify-center mb-4">
                                <label className="relative cursor-pointer group">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-primary-500 transition-colors">
                                        <img src={editForm.photo} alt="Upload preview" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="w-6 h-6 text-white" />
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                                </label>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Date of Birth</label>
                                    <input type="text" value={editForm.dob} onChange={e => setEditForm({...editForm, dob: e.target.value})} className="w-full px-3 py-2 border rounded focus:ring-primary-500" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Blood Group</label>
                                    <input type="text" value={editForm.bloodGroup} onChange={e => setEditForm({...editForm, bloodGroup: e.target.value})} className="w-full px-3 py-2 border rounded focus:ring-primary-500" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Contact Number</label>
                                <input type="text" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} className="w-full px-3 py-2 border rounded focus:ring-primary-500" />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Home Address</label>
                                <textarea rows="2" value={editForm.address} onChange={e => setEditForm({...editForm, address: e.target.value})} className="w-full px-3 py-2 border rounded focus:ring-primary-500"></textarea>
                            </div>

                            <button type="submit" className="w-full flex justify-center items-center py-2 px-4 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-colors mt-2">
                                <Save className="w-4 h-4 mr-2" /> Save & Update ID
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentIDCard;
