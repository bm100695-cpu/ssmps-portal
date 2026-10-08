import React, { useState, useEffect } from 'react';
import { PieChart, BarChart3, TrendingUp, Users, DollarSign, Download, ArrowUpRight, GraduationCap } from 'lucide-react';

const Reports = () => {
    const [loading, setLoading] = useState(true);

    // Mocking data load
    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-rose-500 border-t-transparent"></div>
        </div>
    );

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            {/* Premium Header */}
            <div className="bg-gradient-to-br from-rose-600 to-pink-800 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute left-10 bottom-0 w-40 h-40 bg-pink-400 opacity-20 rounded-full blur-2xl transform translate-y-1/2"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <p className="text-pink-200 font-bold tracking-wider uppercase text-sm mb-1 flex items-center">
                            <PieChart className="w-4 h-4 mr-2" /> School Intelligence
                        </p>
                        <h1 className="text-3xl md:text-4xl font-black mb-2">Reports & Analytics</h1>
                        <p className="text-pink-50 font-medium opacity-90 max-w-xl">
                            Comprehensive insights into academics, attendance, and financial performance.
                        </p>
                    </div>
                    <button className="px-6 py-3 bg-white text-rose-800 hover:bg-rose-50 rounded-xl font-black transition-all flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        <Download className="w-5 h-5 mr-2" /> Export Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Academic Performance Widget */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-black text-gray-900 flex items-center">
                            <GraduationCap className="w-6 h-6 mr-2 text-rose-600" /> Academic Performance
                        </h2>
                        <select className="bg-gray-50 border border-gray-200 text-sm font-bold text-gray-600 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-rose-500">
                            <option>Mid-Term 2026</option>
                            <option>Finals 2025</option>
                        </select>
                    </div>
                    
                    <div className="space-y-5">
                        {/* Custom Bar Charts using Tailwind */}
                        {[
                            { grade: 'Grade 10', pass: 92, color: 'bg-emerald-500' },
                            { grade: 'Grade 9', pass: 88, color: 'bg-blue-500' },
                            { grade: 'Grade 8', pass: 95, color: 'bg-violet-500' },
                            { grade: 'Grade 7', pass: 82, color: 'bg-amber-500' }
                        ].map((item, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-sm font-bold">
                                    <span className="text-gray-700">{item.grade}</span>
                                    <span className="text-gray-900">{item.pass}% Pass Rate</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden flex">
                                    <div className={`${item.color} h-3 rounded-full`} style={{ width: `${item.pass}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Growth Stats */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-3xl p-6 text-white shadow-sm relative overflow-hidden">
                        <TrendingUp className="absolute -right-4 -bottom-4 w-32 h-32 text-white opacity-10" />
                        <p className="text-emerald-100 font-bold uppercase tracking-wider text-xs mb-2">Total Enrollments</p>
                        <h3 className="text-4xl font-black mb-1">1,248</h3>
                        <p className="text-sm font-medium text-emerald-100 flex items-center">
                            <ArrowUpRight className="w-4 h-4 mr-1" /> +12% from last year
                        </p>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                            <Users className="w-6 h-6" />
                        </div>
                        <p className="text-gray-500 font-bold text-xs uppercase tracking-wider mb-1">Avg Attendance</p>
                        <h3 className="text-3xl font-black text-gray-900 mb-1">94.2%</h3>
                        <p className="text-xs font-bold text-emerald-500 flex items-center">
                            <ArrowUpRight className="w-3 h-3 mr-1" /> Healthy
                        </p>
                    </div>
                </div>

            </div>

            {/* Financial Overview & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Financial Health */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-black text-gray-900 flex items-center">
                            <DollarSign className="w-6 h-6 mr-2 text-emerald-600" /> Financial Health
                        </h2>
                    </div>
                    
                    <div className="flex items-center justify-center py-6">
                        {/* Mock Donut Chart via CSS */}
                        <div className="relative w-48 h-48 rounded-full border-[16px] border-gray-100 flex items-center justify-center"
                             style={{ background: 'conic-gradient(#10b981 0% 75%, #f59e0b 75% 90%, #ef4444 90% 100%)', borderRadius: '50%' }}>
                            <div className="absolute inset-0 m-auto w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-sm">
                                <span className="text-2xl font-black text-gray-900">75%</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Collected</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                        <div>
                            <div className="w-3 h-3 rounded-full bg-emerald-500 mx-auto mb-1"></div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase">Collected</span>
                        </div>
                        <div>
                            <div className="w-3 h-3 rounded-full bg-amber-500 mx-auto mb-1"></div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase">Pending</span>
                        </div>
                        <div>
                            <div className="w-3 h-3 rounded-full bg-red-500 mx-auto mb-1"></div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase">Overdue</span>
                        </div>
                    </div>
                </div>

                {/* System Activity */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-black text-gray-900 flex items-center">
                            <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" /> System Usage
                        </h2>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500 mr-4"></div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Highest Traffic Portal</h4>
                                <p className="text-xs text-gray-500 mt-1">Student Portal sees 60% of all daily logins, peaking at 8:00 AM.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500 mr-4"></div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Parent Engagement</h4>
                                <p className="text-xs text-gray-500 mt-1">85% of registered parents check the attendance module weekly.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="w-2 h-2 mt-2 rounded-full bg-rose-500 mr-4"></div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Server Health</h4>
                                <p className="text-xs text-gray-500 mt-1">API response time averages 120ms. No downtime reported in last 30 days.</p>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                            <button className="text-indigo-600 text-sm font-bold hover:text-indigo-700">View Detailed System Logs &rarr;</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Reports;
