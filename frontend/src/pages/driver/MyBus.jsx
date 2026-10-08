import React, { useState } from 'react';
import { Bus, PenTool, ShieldCheck, FileText, AlertTriangle, CheckCircle, Plus } from 'lucide-react';

const DriverMyBus = () => {
    const [fuelEfficiency, setFuelEfficiency] = useState('4.2 km/l');

    const busDetails = {
        number: 'DL-1PC-4321',
        model: 'Tata Marcopolo 2021',
        capacity: 45,
        routeAssigned: 'Route 4 (Morning & Afternoon)',
        status: 'Active & Healthy',
        documents: {
            insurance: { date: '15 Aug 2027', status: 'Valid' },
            pollution: { date: '20 Nov 2026', status: 'Expiring Soon' },
            fitness: { date: '10 Jan 2028', status: 'Valid' }
        }
    };

    const [recentMaintenance, setRecentMaintenance] = useState([
        { id: 1, date: '10 Sep 2026', issue: 'Engine Oil Change', cost: '₹2,500', status: 'Completed' },
        { id: 2, date: '05 Aug 2026', issue: 'Brake Pad Replacement', cost: '₹4,200', status: 'Completed' },
        { id: 3, date: '15 Jul 2026', issue: 'AC Servicing', cost: '₹1,800', status: 'Completed' },
    ]);

    const [showServiceModal, setShowServiceModal] = useState(false);
    const [serviceIssue, setServiceIssue] = useState('');

    const handleMaintenanceRequest = () => {
        setShowServiceModal(true);
    };

    const handleServiceSubmit = () => {
        if (!serviceIssue.trim()) return;
        
        const newRecord = {
            id: Date.now(),
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            issue: serviceIssue,
            cost: 'Pending Quote',
            status: 'Requested'
        };
        
        setRecentMaintenance([newRecord, ...recentMaintenance]);
        setServiceIssue('');
        setShowServiceModal(false);
        alert("Service request submitted to the Admin!");
    };

    const handleUpdateFuel = () => {
        const newFuel = prompt("Enter today's fuel efficiency (e.g. 4.5 km/l):", fuelEfficiency);
        if (newFuel) {
            setFuelEfficiency(newFuel);
            alert("Fuel log updated successfully!");
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Bus Details</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your assigned vehicle, check documents, and request maintenance.</p>
                </div>
                <button 
                    onClick={handleMaintenanceRequest}
                    className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-colors shadow-sm"
                >
                    <PenTool className="w-4 h-4 mr-2" />
                    Request Service
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: Hero Bus Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="h-32 bg-primary-600 flex items-center justify-center relative">
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
                            <Bus className="w-16 h-16 text-white relative z-10" />
                        </div>
                        <div className="p-6 text-center -mt-6 relative z-20">
                            <span className="inline-block px-4 py-1.5 bg-yellow-400 text-yellow-900 font-black text-xl rounded-md shadow-md border-2 border-gray-900 tracking-widest mb-4">
                                {busDetails.number}
                            </span>
                            <h2 className="text-lg font-bold text-gray-900">{busDetails.model}</h2>
                            <p className="text-sm font-medium text-gray-500 mt-1">{busDetails.routeAssigned}</p>
                            
                            <div className="mt-6 flex items-center justify-center space-x-2 text-sm font-bold text-green-600 bg-green-50 py-2 rounded-lg border border-green-200">
                                <CheckCircle className="w-5 h-5" />
                                <span>{busDetails.status}</span>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-100 p-6 bg-gray-50 grid grid-cols-2 gap-4 text-center">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Capacity</p>
                                <p className="text-lg font-black text-gray-900 mt-1">{busDetails.capacity} Seats</p>
                            </div>
                            <div className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors" onClick={handleUpdateFuel} title="Click to update fuel log">
                                <p className="text-xs font-bold text-gray-400 uppercase flex items-center justify-center">Avg Mileage <PenTool className="w-3 h-3 ml-1" /></p>
                                <p className="text-lg font-black text-gray-900 mt-1">{fuelEfficiency}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Documents & Maintenance */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Compliance & Documents */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-6 flex items-center">
                            <ShieldCheck className="w-5 h-5 mr-2 text-primary-500" /> 
                            Vehicle Compliance & Documents
                        </h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Insurance */}
                            <div className="p-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all">
                                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Insurance</p>
                                <h4 className="text-lg font-bold text-gray-900">{busDetails.documents.insurance.date}</h4>
                                <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
                                    <CheckCircle className="w-3 h-3 mr-1" /> {busDetails.documents.insurance.status}
                                </span>
                            </div>
                            
                            {/* Pollution (PUC) */}
                            <div className="p-4 border border-orange-200 rounded-xl bg-orange-50 hover:bg-white hover:shadow-md transition-all relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-orange-100 rounded-bl-full -z-10"></div>
                                <p className="text-xs font-bold text-orange-600 uppercase mb-1">Pollution (PUC)</p>
                                <h4 className="text-lg font-bold text-gray-900">{busDetails.documents.pollution.date}</h4>
                                <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-700">
                                    <AlertTriangle className="w-3 h-3 mr-1" /> {busDetails.documents.pollution.status}
                                </span>
                            </div>

                            {/* Fitness Certificate */}
                            <div className="p-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all">
                                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Fitness Cert.</p>
                                <h4 className="text-lg font-bold text-gray-900">{busDetails.documents.fitness.date}</h4>
                                <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
                                    <CheckCircle className="w-3 h-3 mr-1" /> {busDetails.documents.fitness.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Maintenance History */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-gray-900 flex items-center">
                                <PenTool className="w-5 h-5 mr-2 text-primary-500" /> 
                                Recent Maintenance
                            </h3>
                            <button className="text-sm font-bold text-primary-600 hover:text-primary-800">View All</button>
                        </div>
                        
                        <div className="space-y-4">
                            {recentMaintenance.map((record) => (
                                <div key={record.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 border border-gray-100 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="mb-2 sm:mb-0">
                                        <h4 className="font-bold text-gray-900 text-sm">{record.issue}</h4>
                                        <p className="text-xs text-gray-500 flex items-center mt-1">
                                            <FileText className="w-3 h-3 mr-1" /> {record.date}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end sm:w-32">
                                        <span className="font-bold text-gray-900 text-sm">{record.cost}</span>
                                        <span className="text-[10px] font-bold text-green-600 uppercase bg-green-100 px-2 py-1 rounded ml-3">
                                            {record.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Service Request Modal */}
            {showServiceModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in duration-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Request Bus Service</h2>
                        <p className="text-sm text-gray-500 mb-4">Describe the issue you are facing with the bus. This will be sent to the Transport Admin.</p>
                        
                        <textarea 
                            value={serviceIssue}
                            onChange={(e) => setServiceIssue(e.target.value)}
                            placeholder="Example: Headlight bulb needs replacement, or Brake making noise..."
                            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none mb-4"
                        ></textarea>
                        
                        <div className="flex justify-end space-x-3">
                            <button onClick={() => setShowServiceModal(false)} className="px-4 py-2 font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleServiceSubmit} className="px-4 py-2 font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors shadow-sm flex items-center">
                                <PenTool className="w-4 h-4 mr-2" /> Submit Request
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DriverMyBus;
