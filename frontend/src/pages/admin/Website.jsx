import React, { useState } from 'react';
import { Globe, Image as ImageIcon, LayoutTemplate, MessageSquare, Save, Settings, AlertCircle, Plus, Trash2, Link as LinkIcon, Monitor, Smartphone } from 'lucide-react';

const Website = () => {
    const [activeTab, setActiveTab] = useState('Hero');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert('Website content updated successfully!');
        }, 1000);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            {/* Premium Header */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"></div>
                <div className="absolute left-10 bottom-0 w-40 h-40 bg-blue-400 opacity-20 rounded-full blur-2xl transform translate-y-1/2"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <p className="text-slate-400 font-bold tracking-wider uppercase text-sm mb-1 flex items-center">
                            <Globe className="w-4 h-4 mr-2" /> Content Management System
                        </p>
                        <h1 className="text-3xl md:text-4xl font-black mb-2">Website Manager</h1>
                        <p className="text-slate-300 font-medium opacity-90 max-w-xl">
                            Control and update the public-facing school website content in real-time.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-xl font-bold transition-all border border-slate-600 flex items-center">
                            <Monitor className="w-4 h-4 mr-2" /> Preview
                        </button>
                        <button onClick={handleSave} disabled={isSaving} className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-black transition-all shadow-lg hover:shadow-xl flex items-center">
                            {isSaving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div> : <Save className="w-5 h-5 mr-2" />}
                            {isSaving ? 'Publishing...' : 'Publish Changes'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:w-64 shrink-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sticky top-6">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-3">Site Sections</p>
                        <nav className="space-y-1">
                            {[
                                { id: 'Hero', icon: LayoutTemplate, label: 'Hero Section' },
                                { id: 'About', icon: MessageSquare, label: 'About Us' },
                                { id: 'Gallery', icon: ImageIcon, label: 'Photo Gallery' },
                                { id: 'Settings', icon: Settings, label: 'SEO & Settings' },
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                                        activeTab === tab.id 
                                        ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <tab.icon className={`w-5 h-5 mr-3 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`} />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                        
                        <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100">
                            <div className="flex items-start">
                                <AlertCircle className="w-5 h-5 text-amber-600 mr-2 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-bold text-amber-800">Changes Go Live Instantly</p>
                                    <p className="text-[10px] text-amber-700 mt-1">Make sure you preview changes before hitting publish.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Editor Content Area */}
                <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
                    
                    {activeTab === 'Hero' && (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 flex items-center mb-6">
                                    <LayoutTemplate className="w-6 h-6 mr-3 text-blue-600" /> Hero Section (Homepage)
                                </h2>
                                
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1.5">Main Headline</label>
                                        <input type="text" defaultValue="Empowering the Leaders of Tomorrow" className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold text-gray-900 text-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1.5">Sub-headline</label>
                                        <textarea rows={3} defaultValue="Welcome to Springfield Memorial Public School. We provide world-class education with a focus on holistic development and academic excellence." className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-gray-700 resize-none"></textarea>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="border-t border-gray-100 pt-8">
                                <div className="flex justify-between items-center mb-4">
                                    <label className="block text-xs font-black text-gray-700 uppercase tracking-widest">Hero Background Image</label>
                                    <button className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 flex items-center">
                                        <ImageIcon className="w-3 h-3 mr-1" /> Replace Image
                                    </button>
                                </div>
                                <div className="w-full h-64 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center relative overflow-hidden group">
                                    <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Hero Preview" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                                    <div className="relative z-10 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-4 rounded-xl shadow-sm">
                                        <Plus className="w-6 h-6 text-blue-600 mb-2" />
                                        <span className="text-sm font-bold text-gray-800">Upload New Image</span>
                                        <span className="text-xs text-gray-500">Recommended: 1920x1080px (WebP)</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="border-t border-gray-100 pt-8">
                                <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-4">Call To Action (CTA) Buttons</label>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1 p-4 border border-gray-200 rounded-2xl bg-gray-50 space-y-3">
                                        <span className="text-xs font-bold text-gray-500 bg-white px-2 py-1 rounded border border-gray-200 inline-block mb-1">Primary Button</span>
                                        <input type="text" defaultValue="Apply for Admission" placeholder="Button Text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-bold" />
                                        <input type="text" defaultValue="/admissions" placeholder="Link URL" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-blue-600 font-mono" />
                                    </div>
                                    <div className="flex-1 p-4 border border-gray-200 rounded-2xl bg-gray-50 space-y-3">
                                        <span className="text-xs font-bold text-gray-500 bg-white px-2 py-1 rounded border border-gray-200 inline-block mb-1">Secondary Button</span>
                                        <input type="text" defaultValue="Take a Campus Tour" placeholder="Button Text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-bold" />
                                        <input type="text" defaultValue="/campus" placeholder="Link URL" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-blue-600 font-mono" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'About' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center mb-6">
                                <MessageSquare className="w-6 h-6 mr-3 text-blue-600" /> About Us Content
                            </h2>
                            <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold bg-gray-50">
                                Rich Text Editor will be loaded here.
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'Gallery' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center mb-6">
                                <ImageIcon className="w-6 h-6 mr-3 text-blue-600" /> Photo Gallery
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <div key={item} className="aspect-square bg-gray-100 rounded-xl relative group overflow-hidden">
                                        <img src={`https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`} alt="Gallery" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                ))}
                                <div className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                                    <Plus className="w-8 h-8 mb-2" />
                                    <span className="font-bold text-sm">Add Photo</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Settings' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center mb-6">
                                <Settings className="w-6 h-6 mr-3 text-blue-600" /> SEO & Global Settings
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1.5">Site Title (Title Tag)</label>
                                    <input type="text" defaultValue="SMPS - The Best Education in Town" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1.5">Meta Description</label>
                                    <textarea rows={2} defaultValue="Welcome to SMPS. We nurture minds and empower futures." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                                </div>
                                <div className="pt-4">
                                    <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1.5">Social Media Links</label>
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-l-lg flex items-center justify-center border-y border-l border-blue-200">
                                                <LinkIcon className="w-4 h-4" />
                                            </div>
                                            <input type="text" placeholder="Facebook URL" className="flex-1 px-4 py-2 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Website;
