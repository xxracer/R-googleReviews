
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Import core layout components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import page components
import HomePage from './pages/HomePage';
import KidsProgram from './pages/KidsProgram';
import HomeschoolProgram from './pages/HomeschoolProgram';
import AdultProgram from './pages/AdultProgram';
import FundamentalsProgram from './pages/FundamentalsProgram';
import CompetitionTraining from './pages/CompetitionTraining';
import PrivateLessons from './pages/PrivateLessons';
import Schedule from './pages/Schedule';
import Instructors from './pages/Instructors';
import OurFacility from './pages/OurFacility';
import AffiliateSchools from './pages/AffiliateSchools';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageHomepage from './pages/admin/ManageHomepage';
import ManagePrograms from './pages/admin/ManagePrograms';
import ManageAbout from './pages/admin/ManageAbout';
import UpdateInstructors from './pages/admin/UpdateInstructors';
import ChangePasswordPage from './pages/admin/ChangePasswordPage';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';

import GoogleReviewsButton from './components/GoogleReviewsButton';

// Configure axios to send credentials
axios.defaults.withCredentials = true;

const AppLayout = () => {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kids-program" element={<KidsProgram />} />
          <Route path="/homeschool-program" element={<HomeschoolProgram />} />
          <Route path="/adult-program" element={<AdultProgram />} />
          <Route path="/fundamentals-program" element={<FundamentalsProgram />} />
          <Route path="/competition-training" element={<CompetitionTraining />} />
          <Route path="/private-lessons" element={<PrivateLessons />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/facility" element={<OurFacility />} />
          <Route path="/affiliate-schools" element={<AffiliateSchools />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />

          <Route path="/login" element={<LoginPage />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          >
            {/* These routes are rendered inside AdminDashboard's Outlet */}
            <Route index element={<ManageHomepage />} />
            <Route path="homepage" element={<ManageHomepage />} />
            <Route path="programs" element={<ManagePrograms />} />
            <Route path="about" element={<ManageAbout />} />
            <Route path="instructors" element={<UpdateInstructors />} />
            <Route path="security" element={<ChangePasswordPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
      <GoogleReviewsButton />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
