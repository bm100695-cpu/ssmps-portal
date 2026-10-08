import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { DollarSign, CheckCircle, Clock, AlertCircle, Search, Plus, CreditCard, TrendingUp, Wallet, Receipt } from 'lucide-react';

const Finance = () => {
    const [fees, setFees] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { user: currentUser } = useContext(AuthContext);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ 
        student: '', feeType: 'Tuition', amount: '', dueDate: '' 
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
            const [feesRes, usersRes] = await Promise.all([
                axios.get('/api/fees', config),
                axios.get('/api/users?role=Student', config)
            ]);
            
            setFees(feesRes.data);
            setStudents(usersRes.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleCreateFee = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
            await axios.post('/api/fees', formData, config);
            setIsModalOpen(false);
            setFormData({ student: '', feeType: 'Tuition', amount: '', dueDate: '' });
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || 'Error creating fee record');
        }
    };

    const handleMarkPaid = async (id) => {
        if(window.confirm('Mark this fee as Paid? This will generate a transaction ID.')) {
            try {
                const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
                await axios.put(`/api/fees/${id}/pay`, {}, config);
                fetchData();
            } catch (err) {
                alert(err.response?.data?.message || 'Error updating fee');
            }
        }
    };

    const filteredFees = fees.filter(f => 
        (f.student?.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.feeType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (f.transactionId && f.transactionId.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
        </div>
    );

    const totalCollected = fees.filter(f => f.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0);
    const totalPending = fees.filter(f => f.status === 'Pending').reduce((acc, curr) => acc + curr.amount, 0);
    const totalInvoices = fees.length;

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            {/* Premium Header */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"></div>
                <div className="absolute left-10 bottom-0 w-40 h-40 bg-teal-400 opacity-20 rounded-full blur-2xl transform translate-y-1/2"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <p className="text-teal-100 font-bold tracking-wider uppercase text-sm mb-1 flex items-center">
                            <Wallet className="w-4 h-4 mr-2" /> Financial Dashboard
                        </p>
                        <h1 className="text-3xl md:text-4xl font-black mb-2">Fees & Revenue</h1>
                        <p className="text-teal-50 font-medium opacity-90 max-w-xl">
                            Track fee collections, pending payments, and generate new invoices for students instantly.
                        </p>
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="px-6 py-3 bg-white text-teal-800 hover:bg-teal-50 rounded-xl font-black transition-all flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        <Plus className="w-5 h-5 mr-2" /> Generate Invoice
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center group hover:shadow-md transition-all relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl mr-5 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <TrendingUp className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Collected</p>
                        <h3 className="text-3xl font-black text-gray-900">${totalCollected.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center group hover:shadow-md transition-all relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-orange-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="w-16 h-16 bg-orange-100 rounded-2xl mr-5 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Clock className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Pending</p>
                        <h3 className="text-3xl font-black text-gray-900">${totalPending.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center group hover:shadow-md transition-all relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl mr-5 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Receipt className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Invoices</p>
                        <h3 className="text-3xl font-black text-gray-900">{totalInvoices}</h3>
                    </div>
                </div>
            </div>

            {/* Invoices Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/30">
                    <h3 className="text-xl font-black text-gray-900 flex items-center">
                        <CreditCard className="w-5 h-5 mr-2 text-emerald-600" /> Recent Invoices
                    </h3>
                    <div className="relative w-full sm:w-72">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search student, fee type, txn ID..." 
                            className="w-full pl-10 pr-4 py-2.5 text-sm font-medium border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" 
                        />
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white border-b border-gray-100 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                                <th className="px-6 py-5">Student</th>
                                <th className="px-6 py-5">Details</th>
                                <th className="px-6 py-5">Amount</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredFees.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-gray-500 font-bold">No invoices found.</td>
                                </tr>
                            ) : filteredFees.map(f => (
                                <tr key={f._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-black flex items-center justify-center mr-3 shadow-sm border border-emerald-200">
                                                {(f.student?.fullName || '?').charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900">{f.student?.fullName || 'Unknown Student'}</div>
                                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Student ID: {f.student?._id.substring(f.student._id.length - 6)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-800">{f.feeType}</div>
                                        <div className="text-xs text-gray-500 font-medium">Due: {new Date(f.dueDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-lg font-black text-gray-900">${f.amount}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {f.status === 'Paid' ? (
                                            <span className="px-3 py-1 rounded-md text-xs font-black bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center w-max">
                                                <CheckCircle className="w-3 h-3 mr-1" /> PAID
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 rounded-md text-xs font-black bg-orange-50 text-orange-600 border border-orange-100 flex items-center w-max">
                                                <AlertCircle className="w-3 h-3 mr-1" /> PENDING
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {f.status === 'Pending' ? (
                                            <button 
                                                onClick={() => handleMarkPaid(f._id)}
                                                className="text-xs font-black bg-emerald-600 text-white hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors shadow-sm"
                                            >
                                                Mark Paid
                                            </button>
                                        ) : (
                                            <div className="flex flex-col items-end">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">TXN ID</span>
                                                <span className="text-xs font-mono font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded border border-gray-200">
                                                    {f.transactionId}
                                                </span>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Fee Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl transform scale-100 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center">
                                <Receipt className="w-6 h-6 mr-2 text-emerald-600" /> New Invoice
                            </h2>
                        </div>
                        <form onSubmit={handleCreateFee} className="space-y-5">
                            <div>
                                <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1.5">Select Student</label>
                                <select required value={formData.student} onChange={(e) => setFormData({...formData, student: e.target.value})} className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all font-medium text-gray-800">
                                    <option value="">-- Choose Student --</option>
                                    {students.map(s => (
                                        <option key={s._id} value={s._id}>{s.fullName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1.5">Fee Type</label>
                                    <select required value={formData.feeType} onChange={(e) => setFormData({...formData, feeType: e.target.value})} className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all font-medium text-gray-800">
                                        <option value="Tuition">Tuition Fee</option>
                                        <option value="Transport">Transport</option>
                                        <option value="Library">Library</option>
                                        <option value="Exam">Exam Fee</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1.5">Amount ($)</label>
                                    <input type="number" required placeholder="0.00" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all font-medium text-gray-800" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-700 uppercase tracking-widest mb-1.5">Due Date</label>
                                <input type="date" required value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all font-medium text-gray-800" />
                            </div>
                            <div className="flex gap-3 mt-8">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-gray-700 bg-gray-100 font-black rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 py-3 text-white bg-emerald-600 font-black rounded-xl hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">Generate</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Finance;
