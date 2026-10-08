import React, { useState } from 'react';
import { Settings as SettingsIcon, Building2, CalendarDays, Bell, Paintbrush, Save, Shield, Smartphone, UploadCloud, Link as LinkIcon, Database } from 'lucide-react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('General');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert('System settings updated successfully!');
        }, 1000);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            {/* Premium Header */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"></div>
                <div className="absolute left-10 bottom-0 w-40 h-40 bg-gray-500 opacity-20 rounded-full blur-2xl transform translate-y-1/2"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <p className="text-gray-400 font-bold tracking-wider uppercase text-sm mb-1 flex items-center">
                            <SettingsIcon className="w-4 h-4 mr-2" /> Global Configuration
                        </p>
                        <h1 className="text-3xl md:text-4xl font-black mb-2">System Settings</h1>
                        <p className="text-gray-300 font-medium opacity-90 max-w-xl">
                            Configure school identity, academic sessions, notifications, and application preferences.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={handleSave} disabled={isSaving} className="px-6 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-black transition-all shadow-lg hover:shadow-xl flex items-center transform hover:-translate-y-0.5">
                            {isSaving ? <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2"></div> : <Save className="w-5 h-5 mr-2" />}
                            {isSaving ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:w-64 shrink-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sticky top-6">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-3">Preferences</p>
                        <nav className="space-y-1">
                            {[
                                { id: 'General', icon: Building2, label: 'School Info' },
                                { id: 'Academic', icon: CalendarDays, label: 'Academic Year' },
                                { id: 'Notifications', icon: Bell, label: 'Notifications' },
                                { id: 'Appearance', icon: Paintbrush, label: 'Theme & UI' },
                                { id: 'Security', icon: Shield, label: 'Security' },
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                                        activeTab === tab.id 
                                        ? 'bg-gray-900 text-white shadow-md' 
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <tab.icon className={`w-5 h-5 mr-3 ${activeTab === tab.id ? 'text-gray-300' : 'text-gray-400'}`} />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Editor Content Area */}
                <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
                    
                    {activeTab === 'General' && (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 flex items-center mb-6">
                                    <Building2 className="w-6 h-6 mr-3 text-gray-700" /> School Information
                                </h2>
                                
                                <div className="flex flex-col md:flex-row gap-8 mb-8">
                                    <div className="shrink-0 flex flex-col items-center">
                                        <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer group">
                                            <UploadCloud className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                                            <span className="text-xs font-bold uppercase">Upload Logo</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-5">
                                        <div>
                                            <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1.5">School Name</label>
                                            <input type="text" defaultValue="Springfield Memorial Public School" className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-gray-900 focus:bg-white outline-none transition-all font-bold text-gray-900" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1.5">Registration Code</label>
                                                <input type="text" defaultValue="SMPS-2026-X" className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-gray-900 focus:bg-white outline-none transition-all font-medium text-gray-900" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1.5">Contact Email</label>
                                                <input type="email" defaultValue="admin@smps.edu" className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-gray-900 focus:bg-white outline-none transition-all font-medium text-gray-900" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-8 space-y-5">
                                    <div>
                                        <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1.5">Full Address</label>
                                        <textarea rows={2} defaultValue="123 Education Lane, Knowledge Park, Springfield, SP 45201" className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-gray-900 focus:bg-white outline-none transition-all font-medium text-gray-700 resize-none"></textarea>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1.5">Phone Number</label>
                                            <input type="text" defaultValue="+1 (555) 123-4567" className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-gray-900 focus:bg-white outline-none transition-all font-medium text-gray-900" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1.5">Website</label>
                                            <input type="text" defaultValue="www.smps-school.edu" className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-gray-900 focus:bg-white outline-none transition-all font-medium text-gray-900" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Academic' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center mb-6">
                                <CalendarDays className="w-6 h-6 mr-3 text-gray-700" /> Academic Settings
                            </h2>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1.5">Current Academic Session</label>
                                    <select className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-gray-900 focus:bg-white outline-none transition-all font-bold text-gray-900">
                                        <option>2025 - 2026</option>
                                        <option>2026 - 2027</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1.5">Session Start Date</label>
                                        <input type="date" defaultValue="2025-04-01" className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-gray-900 focus:bg-white outline-none transition-all font-medium text-gray-900" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1.5">Session End Date</label>
                                        <input type="date" defaultValue="2026-03-31" className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-gray-900 focus:bg-white outline-none transition-all font-medium text-gray-900" />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="border-t border-gray-100 pt-8">
                                <h3 className="text-lg font-black text-gray-900 mb-4">Grading System</h3>
                                <div className="p-4 border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-between">
                                    <div>
                                        <p className="font-bold text-gray-900">Use GPA / CGPA System</p>
                                        <p className="text-xs text-gray-500 mt-1">Enable 10-point CGPA calculation for reports.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'Notifications' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center mb-6">
                                <Bell className="w-6 h-6 mr-3 text-gray-700" /> Notification Preferences
                            </h2>
                            <div className="space-y-4">
                                <div className="p-4 border border-gray-200 rounded-xl bg-white flex items-center justify-between shadow-sm">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mr-4">
                                            <Smartphone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">SMS Gateway</p>
                                            <p className="text-xs text-gray-500 mt-1">Send SMS alerts for attendance and urgent notices.</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                    </label>
                                </div>
                                <div className="p-4 border border-gray-200 rounded-xl bg-white flex items-center justify-between shadow-sm">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mr-4">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">Email SMTP Integration</p>
                                            <p className="text-xs text-gray-500 mt-1">Send fee invoices and academic reports via email.</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Appearance' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center mb-6">
                                <Paintbrush className="w-6 h-6 mr-3 text-gray-700" /> UI & Appearance
                            </h2>
                            <div>
                                <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-3">Primary Theme Color</label>
                                <div className="flex gap-4">
                                    {['bg-blue-600', 'bg-emerald-600', 'bg-rose-600', 'bg-purple-600', 'bg-amber-600'].map((color, i) => (
                                        <button key={i} className={`w-12 h-12 rounded-full ${color} shadow-sm border-2 ${i === 0 ? 'border-gray-900 scale-110' : 'border-white'} transition-all hover:scale-110`}></button>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="border-t border-gray-100 pt-8">
                                <div className="p-4 border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-between">
                                    <div>
                                        <p className="font-bold text-gray-900">Enable Dark Mode Toggle</p>
                                        <p className="text-xs text-gray-500 mt-1">Allow users to switch between light and dark themes.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'Security' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center mb-6">
                                <Shield className="w-6 h-6 mr-3 text-gray-700" /> Security Settings
                            </h2>
                            <div className="p-6 border border-rose-200 bg-rose-50 rounded-2xl">
                                <div className="flex items-center mb-4 text-rose-800">
                                    <Database className="w-6 h-6 mr-2" />
                                    <h3 className="text-lg font-black">Database Backup</h3>
                                </div>
                                <p className="text-sm text-rose-700 font-medium mb-4">Last backup was created on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}.</p>
                                <button className="px-5 py-2.5 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition-colors shadow-sm">
                                    Generate New Backup
                                </button>
                            </div>
                            
                            <div className="p-4 border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-gray-900">Require Two-Factor Authentication (2FA)</p>
                                    <p className="text-xs text-gray-500 mt-1">Force 2FA for all Admin and Principal accounts.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                </label>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Settings;
