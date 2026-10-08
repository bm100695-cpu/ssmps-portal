import React, { useState } from 'react';
import { IndianRupee, TrendingUp, AlertTriangle, Download, ArrowUpRight, Search, FileText } from 'lucide-react';

const PrincipalFeeOverview = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const recentTransactions = [
        { id: 'TXN-9021', name: 'Rohan Sharma', class: '10th A', amount: '₹12,500', date: 'Today, 10:30 AM', status: 'Success', mode: 'UPI' },
        { id: 'TXN-9020', name: 'Aarohi Patel', class: '8th B', amount: '₹10,000', date: 'Today, 09:15 AM', status: 'Success', mode: 'Credit Card' },
        { id: 'TXN-9019', name: 'Karan Singh', class: '12th Sci', amount: '₹15,000', date: 'Yesterday', status: 'Success', mode: 'Bank Transfer' },
        { id: 'TXN-9018', name: 'Sneha Reddy', class: '11th Com', amount: '₹14,000', date: 'Yesterday', status: 'Failed', mode: 'UPI' },
    ];

    const defaulters = [
        { name: 'Vikas Sharma', class: '9th C', parent: 'Rakesh Sharma', pending: '₹24,000', overdueBy: '45 days' },
        { name: 'Priya Verma', class: '7th A', parent: 'Sunil Verma', pending: '₹18,000', overdueBy: '30 days' },
        { name: 'Amit Kumar', class: '10th B', parent: 'Ashok Kumar', pending: '₹32,500', overdueBy: '60 days' },
    ];

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <IndianRupee className="w-6 h-6 mr-2 text-green-600" /> Fee & Revenue Overview
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Track school revenue, recent fee collections, and pending dues.</p>
                </div>
                <button className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                    <Download className="w-4 h-4 mr-2" /> Export Financial Report
                </button>
            </div>

            {/* High-level Financials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-2xl shadow-sm text-white">
                    <p className="text-sm font-bold text-green-100 uppercase tracking-wider mb-2">Total Collection (YTD)</p>
                    <span className="text-4xl font-black">₹4.2 Cr</span>
                    <p className="text-sm font-medium text-green-200 mt-2 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" /> +12% from last year
                    </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Expected Revenue</p>
                    <span className="text-4xl font-black text-gray-900">₹5.5 Cr</span>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 mt-4">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '76%' }}></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 font-bold">76% Target Achieved</p>
                </div>
                <div className="bg-red-50 p-6 rounded-2xl shadow-sm border border-red-100">
                    <p className="text-sm font-bold text-red-600 uppercase tracking-wider mb-2 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1" /> Total Pending Dues
                    </p>
                    <span className="text-4xl font-black text-red-700">₹1.3 Cr</span>
                    <p className="text-sm font-medium text-red-500 mt-2">Across 324 students</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Recent Transactions Table */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <h3 className="font-bold text-gray-900">Recent Fee Payments</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search Txn ID or Name..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white border-b border-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-4 font-bold">Student</th>
                                    <th className="px-6 py-4 font-bold">Txn ID / Mode</th>
                                    <th className="px-6 py-4 font-bold">Date</th>
                                    <th className="px-6 py-4 font-bold text-right">Amount</th>
                                    <th className="px-6 py-4 font-bold text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recentTransactions.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.id.toLowerCase().includes(searchTerm.toLowerCase())).map((txn, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-gray-900">{txn.name}</p>
                                            <p className="text-xs text-gray-500">{txn.class}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-mono font-medium text-gray-600">{txn.id}</p>
                                            <p className="text-xs text-gray-400">{txn.mode}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {txn.date}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-sm font-black text-gray-900">{txn.amount}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                                txn.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                                {txn.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-gray-100 bg-white text-center">
                        <button className="text-sm font-bold text-primary-600 hover:text-primary-800 transition-colors">View All Transactions →</button>
                    </div>
                </div>

                {/* Defaulters & Alerts */}
                <div className="space-y-6">
                    
                    {/* Collection by Installment (Mock Graph) */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-4">Collection by Installment</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">
                                    <span>Term 1 (April)</span>
                                    <span>98%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-primary-500 h-1.5 rounded-full" style={{ width: '98%' }}></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">
                                    <span>Term 2 (August)</span>
                                    <span>85%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-primary-500 h-1.5 rounded-full" style={{ width: '85%' }}></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">
                                    <span>Term 3 (December)</span>
                                    <span className="text-orange-500">12%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '12%' }}></div></div>
                            </div>
                        </div>
                    </div>

                    {/* Defaulters List */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-2 text-red-500" /> High Priority Defaulters
                        </h3>
                        <div className="space-y-3">
                            {defaulters.map((d, i) => (
                                <div key={i} className="p-3 bg-red-50 border border-red-100 rounded-xl flex justify-between items-center">
                                    <div>
                                        <h4 className="text-sm font-bold text-red-900">{d.name} <span className="text-xs text-red-600 font-normal">({d.class})</span></h4>
                                        <p className="text-[10px] text-red-700 font-medium mt-0.5">Parent: {d.parent}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-red-700">{d.pending}</p>
                                        <p className="text-[10px] font-bold text-red-500 uppercase">{d.overdueBy}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-black transition-colors flex justify-center items-center">
                            <FileText className="w-3 h-3 mr-2" /> Send Auto-Reminders to All
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PrincipalFeeOverview;
