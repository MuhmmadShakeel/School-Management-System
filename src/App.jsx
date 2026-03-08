import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { LanguageProvider } from './Components/LanguageContext';

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Complain from './Components/Complain';
import MyComplaint from './Components/MyComplaint';
import Slybus from './Components/Slybus';
import Results from './Components/Results';
import FeeVochar from './Components/FeeVochar';
import Tutors from './Components/Tutors';
import Anouncement from './Components/Anouncement';
import DashSidebar from './Components/TeacherDashboard/DashSidebar';
import DashNavbar from './Components/TeacherDashboard/DashNavbar';
import Sllybus from './Components/TeacherDashboard/Sllybus';
import Result1 from './Components/TeacherDashboard/Result1';
import Complain1 from './Components/TeacherDashboard/Complain1';
import Student from './Components/TeacherDashboard/Student';
import Dashboard from './Components/TeacherDashboard/Dashboard';
import Anoouncementing from './Components/TeacherDashboard/Anoouncementing';
import AdminDashssidebar from './Components/AdminDashboard/AdminDashssidebar';
import AdminDashNav from './Components/AdminDashboard/AdminDashNav';
import Syllabus2 from './Components/AdminDashboard/Syllabus2';
import Results2 from './Components/AdminDashboard/Results2';
import Complaint2 from './Components/AdminDashboard/Complaint2';
import AdminTeacher from './Components/AdminDashboard/AdminTeacher';
import AdminStudent from './Components/AdminDashboard/AdminStudent';
import AdminAnoouncement from './Components/AdminDashboard/AdminAnoouncement';
import AdminDash from './Components/AdminDashboard/AdminDash';
// ✅ Dashboard components



const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* children render here */}
      </main>
      <Footer />
    </div>
  );
};

// Dashboard Layout (with Sidebar + DashNavbar)
const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <DashSidebar />
      <div className="flex-1 flex flex-col">
        <DashNavbar />
        <main className="flex-grow p-4">
          <Outlet /> {/* dashboard children render here */}
        </main>
      </div>
    </div>
  );
};

const AdminDashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminDashssidebar />
      <div className="flex-1 flex flex-col">
        <AdminDashNav />
        <main className="flex-grow p-4">
          <Outlet /> {/* dashboard children render here */}
        </main>
      </div>
    </div>
  );
};
// -------------------- App --------------------

const App = () => {
  return (
    <>
      <div className='overflow-hidden'>
        <LanguageProvider>

          <Router>
            <Routes>
              {/* Public site layout */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="complain" element={<Complain />} />
                <Route path="complaints" element={<MyComplaint />} />
                <Route path="syllabus" element={<Slybus />} />
                <Route path="results" element={<Results />} />
                <Route path="fee" element={<FeeVochar />} />
                <Route path="tutors" element={<Tutors />} />
                <Route path="announcements" element={<Anouncement />} />
              </Route>

              {/* Dashboard layout */}
              <Route path="/teacher-dashboard" element={<DashboardLayout />}>
                <Route path="/teacher-dashboard/syllabus" element={<Sllybus />} />
                <Route path="/teacher-dashboard/results" element={<Result1 />} />
                <Route path="/teacher-dashboard/complain1" element={<Complain1 />} />
                <Route path="/teacher-dashboard/student" element={<Student />} />
                <Route path="/teacher-dashboard/dashboard" element={<Dashboard />} />
                <Route path="/teacher-dashboard" element={<Dashboard />} />
                <Route path="/teacher-dashboard/announcement" element={<Anoouncementing />} />
              </Route>
              <Route path="/admin-dashboard" element={<AdminDashboardLayout />}>
                <Route index element={<AdminDash />} />
                <Route path="dashboard" element={<AdminDash />} />
                <Route path="syllabus2" element={<Syllabus2 />} />
                <Route path="results2" element={<Results2 />} />
                <Route path="complaint2" element={<Complaint2 />} />
                <Route path="AdminTeacher" element={<AdminTeacher />} />
                <Route path="student" element={<AdminStudent />} />
                <Route path="announcement" element={<AdminAnoouncement />} />
              </Route>

            </Routes>

          </Router>
        </LanguageProvider>

      </div>
    </>
  );
};

export default App;
