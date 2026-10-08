import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

// Admin Layout & Pages
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import Users from './pages/admin/Users';
import Roles from './pages/admin/Roles';
import Students from './pages/admin/Students';
import Staff from './pages/admin/Staff';
import Parents from './pages/admin/Parents';
import Transport from './pages/admin/Transport';
import Academic from './pages/admin/Academic';
import Finance from './pages/admin/Finance';
import Notices from './pages/admin/Notices';
import Reports from './pages/admin/Reports';
import Website from './pages/admin/Website';
import Settings from './pages/admin/Settings';

// Other Layouts
import TeacherLayout from './layouts/TeacherLayout';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherMyClass from './pages/teacher/MyClass';
import TeacherHomework from './pages/teacher/Homework';
import TeacherMarks from './pages/teacher/Marks';
import TeacherAttendance from './pages/teacher/Attendance';
import TeacherNotices from './pages/teacher/Notices';
import TeacherTimetable from './pages/teacher/Timetable';
import PrincipalLayout from './layouts/PrincipalLayout';
import PrincipalDashboard from './pages/PrincipalDashboard';
import PrincipalTeachers from './pages/principal/Teachers';
import PrincipalStudents from './pages/principal/Students';
import PrincipalAttendance from './pages/principal/Attendance';
import PrincipalTransport from './pages/principal/Transport';
import PrincipalNotices from './pages/principal/Notices';
import PrincipalComplaints from './pages/principal/Complaints';
import PrincipalEvents from './pages/principal/Events';
import PrincipalFeeOverview from './pages/principal/FeeOverview';
import PrincipalAcademicResult from './pages/principal/AcademicResult';
import StudentLayout from './layouts/StudentLayout';
import StudentDashboard from './pages/StudentDashboard';
import StudentHomework from './pages/student/Homework';
import StudentAttendance from './pages/student/Attendance';
import StudentTimetable from './pages/student/Timetable';
import StudentResults from './pages/student/Results';
import StudentIDCard from './pages/student/IDCard';
import StudentMaterial from './pages/student/Material';
import StudentNotices from './pages/student/Notices';
import StudentActivity from './pages/student/Activity';
import StudentTransport from './pages/student/Transport';
import ParentLayout from './layouts/ParentLayout';
import ParentDashboard from './pages/ParentDashboard';
import ParentMyChild from './pages/parent/MyChild';
import ParentHomework from './pages/parent/Homework';
import ParentAttendance from './pages/parent/Attendance';
import ParentTransport from './pages/parent/Transport';
import ParentFees from './pages/parent/Fees';
import DriverLayout from './layouts/DriverLayout';
import DriverDashboard from './pages/DriverDashboard';
import DriverNotifications from './pages/driver/Notifications';
import DriverMyBus from './pages/driver/MyBus';
import DriverRoute from './pages/driver/Route';
import DriverLiveTracking from './pages/driver/LiveTracking';
import DriverTripManagement from './pages/driver/TripManagement';
import DriverTripHistory from './pages/driver/TripHistory';
import DriverReportIssue from './pages/driver/ReportIssue';

function App() {
  const Placeholder = ({ title }) => (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
          + Add New
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Recent Records</h3>
          <input type="text" placeholder="Search..." className="px-3 py-1.5 text-sm border border-gray-200 rounded-md" />
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Name / Details</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[1, 2, 3, 4, 5].map((item) => (
              <tr key={item} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">#REC-00{item}</td>
                <td className="px-6 py-4 text-sm text-gray-600">Sample {title} Data {item}</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">Oct {item + 10}, 2026</td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button className="text-primary-600 hover:text-primary-900">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
            <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="roles" element={<Roles />} />
                <Route path="students" element={<Students />} />
                <Route path="staff" element={<Staff />} />
                <Route path="parents" element={<Parents />} />
                <Route path="transport" element={<Transport />} />
                <Route path="academic" element={<Academic />} />
                <Route path="finance" element={<Finance />} />
                <Route path="notices" element={<Notices />} />
                <Route path="reports" element={<Reports />} />
                <Route path="website" element={<Website />} />
                <Route path="settings" element={<Settings />} />
                <Route path="profile" element={<Profile />} />
            </Route>

          <Route path="/teacher" element={<TeacherLayout />}>
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="my-class" element={<TeacherMyClass />} />
            <Route path="attendance" element={<TeacherAttendance />} />
            <Route path="homework" element={<TeacherHomework />} />
            <Route path="marks" element={<TeacherMarks />} />
            <Route path="timetable" element={<TeacherTimetable />} />
            <Route path="notices" element={<TeacherNotices />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/principal" element={<PrincipalLayout />}>
            <Route path="dashboard" element={<PrincipalDashboard />} />
            <Route path="students" element={<PrincipalStudents />} />
            <Route path="teachers" element={<PrincipalTeachers />} />
            <Route path="attendance" element={<PrincipalAttendance />} />
            <Route path="result" element={<PrincipalAcademicResult />} />
            <Route path="transport" element={<PrincipalTransport />} />
            <Route path="fee" element={<PrincipalFeeOverview />} />
            <Route path="notices" element={<PrincipalNotices />} />
            <Route path="complaints" element={<PrincipalComplaints />} />
            <Route path="events" element={<PrincipalEvents />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/student" element={<StudentLayout />}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="attendance" element={<StudentAttendance />} />
            <Route path="homework" element={<StudentHomework />} />
            <Route path="timetable" element={<StudentTimetable />} />
            <Route path="results" element={<StudentResults />} />
            <Route path="transport" element={<StudentTransport />} />
            <Route path="id-card" element={<StudentIDCard />} />
            <Route path="material" element={<StudentMaterial />} />
            <Route path="notices" element={<StudentNotices />} />
            <Route path="activity" element={<StudentActivity />} />
          </Route>

          <Route path="/parent" element={<ParentLayout />}>
            <Route path="dashboard" element={<ParentDashboard />} />
            <Route path="child" element={<ParentMyChild />} />
            <Route path="attendance" element={<ParentAttendance />} />
            <Route path="homework" element={<ParentHomework />} />
            <Route path="fees" element={<ParentFees />} />
            <Route path="transport" element={<ParentTransport />} />
            <Route path="messages" element={<Placeholder title="Messages" />} />
            <Route path="notices" element={<StudentNotices />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/driver" element={<DriverLayout />}>
            <Route path="dashboard" element={<DriverDashboard />} />
            <Route path="my-bus" element={<DriverMyBus />} />
            <Route path="route" element={<DriverRoute />} />
            <Route path="tracking" element={<DriverLiveTracking />} />
            <Route path="trip" element={<DriverTripManagement />} />
            <Route path="students" element={<Placeholder title="Students" />} />
            <Route path="notifications" element={<DriverNotifications />} />
            <Route path="report" element={<DriverReportIssue />} />
            <Route path="history" element={<DriverTripHistory />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
