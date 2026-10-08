import React, { useState } from 'react';
import { Users, UserCheck, UserX, Search, Filter, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

const DriverTripManagement = () => {
    // Simulated list of students for the trip
    const [students, setStudents] = useState([
        { id: 'STU-001', name: 'Aarav Sharma', class: '10th A', stop: 'Vasant Vihar', status: 'Pending', avatar: 'AS' },
        { id: 'STU-002', name: 'Diya Patel', class: '9th B', stop: 'Vasant Vihar', status: 'Pending', avatar: 'DP' },
        { id: 'STU-003', name: 'Rohan Gupta', class: '8th C', stop: 'Sunrise Enclave', status: 'Pending', avatar: 'RG' },
        { id: 'STU-004', name: 'Ananya Singh', class: '11th Science', stop: 'Green Park Metro', status: 'Pending', avatar: 'AS' },
        { id: 'STU-005', name: 'Kabir Khan', class: '10th A', stop: 'Green Park Metro', status: 'Pending', avatar: 'KK' },
        { id: 'STU-006', name: 'Sneha Verma', class: '12th Commerce', stop: 'City Center Mall', status: 'Pending', avatar: 'SV' },
        { id: 'STU-007', name: 'Vivaan Reddy', class: '7th B', stop: 'Sunrise Enclave', status: 'Pending', avatar: 'VR' },
    ]);

    const [tripType, setTripType] = useState('Pickup'); // 'Pickup' or 'Drop'
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newStudent, setNewStudent] = useState({ name: '', class: '', stop: '' });

    const handleAddStudent = () => {
        if (!newStudent.name.trim()) return;
        const student = {
            id: `STU-NEW-${Date.now()}`,
            name: newStudent.name,
            class: newStudent.class,
            stop: newStudent.stop || 'Unknown',
            status: 'Pending',
            avatar: newStudent.name.substring(0, 2).toUpperCase()
        };
        setStudents([student, ...students]);
        setNewStudent({ name: '', class: '', stop: '' });
        setShowAddModal(false);
    };

    const markStatus = (id, newStatus) => {
        setStudents(students.map(student => 
            student.id === id ? { ...student, status: newStatus } : student
        ));
    };

    const getStatusColor = (status) => {
        if (status === 'Boarded' || status === 'Dropped') return 'bg-green-100 text-green-700 border-green-200';
        if (status === 'Absent') return 'bg-red-100 text-red-700 border-red-200';
        return 'bg-gray-100 text-gray-500 border-gray-200';
    };

    const getStatusIcon = (status) => {
        if (status === 'Boarded' || status === 'Dropped') return <UserCheck className="w-4 h-4 mr-1" />;
        if (status === 'Absent') return <UserX className="w-4 h-4 mr-1" />;
        return <Users className="w-4 h-4 mr-1" />;
    };

    const successCount = students.filter(s => s.status === 'Boarded' || s.status === 'Dropped').length;
    const absentCount = students.filter(s => s.status === 'Absent').length;
    const pendingCount = students.filter(s => s.status === 'Pending').length;

    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        student.stop.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Student {tripType} Management</h1>
                    <p className="text-sm text-gray-500 mt-1">Mark students as they {tripType === 'Pickup' ? 'board' : 'get off'} the bus to notify parents.</p>
                </div>
                
                {/* Trip Type Toggle */}
                <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 shadow-inner">
                    <button 
                        onClick={() => { setTripType('Pickup'); setStudents(students.map(s => ({...s, status: 'Pending'}))) }}
                        className={`px-6 py-2 rounded-md font-bold text-sm transition-all ${tripType === 'Pickup' ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Morning Pickup
                    </button>
                    <button 
                        onClick={() => { setTripType('Drop'); setStudents(students.map(s => ({...s, status: 'Pending'}))) }}
                        className={`px-6 py-2 rounded-md font-bold text-sm transition-all ${tripType === 'Drop' ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Afternoon Drop
                    </button>
                </div>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-green-600 uppercase">{tripType === 'Pickup' ? 'Boarded' : 'Dropped'}</p>
                        <p className="text-2xl font-black text-gray-900">{successCount}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                        <UserCheck className="w-6 h-6 text-green-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-red-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-red-600 uppercase">Absent</p>
                        <p className="text-2xl font-black text-gray-900">{absentCount}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                        <UserX className="w-6 h-6 text-red-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase">Pending</p>
                        <p className="text-2xl font-black text-gray-900">{pendingCount}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <Users className="w-6 h-6 text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[600px]">
                
                {/* Search Bar & Actions */}
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search by student name or stop..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-sm"
                        />
                    </div>
                    <button 
                        onClick={() => setShowAddModal(true)}
                        className="px-6 py-3 bg-white text-primary-600 font-bold rounded-lg border border-primary-200 hover:bg-primary-50 transition-colors shadow-sm flex items-center justify-center whitespace-nowrap"
                    >
                        + Add Student
                    </button>
                </div>

                {/* Student List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {filteredStudents.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <Users className="w-12 h-12 mb-2 opacity-50" />
                            <p>No students found matching your search.</p>
                        </div>
                    ) : (
                        filteredStudents.map((student) => (
                            <div key={student.id} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border transition-all ${
                                student.status === 'Boarded' || student.status === 'Dropped' ? 'bg-green-50/30 border-green-200' :
                                student.status === 'Absent' ? 'bg-red-50/30 border-red-200' :
                                'bg-white border-gray-200 hover:border-primary-300'
                            }`}>
                                
                                <div className="flex items-center mb-3 sm:mb-0 w-full sm:w-auto">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold mr-4 ${
                                        student.status === 'Boarded' || student.status === 'Dropped' ? 'bg-green-100 text-green-700' :
                                        student.status === 'Absent' ? 'bg-red-100 text-red-700' :
                                        'bg-primary-100 text-primary-700'
                                    }`}>
                                        {student.avatar}
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-gray-900">{student.name}</h3>
                                        <p className="text-xs text-gray-500 font-medium">{student.class} • {student.stop}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(student.status)}`}>
                                        {getStatusIcon(student.status)}
                                        {student.status}
                                    </span>
                                    
                                    <div className="flex space-x-2 ml-4">
                                        <button 
                                            onClick={() => markStatus(student.id, 'Absent')}
                                            className={`p-2 rounded-lg border transition-colors ${
                                                student.status === 'Absent' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-red-600 border-red-200 hover:bg-red-50'
                                            }`}
                                            title="Mark Absent"
                                        >
                                            <UserX className="w-5 h-5" />
                                        </button>
                                        <button 
                                            onClick={() => markStatus(student.id, tripType === 'Pickup' ? 'Boarded' : 'Dropped')}
                                            className={`px-4 py-2 rounded-lg border font-bold text-sm transition-colors flex items-center ${
                                                student.status === 'Boarded' || student.status === 'Dropped' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-green-600 border-green-200 hover:bg-green-50'
                                            }`}
                                        >
                                            <CheckCircle className="w-4 h-4 mr-2" /> {tripType === 'Pickup' ? 'Board' : 'Drop Off'}
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Add Student Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in duration-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Add Unassigned Student</h2>
                        <p className="text-sm text-gray-500 mb-6">Temporarily add a student to this trip (e.g. they missed their regular bus).</p>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Student Name</label>
                                <input 
                                    type="text" 
                                    value={newStudent.name}
                                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                                    placeholder="E.g. Rahul Kumar"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Class</label>
                                    <input 
                                        type="text" 
                                        value={newStudent.class}
                                        onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
                                        placeholder="E.g. 9th A"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Stop</label>
                                    <input 
                                        type="text" 
                                        value={newStudent.stop}
                                        onChange={(e) => setNewStudent({...newStudent, stop: e.target.value})}
                                        placeholder="E.g. Green Park"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex justify-end space-x-3 mt-6">
                            <button onClick={() => setShowAddModal(false)} className="px-4 py-2 font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleAddStudent} className="px-4 py-2 font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors shadow-sm">
                                Add to Trip
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DriverTripManagement;
