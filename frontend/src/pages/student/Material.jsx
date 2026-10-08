import React, { useState } from 'react';
import { Book, Download, FileText, Folder, Search, Filter, PlayCircle } from 'lucide-react';

const StudentMaterial = () => {
    const [activeSubject, setActiveSubject] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const subjects = ['All', 'Mathematics', 'Science', 'English', 'History'];

    const materials = [
        { id: 1, title: 'Algebra Formula Sheet', subject: 'Mathematics', type: 'PDF', size: '2.4 MB', date: 'Oct 01, 2026', icon: FileText, color: 'blue' },
        { id: 2, title: 'Trigonometry Notes (Ch-8)', subject: 'Mathematics', type: 'PDF', size: '5.1 MB', date: 'Sep 25, 2026', icon: FileText, color: 'blue' },
        { id: 3, title: 'Chemical Reactions Lecture', subject: 'Science', type: 'Video', size: '145 MB', date: 'Oct 05, 2026', icon: PlayCircle, color: 'green' },
        { id: 4, title: 'Physics Lab Manual', subject: 'Science', type: 'DOCX', size: '1.2 MB', date: 'Sep 10, 2026', icon: Book, color: 'green' },
        { id: 5, title: 'Grammar Worksheets', subject: 'English', type: 'PDF', size: '3.3 MB', date: 'Oct 02, 2026', icon: FileText, color: 'purple' },
        { id: 6, title: 'World War II Summary', subject: 'History', type: 'PDF', size: '4.8 MB', date: 'Sep 18, 2026', icon: FileText, color: 'yellow' },
    ];

    const filteredMaterials = materials.filter(m => 
        (activeSubject === 'All' || m.subject === activeSubject) &&
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDownload = (title) => {
        // Create dummy content for the file
        const fileContent = `This is a simulated download for the study material: ${title}\n\nIn a production environment, this would download the actual uploaded file.`;
        
        // Create a blob and trigger download
        const blob = new Blob([fileContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Study Material</h1>
                    <p className="text-sm text-gray-500 mt-1">Access notes, sample papers, and video lectures uploaded by teachers.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input 
                        type="text" 
                        placeholder="Search for notes, videos, etc..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                </div>
                <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0">
                    {subjects.map(subject => (
                        <button 
                            key={subject}
                            onClick={() => setActiveSubject(subject)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                                activeSubject === subject 
                                ? 'bg-primary-600 text-white' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {subject}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMaterials.map(material => {
                    const Icon = material.icon;
                    return (
                        <div key={material.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow group flex flex-col">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-lg ${
                                    material.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                    material.color === 'green' ? 'bg-green-50 text-green-600' :
                                    material.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                                    'bg-yellow-50 text-yellow-600'
                                }`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
                                    {material.subject}
                                </span>
                            </div>
                            
                            <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">{material.title}</h3>
                            <p className="text-sm text-gray-500 mb-4 flex items-center">
                                {material.type} • {material.size} • {material.date}
                            </p>
                            
                            <div className="mt-auto pt-4 border-t border-gray-100">
                                <button onClick={() => handleDownload(material.title)} className="w-full flex items-center justify-center py-2 px-4 bg-gray-50 text-gray-700 rounded-lg font-medium hover:bg-primary-50 hover:text-primary-700 transition-colors border border-gray-200 hover:border-primary-200">
                                    {material.type === 'Video' ? <PlayCircle className="w-4 h-4 mr-2" /> : <Download className="w-4 h-4 mr-2" />}
                                    {material.type === 'Video' ? 'Watch Now' : 'Download File'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {filteredMaterials.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <Folder className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-gray-900">No materials found</h3>
                    <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria.</p>
                </div>
            )}
        </div>
    );
};

export default StudentMaterial;
