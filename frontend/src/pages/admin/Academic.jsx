import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { BookOpen, Users, Plus, Trash2, Library, BookMarked, UserCheck } from 'lucide-react';

const Academic = () => {
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user: currentUser } = useContext(AuthContext);

    // Forms
    const [classForm, setClassForm] = useState({ className: '', sections: '', classTeacher: '' });
    const [subjectForm, setSubjectForm] = useState({ subjectName: '', subjectCode: '', type: 'Theory' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
            const [classesRes, subjectsRes, usersRes] = await Promise.all([
                axios.get('/api/academic/classes', config),
                axios.get('/api/academic/subjects', config),
                axios.get('/api/users?role=Teacher', config)
            ]);
            
            setClasses(classesRes.data);
            setSubjects(subjectsRes.data);
            setTeachers(usersRes.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleCreateClass = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
            await axios.post('/api/academic/classes', classForm, config);
            setClassForm({ className: '', sections: '', classTeacher: '' });
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || 'Error creating class');
        }
    };

    const handleDeleteClass = async (id) => {
        if(window.confirm('Delete this class?')) {
            const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
            await axios.delete(`/api/academic/classes/${id}`, config);
            fetchData();
        }
    };

    const handleCreateSubject = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
            await axios.post('/api/academic/subjects', subjectForm, config);
            setSubjectForm({ subjectName: '', subjectCode: '', type: 'Theory' });
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || 'Error creating subject');
        }
    };

    const handleDeleteSubject = async (id) => {
        if(window.confirm('Delete this subject?')) {
            const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
            await axios.delete(`/api/academic/subjects/${id}`, config);
            fetchData();
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
        </div>
    );

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            {/* Header Area */}
            <div className="bg-gradient-to-r from-violet-600 to-indigo-700 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute left-0 bottom-0 w-48 h-48 bg-violet-400 opacity-20 rounded-full blur-2xl transform -translate-x-1/3 translate-y-1/3"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <p className="text-violet-200 font-bold tracking-wider uppercase text-sm mb-1 flex items-center">
                            <Library className="w-4 h-4 mr-2" /> Curriculum Management
                        </p>
                        <h1 className="text-3xl md:text-4xl font-black mb-2">Academic Structure</h1>
                        <p className="text-violet-100 font-medium opacity-90 max-w-xl">
                            Configure school classes, sections, assign class teachers, and manage the subject repository.
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Classes Section */}
                <div className="space-y-6">
                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                        
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mr-4">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900">Classes</h2>
                                <p className="text-sm font-medium text-gray-500">Manage {classes.length} active classes</p>
                            </div>
                        </div>

                        <form onSubmit={handleCreateClass} className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 space-y-4 mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Class Name</label>
                                    <input required type="text" placeholder="e.g. 10" value={classForm.className} onChange={(e)=>setClassForm({...classForm, className: e.target.value})} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Sections</label>
                                    <input type="text" placeholder="A, B, C" value={classForm.sections} onChange={(e)=>setClassForm({...classForm, sections: e.target.value})} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Class Teacher (Optional)</label>
                                <select value={classForm.classTeacher} onChange={(e)=>setClassForm({...classForm, classTeacher: e.target.value})} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium">
                                    <option value="">-- Select Teacher --</option>
                                    {teachers.map(t => (
                                        <option key={t._id} value={t._id}>{t.fullName}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="w-full flex items-center justify-center p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-sm hover:shadow-md transition-all font-bold text-sm">
                                <Plus className="w-5 h-5 mr-1" /> Add New Class
                            </button>
                        </form>

                        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {classes.length === 0 && <p className="text-center text-gray-400 font-medium py-4">No classes added yet.</p>}
                            {classes.map(c => (
                                <div key={c._id} className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-black text-lg mr-4 border border-blue-100">
                                            {c.className}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-lg">Class {c.className}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md border border-gray-200">
                                                    Sec: {c.sections.join(', ')}
                                                </span>
                                                {c.classTeacher && (
                                                    <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md flex items-center border border-blue-100">
                                                        <UserCheck className="w-3 h-3 mr-1" /> {c.classTeacher.fullName}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDeleteClass(c._id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2.5 rounded-xl transition-colors opacity-0 group-hover:opacity-100">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Subjects Section */}
                <div className="space-y-6">
                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                        
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mr-4">
                                <BookMarked className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900">Subjects</h2>
                                <p className="text-sm font-medium text-gray-500">Manage {subjects.length} active subjects</p>
                            </div>
                        </div>

                        <form onSubmit={handleCreateSubject} className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 space-y-4 mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Subject Name</label>
                                    <input required type="text" placeholder="e.g. Mathematics" value={subjectForm.subjectName} onChange={(e)=>setSubjectForm({...subjectForm, subjectName: e.target.value})} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Code</label>
                                    <input required type="text" placeholder="MATH101" value={subjectForm.subjectCode} onChange={(e)=>setSubjectForm({...subjectForm, subjectCode: e.target.value})} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Subject Type</label>
                                <select value={subjectForm.type} onChange={(e)=>setSubjectForm({...subjectForm, type: e.target.value})} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium">
                                    <option value="Theory">Theory (Written)</option>
                                    <option value="Practical">Practical (Lab)</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full flex items-center justify-center p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-sm hover:shadow-md transition-all font-bold text-sm">
                                <Plus className="w-5 h-5 mr-1" /> Add New Subject
                            </button>
                        </form>

                        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {subjects.length === 0 && <p className="text-center text-gray-400 font-medium py-4">No subjects added yet.</p>}
                            {subjects.map(s => (
                                <div key={s._id} className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black mr-4 border border-emerald-100">
                                            <BookOpen className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-lg leading-tight">{s.subjectName}</p>
                                            <div className="flex gap-2 mt-1.5">
                                                <span className="text-[10px] font-black uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200">{s.subjectCode}</span>
                                                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${s.type === 'Practical' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>{s.type}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDeleteSubject(s._id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2.5 rounded-xl transition-colors opacity-0 group-hover:opacity-100">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #e5e7eb;
                    border-radius: 20px;
                }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background-color: #d1d5db;
                }
            `}</style>
        </div>
    );
};

export default Academic;
