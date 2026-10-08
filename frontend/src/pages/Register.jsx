import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, UserCheck, Phone, Mail, Lock, Shield } from 'lucide-react';

const Register = () => {
    const [role, setRole] = useState('Student');
    const [formData, setFormData] = useState({
        fullName: '',
        admissionNumber: '',
        rollNumber: '',
        studentAdmissionNumber: '',
        studentRollNumber: '',
        mobile: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            const endpoint = role === 'Student' ? '/api/auth/register/student' : '/api/auth/register/parent';
            const payload = role === 'Student' 
                ? {
                    fullName: formData.fullName,
                    admissionNumber: formData.admissionNumber,
                    rollNumber: formData.rollNumber,
                    mobile: formData.mobile,
                    email: formData.email,
                    password: formData.password
                }
                : {
                    fullName: formData.fullName,
                    studentAdmissionNumber: formData.studentAdmissionNumber,
                    studentRollNumber: formData.studentRollNumber,
                    mobile: formData.mobile,
                    email: formData.email,
                    password: formData.password
                };

            const config = { headers: { 'Content-Type': 'application/json' } };
            await axios.post(`${endpoint}`, payload, config);
            
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-xl">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                        Sign in here
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
                    
                    {/* Role Selection Tabs */}
                    <div className="flex justify-center space-x-4 mb-8">
                        <button
                            onClick={() => setRole('Student')}
                            className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all ${
                                role === 'Student' 
                                ? 'bg-primary-600 text-white shadow-md transform scale-105' 
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                        >
                            <UserCheck className="w-5 h-5" />
                            <span className="font-semibold">Student</span>
                        </button>
                        <button
                            onClick={() => setRole('Parent')}
                            className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all ${
                                role === 'Parent' 
                                ? 'bg-primary-600 text-white shadow-md transform scale-105' 
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                        >
                            <UserPlus className="w-5 h-5" />
                            <span className="font-semibold">Parent</span>
                        </button>
                    </div>

                    <form className="space-y-6" onSubmit={submitHandler}>
                        {error && <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}
                        {success && <div className="text-green-500 text-sm text-center bg-green-50 p-3 rounded-lg border border-green-100">{success}</div>}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input name="fullName" type="text" required value={formData.fullName} onChange={handleChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" />
                            </div>

                            {role === 'Student' ? (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Admission Number</label>
                                        <input name="admissionNumber" type="text" required value={formData.admissionNumber} onChange={handleChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Roll Number</label>
                                        <input name="rollNumber" type="text" required value={formData.rollNumber} onChange={handleChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Child's Admission Number</label>
                                        <input name="studentAdmissionNumber" type="text" required value={formData.studentAdmissionNumber} onChange={handleChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Child's Roll Number</label>
                                        <input name="studentRollNumber" type="text" required value={formData.studentRollNumber} onChange={handleChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                                    </div>
                                </>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 flex items-center">
                                    <Phone className="w-4 h-4 mr-1 text-gray-400" /> Mobile Number
                                </label>
                                <input name="mobile" type="text" required value={formData.mobile} onChange={handleChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 flex items-center">
                                    <Mail className="w-4 h-4 mr-1 text-gray-400" /> Email (Optional)
                                </label>
                                <input name="email" type="email" value={formData.email} onChange={handleChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 flex items-center">
                                    <Lock className="w-4 h-4 mr-1 text-gray-400" /> Password
                                </label>
                                <input name="password" type="password" required value={formData.password} onChange={handleChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 flex items-center">
                                    <Shield className="w-4 h-4 mr-1 text-gray-400" /> Confirm Password
                                </label>
                                <input name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                            >
                                Register as {role}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
