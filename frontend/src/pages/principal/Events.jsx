import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Users, Plus, X, AlignLeft } from 'lucide-react';

const PrincipalEvents = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    
    // Default form state
    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        type: 'Academic',
        desc: ''
    });

    const [events, setEvents] = useState([
        { id: 1, title: 'Annual Sports Day', date: '2026-10-15', time: '08:00 AM', location: 'School Ground', type: 'Sports', desc: 'Annual sports meet for all classes. Parents are invited.', color: 'bg-blue-100 text-blue-700 border-blue-200' },
        { id: 2, title: 'Diwali Break Starts', date: '2026-10-22', time: 'All Day', location: 'School Wide', type: 'Holiday', desc: 'School remains closed for Diwali holidays.', color: 'bg-red-100 text-red-700 border-red-200' },
        { id: 3, title: 'Science Exhibition', date: '2026-11-05', time: '10:00 AM', location: 'Main Hall', type: 'Academic', desc: 'Inter-school science project exhibition.', color: 'bg-green-100 text-green-700 border-green-200' },
        { id: 4, title: 'Staff Meeting', date: '2026-10-10', time: '02:00 PM', location: 'Conference Room', type: 'Staff', desc: 'Monthly review meeting for all teachers.', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    ]);

    const handleAddEvent = () => {
        if (!newEvent.title || !newEvent.date) {
            alert("Title and Date are required!");
            return;
        }

        let color = 'bg-gray-100 text-gray-700 border-gray-200';
        if (newEvent.type === 'Sports') color = 'bg-blue-100 text-blue-700 border-blue-200';
        if (newEvent.type === 'Holiday') color = 'bg-red-100 text-red-700 border-red-200';
        if (newEvent.type === 'Academic') color = 'bg-green-100 text-green-700 border-green-200';
        if (newEvent.type === 'Staff') color = 'bg-purple-100 text-purple-700 border-purple-200';
        if (newEvent.type === 'Cultural') color = 'bg-orange-100 text-orange-700 border-orange-200';

        const eventToAdd = {
            id: events.length + 1,
            ...newEvent,
            color
        };

        // Sort events by date
        const updatedEvents = [...events, eventToAdd].sort((a, b) => new Date(a.date) - new Date(b.date));
        
        setEvents(updatedEvents);
        setShowAddModal(false);
        setNewEvent({ title: '', date: '', time: '', location: '', type: 'Academic', desc: '' });
        alert("Event added to the School Calendar!");
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <CalendarIcon className="w-6 h-6 mr-2 text-primary-600" /> School Event Calendar
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Manage school-wide events. This calendar is synced to all Students, Parents, and Teachers.</p>
                </div>
                <button onClick={() => setShowAddModal(true)} className="flex items-center px-4 py-2 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-colors shadow-sm">
                    <Plus className="w-4 h-4 mr-2" /> Add New Event
                </button>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-sm font-bold bg-gray-900 text-white rounded-full">All Events</span>
                <span className="px-3 py-1 text-sm font-bold bg-green-50 text-green-700 border border-green-200 rounded-full cursor-pointer hover:bg-green-100">Academic</span>
                <span className="px-3 py-1 text-sm font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded-full cursor-pointer hover:bg-blue-100">Sports</span>
                <span className="px-3 py-1 text-sm font-bold bg-red-50 text-red-700 border border-red-200 rounded-full cursor-pointer hover:bg-red-100">Holidays</span>
                <span className="px-3 py-1 text-sm font-bold bg-purple-50 text-purple-700 border border-purple-200 rounded-full cursor-pointer hover:bg-purple-100">Staff Only</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Event List / Timeline */}
                <div className="lg:col-span-2 space-y-4">
                    {events.map((event) => {
                        const dateObj = new Date(event.date);
                        const day = dateObj.toLocaleDateString('en-GB', { day: '2-digit' });
                        const month = dateObj.toLocaleDateString('en-GB', { month: 'short' });
                        const isPast = dateObj < new Date(new Date().setDate(new Date().getDate() - 1));

                        return (
                            <div key={event.id} className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start transition-all ${isPast ? 'opacity-60' : 'hover:shadow-md'}`}>
                                
                                {/* Date Block */}
                                <div className="flex flex-col items-center justify-center shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 border border-gray-200 rounded-xl">
                                    <span className="text-xl sm:text-2xl font-black text-gray-900 leading-none">{day}</span>
                                    <span className="text-xs sm:text-sm font-bold text-gray-500 uppercase mt-1">{month}</span>
                                </div>

                                {/* Event Details */}
                                <div className="flex-1 w-full">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${event.color}`}>
                                            {event.type}
                                        </span>
                                    </div>
                                    
                                    <p className="text-sm text-gray-600 mb-4">{event.desc}</p>
                                    
                                    <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-500">
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1 text-gray-400" /> {event.time}
                                        </div>
                                        <div className="flex items-center">
                                            <MapPin className="w-4 h-4 mr-1 text-gray-400" /> {event.location}
                                        </div>
                                        <div className="flex items-center">
                                            <Users className="w-4 h-4 mr-1 text-gray-400" /> 
                                            {event.type === 'Staff' ? 'Staff Only' : 'All School'}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>

                {/* Calendar Widget Area */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-900">October 2026</h3>
                            <div className="flex space-x-2 text-gray-400">
                                <button className="hover:text-gray-900">←</button>
                                <button className="hover:text-gray-900">→</button>
                            </div>
                        </div>
                        {/* Mock Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                            {['Mo','Tu','We','Th','Fr','Sa','Su'].map(d => <div key={d} className="font-bold text-gray-400">{d}</div>)}
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium">
                            {Array.from({length: 31}, (_, i) => {
                                const day = i + 1;
                                const isEventDay = events.some(e => parseInt(e.date.split('-')[2]) === day && e.date.startsWith('2026-10'));
                                return (
                                    <div key={day} className={`w-8 h-8 flex items-center justify-center mx-auto rounded-full ${
                                        day === new Date().getDate() ? 'bg-primary-600 text-white font-bold' : 
                                        isEventDay ? 'bg-primary-100 text-primary-700 font-bold' : 'text-gray-700 hover:bg-gray-100 cursor-pointer'
                                    }`}>
                                        {day}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                        <h3 className="font-bold text-blue-900 mb-2 flex items-center">
                            <Users className="w-5 h-5 mr-2 text-blue-600" /> Synced to Everyone
                        </h3>
                        <p className="text-sm text-blue-800">
                            When you add an event here, it instantly appears on the dashboards of all Parents, Students, and Teachers across the school network.
                        </p>
                    </div>
                </div>

            </div>

            {/* Add Event Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                            <h2 className="text-xl font-bold text-gray-900">Add School Event</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Event Title *</label>
                                <input 
                                    type="text" 
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" 
                                    placeholder="e.g. Annual Function" 
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Date *</label>
                                    <input 
                                        type="date" 
                                        value={newEvent.date}
                                        onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Time</label>
                                    <input 
                                        type="text" 
                                        value={newEvent.time}
                                        onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" 
                                        placeholder="e.g. 10:00 AM or All Day" 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                                    <select 
                                        value={newEvent.type}
                                        onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                                    >
                                        <option value="Academic">Academic</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Cultural">Cultural</option>
                                        <option value="Holiday">Holiday</option>
                                        <option value="Staff">Staff Only</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Location</label>
                                    <input 
                                        type="text" 
                                        value={newEvent.location}
                                        onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" 
                                        placeholder="e.g. Main Hall" 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                                <textarea 
                                    value={newEvent.desc}
                                    onChange={(e) => setNewEvent({...newEvent, desc: e.target.value})}
                                    className="w-full h-24 p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                                    placeholder="Add details about the event..."
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-100">
                            <button onClick={() => setShowAddModal(false)} className="px-5 py-2.5 font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleAddEvent} className="px-5 py-2.5 font-black text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors shadow-sm">
                                Save to Calendar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrincipalEvents;
