import React, { useState } from 'react';
import { Clock, MapPin, User, Calendar, Bell, X, Check } from 'lucide-react';

const StudentTimetable = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayIndex = new Date().getDay() - 1; 
    const [selectedDay, setSelectedDay] = useState(days[currentDayIndex >= 0 && currentDayIndex < 6 ? currentDayIndex : 0]);
    const [showReminderModal, setShowReminderModal] = useState(false);
    const [reminderSetting, setReminderSetting] = useState('15');

    // Dummy timetable data for Class 10-A
    const scheduleData = {
        Monday: [
            { period: 1, time: '08:00 AM - 08:45 AM', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 101', type: 'Core' },
            { period: 2, time: '08:45 AM - 09:30 AM', subject: 'Physics', teacher: 'Mrs. Verma', room: 'Lab 2', type: 'Lab' },
            { period: 3, time: '09:30 AM - 10:15 AM', subject: 'English', teacher: 'Ms. Gupta', room: 'Room 101', type: 'Core' },
            { period: 'Break', time: '10:15 AM - 10:45 AM', subject: 'Recess', teacher: '', room: 'Cafeteria', type: 'Break' },
            { period: 4, time: '10:45 AM - 11:30 AM', subject: 'Chemistry', teacher: 'Mr. Singh', room: 'Room 101', type: 'Core' },
            { period: 5, time: '11:30 AM - 12:15 PM', subject: 'History', teacher: 'Mrs. Patil', room: 'Room 101', type: 'Core' },
            { period: 6, time: '12:15 PM - 01:00 PM', subject: 'Physical Ed.', teacher: 'Mr. Yadav', room: 'Playground', type: 'Extra' },
        ],
        Tuesday: [
            { period: 1, time: '08:00 AM - 08:45 AM', subject: 'Biology', teacher: 'Dr. Nair', room: 'Lab 1', type: 'Lab' },
            { period: 2, time: '08:45 AM - 09:30 AM', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 101', type: 'Core' },
            { period: 3, time: '09:30 AM - 10:15 AM', subject: 'Geography', teacher: 'Mrs. Patil', room: 'Room 101', type: 'Core' },
            { period: 'Break', time: '10:15 AM - 10:45 AM', subject: 'Recess', teacher: '', room: 'Cafeteria', type: 'Break' },
            { period: 4, time: '10:45 AM - 11:30 AM', subject: 'Computer Sci.', teacher: 'Mr. Kumar', room: 'Computer Lab', type: 'Lab' },
            { period: 5, time: '11:30 AM - 12:15 PM', subject: 'English', teacher: 'Ms. Gupta', room: 'Room 101', type: 'Core' },
            { period: 6, time: '12:15 PM - 01:00 PM', subject: 'Library', teacher: 'Mrs. Sen', room: 'Library', type: 'Extra' },
        ],
        Wednesday: [
            { period: 1, time: '08:00 AM - 08:45 AM', subject: 'Physics', teacher: 'Mrs. Verma', room: 'Room 101', type: 'Core' },
            { period: 2, time: '08:45 AM - 09:30 AM', subject: 'Chemistry', teacher: 'Mr. Singh', room: 'Lab 3', type: 'Lab' },
            { period: 3, time: '09:30 AM - 10:15 AM', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 101', type: 'Core' },
            { period: 'Break', time: '10:15 AM - 10:45 AM', subject: 'Recess', teacher: '', room: 'Cafeteria', type: 'Break' },
            { period: 4, time: '10:45 AM - 11:30 AM', subject: 'Art & Craft', teacher: 'Ms. Das', room: 'Art Room', type: 'Extra' },
            { period: 5, time: '11:30 AM - 12:15 PM', subject: 'Biology', teacher: 'Dr. Nair', room: 'Room 101', type: 'Core' },
            { period: 6, time: '12:15 PM - 01:00 PM', subject: 'English', teacher: 'Ms. Gupta', room: 'Room 101', type: 'Core' },
        ],
        Thursday: [
            { period: 1, time: '08:00 AM - 08:45 AM', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 101', type: 'Core' },
            { period: 2, time: '08:45 AM - 09:30 AM', subject: 'History', teacher: 'Mrs. Patil', room: 'Room 101', type: 'Core' },
            { period: 3, time: '09:30 AM - 10:15 AM', subject: 'Computer Sci.', teacher: 'Mr. Kumar', room: 'Computer Lab', type: 'Lab' },
            { period: 'Break', time: '10:15 AM - 10:45 AM', subject: 'Recess', teacher: '', room: 'Cafeteria', type: 'Break' },
            { period: 4, time: '10:45 AM - 11:30 AM', subject: 'Physics', teacher: 'Mrs. Verma', room: 'Room 101', type: 'Core' },
            { period: 5, time: '11:30 AM - 12:15 PM', subject: 'Chemistry', teacher: 'Mr. Singh', room: 'Room 101', type: 'Core' },
            { period: 6, time: '12:15 PM - 01:00 PM', subject: 'Music', teacher: 'Mr. Roy', room: 'Music Room', type: 'Extra' },
        ],
        Friday: [
            { period: 1, time: '08:00 AM - 08:45 AM', subject: 'English', teacher: 'Ms. Gupta', room: 'Room 101', type: 'Core' },
            { period: 2, time: '08:45 AM - 09:30 AM', subject: 'Biology', teacher: 'Dr. Nair', room: 'Room 101', type: 'Core' },
            { period: 3, time: '09:30 AM - 10:15 AM', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 101', type: 'Core' },
            { period: 'Break', time: '10:15 AM - 10:45 AM', subject: 'Recess', teacher: '', room: 'Cafeteria', type: 'Break' },
            { period: 4, time: '10:45 AM - 11:30 AM', subject: 'Geography', teacher: 'Mrs. Patil', room: 'Room 101', type: 'Core' },
            { period: 5, time: '11:30 AM - 12:15 PM', subject: 'Physics', teacher: 'Mrs. Verma', room: 'Lab 2', type: 'Lab' },
            { period: 6, time: '12:15 PM - 01:00 PM', subject: 'Physical Ed.', teacher: 'Mr. Yadav', room: 'Playground', type: 'Extra' },
        ],
        Saturday: [
            { period: 1, time: '08:00 AM - 08:45 AM', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 101', type: 'Core' },
            { period: 2, time: '08:45 AM - 09:30 AM', subject: 'English', teacher: 'Ms. Gupta', room: 'Room 101', type: 'Core' },
            { period: 3, time: '09:30 AM - 10:15 AM', subject: 'Club Activity', teacher: 'Various', room: 'Auditorium', type: 'Extra' },
            { period: 'Break', time: '10:15 AM - 10:45 AM', subject: 'Recess', teacher: '', room: 'Cafeteria', type: 'Break' },
            { period: 4, time: '10:45 AM - 11:30 AM', subject: 'Doubt Clearing', teacher: 'All Faculty', room: 'Room 101', type: 'Core' },
        ]
    };

    const getSubjectColor = (type) => {
        switch (type) {
            case 'Core': return 'border-l-4 border-blue-500 bg-blue-50';
            case 'Lab': return 'border-l-4 border-purple-500 bg-purple-50';
            case 'Break': return 'border-l-4 border-gray-300 bg-gray-100';
            case 'Extra': return 'border-l-4 border-green-500 bg-green-50';
            default: return 'border-l-4 border-gray-200 bg-white';
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Class Timetable</h1>
                    <p className="text-sm text-gray-500 mt-1">Class 10-A Weekly Schedule</p>
                </div>
                <button onClick={() => setShowReminderModal(true)} className="flex items-center justify-center px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium hover:bg-primary-100 transition-colors border border-primary-200">
                    <Bell className="w-4 h-4 mr-2" />
                    Set Reminders
                </button>
            </div>

            {/* Day Selector Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 overflow-x-auto">
                <div className="flex space-x-2 min-w-max">
                    {days.map((day) => (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-200 flex items-center ${
                                selectedDay === day 
                                ? 'bg-primary-600 text-white shadow-md transform scale-[1.02]' 
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            <Calendar className={`w-4 h-4 mr-2 ${selectedDay === day ? 'text-primary-200' : 'text-gray-400'}`} />
                            {day}
                            {days[currentDayIndex] === day && <span className="ml-2 w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Timetable List for Selected Day */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="font-bold text-gray-800 flex items-center">
                        Schedule for {selectedDay}
                    </h2>
                    <span className="text-xs font-medium bg-white px-3 py-1 rounded-full border border-gray-200 text-gray-600">
                        {scheduleData[selectedDay]?.length || 0} Periods
                    </span>
                </div>
                
                <div className="p-4 space-y-3">
                    {scheduleData[selectedDay]?.map((slot, index) => (
                        <div 
                            key={index} 
                            className={`p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between transition-all hover:shadow-md ${getSubjectColor(slot.type)}`}
                        >
                            <div className="flex items-start md:items-center mb-3 md:mb-0">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg mr-4 flex-shrink-0 ${
                                    slot.type === 'Break' ? 'bg-gray-200 text-gray-600' : 'bg-white shadow-sm text-gray-800'
                                }`}>
                                    {slot.period}
                                </div>
                                <div>
                                    <h3 className={`text-lg font-bold ${slot.type === 'Break' ? 'text-gray-600' : 'text-gray-900'}`}>
                                        {slot.subject}
                                    </h3>
                                    <div className="flex items-center text-sm font-medium mt-1">
                                        <Clock className={`w-3.5 h-3.5 mr-1 ${slot.type === 'Break' ? 'text-gray-400' : 'text-primary-600'}`} />
                                        <span className={slot.type === 'Break' ? 'text-gray-500' : 'text-primary-700'}>{slot.time}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {slot.type !== 'Break' && (
                                <div className="flex flex-row md:flex-col gap-4 md:gap-2 pl-16 md:pl-0 md:text-right">
                                    <div className="flex items-center text-sm font-medium text-gray-700 md:justify-end">
                                        <User className="w-4 h-4 mr-1.5 text-gray-400" />
                                        {slot.teacher}
                                    </div>
                                    <div className="flex items-center text-sm font-medium text-gray-600 md:justify-end">
                                        <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
                                        {slot.room}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Set Reminders Modal */}
            {showReminderModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-primary-600 text-white">
                            <h3 className="font-bold flex items-center"><Bell className="w-5 h-5 mr-2"/> Alert Settings</h3>
                            <button onClick={() => setShowReminderModal(false)} className="text-primary-100 hover:text-white"><X className="w-5 h-5"/></button>
                        </div>
                        <div className="p-5 space-y-4">
                            <p className="text-sm text-gray-600 font-medium">When would you like to be reminded before a class starts?</p>
                            
                            <div className="space-y-2">
                                {['5', '10', '15', '30'].map((time) => (
                                    <label key={time} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${reminderSetting === time ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                        <input 
                                            type="radio" 
                                            name="reminder" 
                                            value={time} 
                                            checked={reminderSetting === time}
                                            onChange={() => setReminderSetting(time)}
                                            className="text-primary-600 focus:ring-primary-500 w-4 h-4"
                                        />
                                        <span className="ml-3 text-sm font-bold text-gray-700">{time} Minutes Before</span>
                                    </label>
                                ))}
                            </div>
                            
                            <button 
                                onClick={() => {
                                    alert(`Push notifications have been set to remind you ${reminderSetting} minutes before every class!`);
                                    setShowReminderModal(false);
                                }}
                                className="w-full flex justify-center items-center py-2.5 px-4 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 mt-4"
                            >
                                <Check className="w-5 h-5 mr-2" /> Save Settings
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentTimetable;
