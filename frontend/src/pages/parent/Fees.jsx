import React, { useState } from 'react';
import { CreditCard, Download, CheckCircle, AlertTriangle, FileText, IndianRupee, ShieldCheck } from 'lucide-react';

const ParentFees = () => {
    const [isPaying, setIsPaying] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const currentFee = {
        month: 'October 2026',
        dueDate: '15 Oct 2026',
        status: 'Pending',
        breakdown: [
            { item: 'Tuition Fee', amount: 4500 },
            { item: 'Transport Fee (Route 4)', amount: 1200 },
            { item: 'Technology & Library', amount: 500 },
            { item: 'Late Fine', amount: 0 }
        ]
    };
    
    const totalAmount = currentFee.breakdown.reduce((sum, current) => sum + current.amount, 0);

    const paymentHistory = [
        { id: 'TXN-89432', date: '05 Sep 2026', month: 'September 2026', amount: 6200, status: 'Success' },
        { id: 'TXN-75121', date: '10 Aug 2026', month: 'August 2026', amount: 6200, status: 'Success' },
        { id: 'TXN-61234', date: '02 Jul 2026', month: 'July 2026', amount: 8500, status: 'Success' }, // Higher amount for quarterly/annual charges
    ];

    const handlePayment = () => {
        setIsPaying(true);
        // Simulate payment gateway delay
        setTimeout(() => {
            setIsPaying(false);
            setPaymentSuccess(true);
            currentFee.status = 'Paid';
        }, 2000);
    };

    const handleDownloadReceipt = (txnId) => {
        alert(`Downloading receipt for Transaction ID: ${txnId}`);
    };

    return (
        <div className="space-y-6 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Fees & Payments</h1>
                <p className="text-sm text-gray-500 mt-1">Manage your child's school fees, view invoices, and make secure online payments.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: Current Due & Payment Gateway */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {paymentSuccess ? (
                        <div className="bg-green-50 rounded-2xl shadow-sm border border-green-200 p-8 text-center animate-in zoom-in duration-300">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h2>
                            <p className="text-green-600 mb-6">₹{totalAmount} has been paid for {currentFee.month}. A receipt has been sent to your email.</p>
                            <button onClick={() => setPaymentSuccess(false)} className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
                                Back to Fees
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden relative">
                            {/* Decorative background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-bl-full opacity-50 -z-10"></div>
                            
                            <div className="p-6 md:p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Current Due</p>
                                        <h2 className="text-3xl font-black text-gray-900 flex items-center">
                                            <IndianRupee className="w-7 h-7 mr-1" />
                                            {totalAmount.toLocaleString()}
                                        </h2>
                                    </div>
                                    <div className="text-right">
                                        <span className="inline-block px-3 py-1 bg-red-50 text-red-600 text-xs font-bold uppercase rounded-full border border-red-100 mb-2">
                                            {currentFee.status}
                                        </span>
                                        <p className="text-sm font-bold text-gray-700 flex items-center justify-end">
                                            <AlertTriangle className="w-4 h-4 text-orange-500 mr-1" /> Due: {currentFee.dueDate}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 mb-6">
                                    <h3 className="font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">Fee Breakdown ({currentFee.month})</h3>
                                    <div className="space-y-3">
                                        {currentFee.breakdown.map((item, index) => (
                                            <div key={index} className="flex justify-between text-sm">
                                                <span className="text-gray-600 font-medium">{item.item}</span>
                                                <span className="text-gray-900 font-bold">₹{item.amount.toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between text-base font-black text-gray-900 mt-4 pt-4 border-t border-gray-200">
                                        <span>Total Amount</span>
                                        <span className="text-primary-600">₹{totalAmount.toLocaleString()}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={handlePayment} 
                                    disabled={isPaying}
                                    className="w-full flex items-center justify-center py-4 bg-primary-600 text-white rounded-xl font-bold text-lg hover:bg-primary-700 transition-all shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] disabled:opacity-70"
                                >
                                    {isPaying ? (
                                        <div className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing Payment...
                                        </div>
                                    ) : (
                                        <>
                                            <CreditCard className="w-5 h-5 mr-2" /> Pay ₹{totalAmount.toLocaleString()} Now
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center font-medium">
                                    <ShieldCheck className="w-4 h-4 mr-1 text-green-500" /> 100% Secure Encrypted Payment Gateway
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Payment History */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
                        <h3 className="font-bold text-gray-900 mb-6 flex items-center">
                            <FileText className="w-5 h-5 mr-2 text-primary-500" /> 
                            Payment History
                        </h3>
                        
                        <div className="space-y-4">
                            {paymentHistory.map((txn, index) => (
                                <div key={index} className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition-all group">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">{txn.month}</p>
                                            <p className="text-xs font-mono text-gray-500 mt-0.5">{txn.id}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900 text-sm">₹{txn.amount}</p>
                                            <span className="text-[10px] font-bold text-green-600 uppercase flex items-center justify-end mt-0.5">
                                                <CheckCircle className="w-3 h-3 mr-1" /> {txn.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                                        <span className="text-xs font-medium text-gray-500">{txn.date}</span>
                                        <button onClick={() => handleDownloadReceipt(txn.id)} className="text-xs font-bold text-primary-600 hover:text-primary-800 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Download className="w-3 h-3 mr-1" /> Receipt
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <button className="w-full mt-6 py-2.5 rounded-lg text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                            View All Statements
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ParentFees;
