import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('Admin');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const roles = ['Admin', 'Principal', 'Teacher', 'Driver', 'Parent', 'Student'];

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // The backend actually auto-detects the role based on credentials,
      // but the UI helps the user feel they are logging into a specific portal.
      const user = await login(mobile, password);
      
      // Route based on role returned from server
      switch (user.role) {
        case 'Admin': navigate('/admin/dashboard'); break;
        case 'Principal': navigate('/principal/dashboard'); break;
        case 'Teacher': navigate('/teacher/dashboard'); break;
        case 'Driver': navigate('/driver/dashboard'); break;
        case 'Parent': navigate('/parent/dashboard'); break;
        case 'Student': navigate('/student/dashboard'); break;
        default: navigate('/');
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
        
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Smart School Login
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Select your portal to continue
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {roles.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setSelectedRole(role)}
              className={`py-2 px-1 text-xs font-semibold rounded-lg border transition-all duration-200 ${
                selectedRole === role 
                ? 'bg-primary-600 text-white border-primary-600 shadow-md transform scale-105' 
                : 'bg-white text-gray-600 border-gray-200 hover:bg-primary-50 hover:border-primary-300'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <form className="mt-6 space-y-5" onSubmit={submitHandler}>
          {error && <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors"
                placeholder="Enter registered mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Sign in as {selectedRole}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6 pt-6 border-t border-gray-100">
          Need an account?{' '}
          <a href="/register" className="font-bold text-primary-600 hover:text-primary-500 transition-colors">
            Register as Student/Parent
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
